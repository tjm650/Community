// Analytics tracking utility for monetization pages
// This utility integrates with websockets for real-time analytics tracking

export const trackPageVisit = (pageName, sessionId = '', userAgent = '') => {
  try {
    // Import the global store dynamically to avoid circular dependencies
    import('@/assets/core/useGlobal').then(({ default: useGlobal }) => {
      const store = useGlobal.getState();

      // Use websocket method to track the visit
      const socketTrack = store.analyticsSocketTrackVisit;
      if (typeof socketTrack === 'function') {
        socketTrack(pageName, sessionId, userAgent);
        console.log(`Successfully tracked visit to ${pageName} via websocket`);
      } else {
        // Fallback to store method if websocket not available
        store.trackPageVisit(pageName, sessionId, userAgent);
        console.log(`Successfully tracked visit to ${pageName} via store`);
      }
    }).catch((error) => {
      console.error('Error tracking page visit:', error);
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
};

// Analytics data fetching utilities using websockets
export const fetchAnalyticsDashboard = () => {
  return new Promise((resolve, reject) => {
    try {
      import('@/assets/core/useGlobal').then(({ default: useGlobal }) => {
        const store = useGlobal.getState();

        // Use websocket method to fetch dashboard data
        const socketFetch = store.analyticsSocketFetchDashboard;
        if (typeof socketFetch === 'function') {
          socketFetch();
          // Return current dashboard data from store
          const analytics = store.monetization?.analytics;
          resolve(analytics?.dashboard || []);
        } else {
          // Fallback to store method if websocket not available
          store.fetchAnalyticsDashboard().then(resolve).catch(reject);
        }
      }).catch(reject);
    } catch (error) {
      console.error('Error fetching analytics dashboard:', error);
      reject(error);
    }
  });
};

export const fetchAnalyticsSummary = () => {
  return new Promise((resolve, reject) => {
    try {
      import('@/assets/core/useGlobal').then(({ default: useGlobal }) => {
        const store = useGlobal.getState();

        // Use websocket method to fetch summary data
        const socketFetch = store.analyticsSocketFetchSummary;
        if (typeof socketFetch === 'function') {
          socketFetch();
          // Return current summary data from store
          const analytics = store.monetization?.analytics;
          resolve(analytics?.summary || {
            total_visits_7days: 0,
            unique_visitors_7days: 0,
            top_pages: []
          });
        } else {
          // Fallback to store method if websocket not available
          store.fetchAnalyticsSummary().then(resolve).catch(reject);
        }
      }).catch(reject);
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      reject(error);
    }
  });
};

// Utility to get analytics data from store
export const getAnalyticsFromStore = () => {
  try {
    const useGlobal = require('@/assets/core/useGlobal');
    const store = useGlobal.getState();
    return store.monetization?.analytics || {
      dashboard: [],
      summary: { total_visits_7days: 0, unique_visitors_7days: 0, top_pages: [] },
      isLoading: false,
      error: null
    };
  } catch (error) {
    console.error('Error getting analytics from store:', error);
    return {
      dashboard: [],
      summary: { total_visits_7days: 0, unique_visitors_7days: 0, top_pages: [] },
      isLoading: false,
      error: null
    };
  }
};