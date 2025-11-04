import api from "@/assets/core/api";

export const MonetizationStore = {
  // Balances and FX
  state: {
  accommodations: [],
  tx: [],
  accommodationsNext: null,
  marketing: [],
  marketingNext: null,
  library: [],
  libraryNext: null,
  campusmap: [],
  campusmapNext: null,
  subscriptions: [],
  badges: [],
    queue: [],
    isSyncing: false,
    // Lost and Found
       lostItems: [],
       foundItems: [],
       lostItemsNext: null,
       foundItemsNext: null,
       lostFoundSearchResults: {
         lost_items: [],
         found_items: [],
         total_results: 0
       },
  
       // Analytics
       analytics: {
         dashboard: [],
         pageVisits: [],
         summary: {
           total_visits_7days: 0,
           unique_visitors_7days: 0,
           top_pages: []
         },
         isLoading: false,
         error: null
       },
  },




  

  responseAccommodations: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        accommodations: [...(state.monetization.accommodations || []), ...(data.accommodations || [])],
        accommodationsNext: data.next || null,
      },
    }));
  },

  responseMarketing: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        marketing: [...(state.monetization.marketing || []), ...(data.marketing || [])],
        marketingNext: data.next || null,
      },
    }));
  },

  responseTxAgents: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        tx: [...(state.monetization.tx || []), ...(data.tx || [])],
        txNext: data.next || null,
      },
    }));
  },

  responseLibrary: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        library: [...(state.monetization.library || []), ...(data.library || [])],
        libraryNext: data.next || null,
      },
    }));
  },

  responseCampusMap: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        campusmap: [...(state.monetization.campusmap || []), ...(data.campusmap || [])],
        campusmapNext: data.next || null,
      },
    }));
  },

  // Lost and Found response handlers
  responseLostItems: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        lostItems: [...(state.monetization.lostItems || []), ...(data.lost_items || [])],
        lostItemsNext: data.next || null,
      },
    }));
  },

  responseFoundItems: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        foundItems: [...(state.monetization.foundItems || []), ...(data.found_items || [])],
        foundItemsNext: data.next || null,
      },
    }));
  },

  responseLostFoundSearch: (set, get, data) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        lostFoundSearchResults: {
          lost_items: data.lost_items || [],
          found_items: data.found_items || [],
          total_results: data.total_results || 0,
        },
      },
    }));
  },

  // Fetch accommodations (socket-aware). Socket responses append pages via
  // `responseAccommodations`. If socket is not available, fall back to REST.
  fetchAccommodations: async (set, get, params = {}) => {
    const socketFetch = get().monetizationSocketFetchAccommodations;
    if (typeof socketFetch === "function") {
      socketFetch(params.page || 0);
      return [];
    }
    const response = await api({ method: 'GET', url: '/api/amonetization/accommodations' });
    if (response.status === 200) {
      const accommodations = response.data.accommodations || [];
      // store in monetization state for other screens
      set((state) => ({ monetization: { ...state.monetization, accommodations } }));
      return accommodations;
    }
    return [];
  },
  // Fetch tx agents (socket-aware). Socket responses append pages via
  // `responseTxAgents`. If socket is not available, fall back to REST.
  fetchTxAgents: async (set, get, params = {}) => {   
    const socketFetch = get().monetizationSocketFetchTxAgents;
    if (typeof socketFetch === "function") {
      socketFetch(params.page || 0);
      return [];
    }
    const response = await api({ method: 'GET', url: '/api/amonetization/tx' });
    if (response.status === 200) {
      const tx = response.data.tx || [];
      // store in monetization state for other screens
      set((state) => ({ monetization: { ...state.monetization, tx } }));
      return tx; 
    }
    return [];
  },

  // Socket-only convenience callers for the other monetization sources. These
  // simply trigger the socket sender and rely on the socket response handlers
  // to populate the store.
  fetchMarketingSocket: (set, get, page = 0) => {
    const fn = get().monetizationSocketFetchMarketing;
    if (typeof fn === "function") fn(page);
  },

  fetchLibrarySocket: (set, get, page = 0) => {
    const fn = get().monetizationSocketFetchLibrary;
    if (typeof fn === "function") fn(page);
  },

  fetchCampusMapSocket: (set, get, page = 0) => {
    const fn = get().monetizationSocketFetchCampusMap;
    if (typeof fn === "function") fn(page);
  },

  

  createAccommodation: async (set, get, payload) => {
    // payload may include images as array of objects (uri/base64/fileName/type)
    try {
      const socketCreate = get().monetizationSocketCreateAccommodation;
      if (typeof socketCreate === "function") {
        // Optimistic UI: generate a temporary item and append it. The real item
        // will arrive via socket responseAccommodations or listing_created if implemented.
        const temp = {
          id: `tmp-${Date.now()}`,
          title: payload.title || "",
          description: payload.description || "",
          price: payload.price || 0,
          currency: payload.currency || "USD",
          phone: payload.phone || null,
          geo_lat: payload.geo_lat || null,
          geo_lng: payload.geo_lng || null,
          created_at: new Date().toISOString(),
          _optimistic: true,
        };
        set((state) => ({
          monetization: {
            ...state.monetization,
            accommodations: [temp, ...(state.monetization.accommodations || [])],
          },
        }));

        // Send via socket. Images should include base64 in payload.images[0].base64
        socketCreate(payload);
        return temp;
      }

      let data = payload;
      let config = {};
      if (payload?.images && Array.isArray(payload.images) && payload.images.length) {
        const form = new FormData();
        form.append('title', payload.title || '');
        form.append('description', payload.description || '');
        form.append('price', payload.price || 0);
        form.append('currency', payload.currency || 'USD');
        form.append('phone', payload.phone || '');
        if (payload.geo_lat) form.append('geo_lat', payload.geo_lat);
        if (payload.geo_lng) form.append('geo_lng', payload.geo_lng);

        for (const [i, img] of payload.images.entries()) {
          // img can be an object returned by expo-image-picker with uri/base64/fileName/type
          const name = img.fileName || `image-${Date.now()}-${i}.jpg`;
          const type = img.type || 'image/jpeg';
          // If base64 present, create blob
          if (img.base64) {
            // Note: React Native FormData can accept { uri, name, type } where uri is local file path.
            // Many expo setups provide uri; if only base64 is present, we send as a field called image_base64_<i>
            form.append('image_base64_' + i, img.base64);
          }
          if (img.uri) {
            form.append('images', { uri: img.uri, name, type });
          }
        }

        data = form;
        config = { headers: { 'Content-Type': 'multipart/form-data' } };
      }

      const response = await api({ method: 'POST', url: '/api/amonetization/accommodations', data, ...config });
      if (response.status === 201 || response.status === 200) return response.data.accommodation || response.data;
      throw new Error(response?.data?.error || 'Accommodation creation failed');
    } catch (e) {
      throw e;
    }
  },

  // Lost and Found methods
  fetchLostItems: async (set, get, params = {}) => {
    const socketFetch = get().lostFoundSocketFetchLostItems;
    if (typeof socketFetch === "function") {
      socketFetch(params.page || 0);
      return [];
    }
    const response = await api({ method: 'GET', url: '/api/amonetization/lost-items' });
    if (response.status === 200) {
      const lostItems = response.data.lost_items || [];
      set((state) => ({ monetization: { ...state.monetization, lostItems } }));
      return lostItems;
    }
    return [];
  },

  fetchFoundItems: async (set, get, params = {}) => {
    const socketFetch = get().lostFoundSocketFetchFoundItems;
    if (typeof socketFetch === "function") {
      socketFetch(params.page || 0);
      return [];
    }
    const response = await api({ method: 'GET', url: '/api/amonetization/found-items' });
    if (response.status === 200) {
      const foundItems = response.data.found_items || [];
      set((state) => ({ monetization: { ...state.monetization, foundItems } }));
      return foundItems;
    }
    return [];
  },

  createLostItem: async (set, get, payload) => {
    try {
      const socketCreate = get().lostFoundSocketCreateLostItem;
      if (typeof socketCreate === "function") {
        const temp = {
          id: `tmp-${Date.now()}`,
          title: payload.title || "",
          description: payload.description || "",
          category: payload.category || "",
          location: payload.location || "",
          reward_offered: payload.reward_offered || null,
          currency: payload.currency || "USD",
          status: "active",
          is_premium: payload.is_premium || false,
          created_at: new Date().toISOString(),
          _optimistic: true,
        };
        set((state) => ({
          monetization: {
            ...state.monetization,
            lostItems: [temp, ...(state.monetization.lostItems || [])],
          },
        }));

        socketCreate(payload);
        return temp;
      }

      const response = await api({ method: 'POST', url: '/api/amonetization/lost-items', data: payload });
      if (response.status === 201 || response.status === 200) return response.data.lost_item || response.data;
      throw new Error(response?.data?.error || 'Lost item creation failed');
    } catch (e) {
      throw e;
    }
  },

  createFoundItem: async (set, get, payload) => {
    try {
      const socketCreate = get().lostFoundSocketCreateFoundItem;
      if (typeof socketCreate === "function") {
        const temp = {
          id: `tmp-${Date.now()}`,
          title: payload.title || "",
          description: payload.description || "",
          category: payload.category || "",
          location: payload.location || "",
          status: "unclaimed",
          is_premium: payload.is_premium || false,
          created_at: new Date().toISOString(),
          _optimistic: true,
        };
        set((state) => ({
          monetization: {
            ...state.monetization,
            foundItems: [temp, ...(state.monetization.foundItems || [])],
          },
        }));

        socketCreate(payload);
        return temp;
      }

      const response = await api({ method: 'POST', url: '/api/amonetization/found-items', data: payload });
      if (response.status === 201 || response.status === 200) return response.data.found_item || response.data;
      throw new Error(response?.data?.error || 'Found item creation failed');
    } catch (e) {
      throw e;
    }
  },

  searchLostFound: async (set, get, params = {}) => {
    const socketSearch = get().lostFoundSocketSearch;
    if (typeof socketSearch === "function") {
      socketSearch(params.query || "", params.category || "");
      return [];
    }
    const response = await api({
      method: 'GET',
      url: '/api/amonetization/lost-found/search',
      params: { q: params.query || '', category: params.category || '' }
    });
    if (response.status === 200) {
      const searchResults = response.data;
      set((state) => ({
        monetization: {
          ...state.monetization,
          lostFoundSearchResults: searchResults,
        },
      }));
      return searchResults;
    }
    return { lost_items: [], found_items: [], total_results: 0 };
  },

  // Analytics methods using websockets
  fetchAnalyticsDashboard: async (set, get) => {
    try {
      set((state) => ({
        monetization: {
          ...state.monetization,
          analytics: {
            ...state.monetization.analytics,
            isLoading: true,
            error: null
          }
        }
      }));

      // Use websocket to fetch dashboard data
      const socketFetch = get().analyticsSocketFetchDashboard;
      if (typeof socketFetch === "function") {
        socketFetch();
        return [];
      }

      // Fallback to REST API if websocket not available
      const response = await api({
        method: 'GET',
        url: '/api/amonetization/analytics/dashboard'
      });

      if (response.status === 200) {
        set((state) => ({
          monetization: {
            ...state.monetization,
            analytics: {
              ...state.monetization.analytics,
              dashboard: response.data.dashboard || [],
              isLoading: false
            }
          }
        }));
        return response.data.dashboard;
      }
    } catch (error) {
      console.error('Fetch analytics dashboard error:', error);
      set((state) => ({
        monetization: {
          ...state.monetization,
          analytics: {
            ...state.monetization.analytics,
            error: error.message,
            isLoading: false
          }
        }
      }));
      throw error;
    }
  },

  fetchAnalyticsSummary: async (set, get) => {
    try {
      // Use websocket to fetch summary data
      const socketFetch = get().analyticsSocketFetchSummary;
      if (typeof socketFetch === "function") {
        socketFetch();
        return {
          total_visits_7days: 0,
          unique_visitors_7days: 0,
          top_pages: []
        };
      }

      // Fallback to REST API if websocket not available
      const response = await api({
        method: 'GET',
        url: '/api/amonetization/analytics/summary'
      });

      if (response.status === 200) {
        set((state) => ({
          monetization: {
            ...state.monetization,
            analytics: {
              ...state.monetization.analytics,
              summary: response.data.summary || {
                total_visits_7days: 0,
                unique_visitors_7days: 0,
                top_pages: []
              }
            }
          }
        }));
        return response.data.summary;
      }
    } catch (error) {
      console.error('Fetch analytics summary error:', error);
      throw error;
    }
  },

  trackPageVisit: async (set, get, pageName, sessionId = '', userAgent = '') => {
    try {
      // Use websocket to track page visit
      const socketTrack = get().analyticsSocketTrackVisit;
      if (typeof socketTrack === "function") {
        socketTrack(pageName, sessionId, userAgent);
        return { success: true };
      }

      // Fallback to REST API if websocket not available
      const response = await api({
        method: 'POST',
        url: '/api/amonetization/analytics/track-visit',
        data: {
          page_name: pageName,
          session_id: sessionId,
          user_agent: userAgent
        }
      });

      if (response.status === 201) {
        // Optionally refresh analytics data after tracking
        get().fetchAnalyticsDashboard(set, get);
        return response.data.visit;
      }
    } catch (error) {
      console.error('Track page visit error:', error);
      // Don't throw error for tracking failures to avoid disrupting user experience
    }
  },

  clearAnalyticsError: (set, get) => {
    set((state) => ({
      monetization: {
        ...state.monetization,
        analytics: {
          ...state.monetization.analytics,
          error: null
        }
      }
    }));
  },
};


