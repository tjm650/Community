import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Import theme constants
import useGlobal from "@/assets/common/core/useGlobal";
import { debounce, optimizeListData } from "@/assets/core/performance";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const { height } = Dimensions.get('window');

const EnhancedFlatList = ({
  data = [],
  renderItem,
  keyExtractor = 'id',
  onRefresh,
  onLoadMore,
  refreshing = false,
  loading = false,
  hasMore = false,
  emptyMessage = "No items found",
  errorMessage = "Something went wrong",
  error = false,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  contentContainerStyle,
  style,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 10,
  removeClippedSubviews = true,
  getItemLayout,
  onEndReachedThreshold = 0.5,
  onEndReached,
  onScroll,
  scrollEventThrottle = 16
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const flatListRef = useRef(null);

  // Optimize data for better performance
  const optimizedData = useMemo(() => {
    return optimizeListData(data, keyExtractor);
  }, [data, keyExtractor]);

  // Memoized styles for better performance
  const containerStyle = useMemo(() => [
    styles.container,
    style,
  ], [style]);

  const contentStyle = useMemo(() => [
    styles.contentContainer,
    contentContainerStyle,
  ], [contentContainerStyle]);

  // Enhanced refresh handler
  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      }
    }
  }, [onRefresh]);

  // Enhanced load more handler with debouncing
  const debouncedLoadMore = useMemo(
    () => debounce(async () => {
      if (onLoadMore && hasMore && !isLoadingMore && !loading) {
        setIsLoadingMore(true);
        try {
          await onLoadMore();
        } catch (error) {
          console.error('Load more error:', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    }, 300),
    [onLoadMore, hasMore, isLoadingMore, loading]
  );

  // Enhanced end reached handler
  const handleEndReached = useCallback(() => {
    debouncedLoadMore();
    if (onEndReached) {
      onEndReached();
    }
  }, [debouncedLoadMore, onEndReached]);

  // Enhanced scroll handler
  const handleScroll = useCallback((event) => {
    if (onScroll) {
      onScroll(event);
    }
  }, [onScroll]);

  // Custom refresh control
  const refreshControl = useMemo(() => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={[isLight ? LGlobals.primary : DGlobals.primary]}
      tintColor={isLight ? LGlobals.primary : DGlobals.primary}
      title="Pull to refresh"
      titleColor={isLight ? LGlobals.onSurface : DGlobals.onSurface}
    />
  ), [refreshing, handleRefresh, isLight]);

  // Custom empty component
  const EmptyComponent = useMemo(() => {
    if (ListEmptyComponent) return ListEmptyComponent;
    
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons 
            name="alert-circle-outline" 
            size={64} 
            color={isLight ? LGlobals.error : DGlobals.error} 
          />
          <Text style={[styles.emptyText, { color: isLight ? LGlobals.error : DGlobals.error }]}>
            {errorMessage}
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons 
          name="inbox-outline" 
          size={64} 
          color={isLight ? LGlobals.onSurface : DGlobals.onSurface} 
        />
        <Text style={[styles.emptyText, { color: isLight ? LGlobals.onSurface : DGlobals.onSurface }]}>
          {emptyMessage}
        </Text>
      </View>
    );
  }, [ListEmptyComponent, error, errorMessage, emptyMessage, isLight]);

  // Custom footer component
  const FooterComponent = useMemo(() => {
    if (ListFooterComponent) return ListFooterComponent;
    
    if (isLoadingMore || (loading && hasMore)) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={isLight ? LGlobals.primary : DGlobals.primary} 
          />
          <Text style={[styles.loadingText, { color: isLight ? LGlobals.onSurface : DGlobals.onSurface }]}>
            Loading more...
          </Text>
        </View>
      );
    }
    
    if (hasMore) {
      return (
        <View style={styles.loadMoreContainer}>
          <Text style={[styles.loadMoreText, { color: isLight ? LGlobals.onSurface : DGlobals.onSurface }]}>
            Pull up to load more
          </Text>
        </View>
      );
    }
    
    if (data.length > 0) {
      return (
        <View style={styles.endContainer}>
          <Text style={[styles.endText, { color: isLight ? LGlobals.onSurface : DGlobals.onSurface }]}>
            You&apos;ve reached the end
          </Text>
        </View>
      );
    }
    
    return null;
  }, [ListFooterComponent, isLoadingMore, loading, hasMore, data.length, isLight]);

  // Enhanced render item with performance optimization
  const enhancedRenderItem = useCallback(({ item, index, separators }) => {
    return renderItem({ item, index, separators });
  }, [renderItem]);

  // Enhanced key extractor
  const enhancedKeyExtractor = useCallback((item, index) => {
    if (typeof keyExtractor === 'function') {
      return keyExtractor(item, index);
    }
    return item[keyExtractor] || index.toString();
  }, [keyExtractor]);

  // Get item layout for better performance (if provided)
  const enhancedGetItemLayout = useCallback((data, index) => {
    if (getItemLayout) {
      return getItemLayout(data, index);
    }
    return {
      length: 80, // Default item height
      offset: 80 * index,
      index,
    };
  }, [getItemLayout]);

  return (
    <View style={containerStyle}>
      <FlatList
        ref={flatListRef}
        data={optimizedData}
        renderItem={enhancedRenderItem}
        keyExtractor={enhancedKeyExtractor}
        refreshControl={refreshControl}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={FooterComponent}
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={contentStyle}
        style={styles.flatList}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={windowSize}
        removeClippedSubviews={removeClippedSubviews}
        getItemLayout={enhancedGetItemLayout}
        onEndReached={handleEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        updateCellsBatchingPeriod={50}
        disableVirtualization={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    minHeight: height * 0.3,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    marginLeft: 8,
  },
  loadMoreContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loadMoreText: {
    fontSize: 14,
    opacity: 0.7,
  },
  endContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  endText: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export default EnhancedFlatList;
