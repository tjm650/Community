import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Performance Optimization Utility
 * Provides caching, memory management, and performance monitoring
 */

class PerformanceManager {
  constructor() {
    this.cache = new Map();
    this.metrics = {
      apiCalls: 0,
      cacheHits: 0,
      cacheMisses: 0,
      memoryUsage: 0,
      renderTimes: [],
    };
    this.maxCacheSize = 100; // Maximum number of cached items
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  /**
   * Cache management
   */
  setCache(key, data, expiry = this.cacheExpiry) {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now(),
        expiry: expiry,
      };

      // Remove oldest items if cache is full
      if (this.cache.size >= this.maxCacheSize) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }

      this.cache.set(key, cacheItem);
      this.metrics.cacheMisses++;
      
      // Also store in AsyncStorage for persistence
      AsyncStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  getCache(key) {
    try {
      const cacheItem = this.cache.get(key);
      
      if (cacheItem) {
        const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiry;
        
        if (!isExpired) {
          this.metrics.cacheHits++;
          return cacheItem.data;
        } else {
          this.cache.delete(key);
        }
      }
      
      // Try to get from AsyncStorage
      return this.getFromStorage(key);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async getFromStorage(key) {
    try {
      const stored = await AsyncStorage.getItem(`cache_${key}`);
      if (stored) {
        const cacheItem = JSON.parse(stored);
        const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiry;
        
        if (!isExpired) {
          this.cache.set(key, cacheItem);
          this.metrics.cacheHits++;
          return cacheItem.data;
        } else {
          await AsyncStorage.removeItem(`cache_${key}`);
        }
      }
    } catch (error) {
      console.error('Storage get error:', error);
    }
    
    this.metrics.cacheMisses++;
    return null;
  }

  clearCache() {
    this.cache.clear();
    this.clearStorageCache();
  }

  async clearStorageCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Clear storage cache error:', error);
    }
  }

  /**
   * Image optimization
   */
  optimizeImageUrl(url, width = 300, height = 300) {
    if (!url) return url;
    
    // Add image optimization parameters
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&h=${height}&fit=crop&auto=format`;
  }

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Performance monitoring
   */
  startTimer(label) {
    const startTime = performance.now();
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.metrics.renderTimes.push({ label, duration, timestamp: Date.now() });
        
        // Keep only last 100 measurements
        if (this.metrics.renderTimes.length > 100) {
          this.metrics.renderTimes.shift();
        }
        
        return duration;
      }
    };
  }

  getPerformanceMetrics() {
    const avgRenderTime = this.metrics.renderTimes.length > 0
      ? this.metrics.renderTimes.reduce((sum, item) => sum + item.duration, 0) / this.metrics.renderTimes.length
      : 0;

    return {
      ...this.metrics,
      avgRenderTime,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0,
      cacheSize: this.cache.size,
    };
  }

  /**
   * Memory management
   */
  optimizeMemory() {
    // Clear old cache items
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiry) {
        this.cache.delete(key);
      }
    }

    // Clear old performance metrics
    const oneHourAgo = now - (60 * 60 * 1000);
    this.metrics.renderTimes = this.metrics.renderTimes.filter(
      item => item.timestamp > oneHourAgo
    );
  }

  /**
   * API call optimization
   */
  async optimizedApiCall(apiFunction, cacheKey, cacheExpiry = this.cacheExpiry) {
    // Check cache first
    const cachedData = this.getCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Make API call
    this.metrics.apiCalls++;
    try {
      const data = await apiFunction();
      this.setCache(cacheKey, data, cacheExpiry);
      return data;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  /**
   * List optimization for FlatList
   */
  optimizeListData(data, keyExtractor = 'id') {
    if (!Array.isArray(data)) return [];
    
    return data.map((item, index) => ({
      ...item,
      key: item[keyExtractor] || index.toString(),
    }));
  }

  /**
   * Image preloading
   */
  preloadImages(imageUrls) {
    if (!Array.isArray(imageUrls)) return;
    
    imageUrls.forEach(url => {
      if (url) {
        // Create an Image object to preload
        const img = new Image();
        img.src = url;
      }
    });
  }

  /**
   * Network status monitoring
   */
  getNetworkInfo() {
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isConnected: navigator?.onLine ?? true,
    };
  }

  /**
   * Batch operations
   */
  batchOperations(operations, batchSize = 10) {
    const batches = [];
    for (let i = 0; i < operations.length; i += batchSize) {
      batches.push(operations.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Lazy loading helper
   */
  createLazyLoader(items, pageSize = 20) {
    let currentPage = 0;
    const totalItems = items.length;
    
    return {
      hasMore: () => currentPage * pageSize < totalItems,
      loadMore: () => {
        const start = currentPage * pageSize;
        const end = start + pageSize;
        currentPage++;
        return items.slice(start, end);
      },
      reset: () => {
        currentPage = 0;
      },
      getCurrentItems: () => {
        return items.slice(0, currentPage * pageSize);
      },
    };
  }
}

// Create singleton instance
const performanceManager = new PerformanceManager();

// Export utility functions
export const {
  setCache,
  getCache,
  clearCache,
  optimizeImageUrl,
  debounce,
  throttle,
  startTimer,
  getPerformanceMetrics,
  optimizeMemory,
  optimizedApiCall,
  optimizeListData,
  preloadImages,
  getNetworkInfo,
  batchOperations,
  createLazyLoader,
} = performanceManager;

export default performanceManager;
