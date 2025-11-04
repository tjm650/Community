import api, { ADDRESS } from "@/assets/core/api";
import secure from "@/assets/core/secure";
import utils from "@/assets/core/utils";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { ABlogger } from "./storeContext/ablog/ABloger";
import { groupView } from "./storeContext/acommunity/GroupView";
import { Follows } from "./storeContext/afollows/Follows";
import { Messages } from "./storeContext/amessages/Messages";
import { MonetizationStore } from "./storeContext/amonetization/Monetization";
import { ServiceNotifs } from "./storeContext/anotif/ServiceNotifs";
import { CommAPI } from "./storeContext/api/User";
import { AppNotif } from "./storeContext/appNotif/AppNotif";
import { AppSearches } from "./storeContext/asearch/asearch";
import { UserNotifs } from "./storeContext/ausernotif/userNotif";
import { UserPosts } from "./storeContext/auserpost/UserPosts";

// Quercus AI Handlers
import {
  responseQuercusAI,
  responseQuercusConversationHistory,
  responseQuercusConversationList,
  responseQuercusConversationCreated,
  responseQuercusCampusInfo,
  responseQuercusStudyPlan,
  responseQuercusCareerGuidance,
  responseQuercusSettingsUpdated,
  responseQuercusTyping,
  responseQuercusError,
  responseQuercusImageAnalysis,
  responseQuercusDocumentAnalysis,
  responseQuercusConversationSummary,
  responseQuercusConversationInsights,
  responseQuercusAnalytics,
  responseQuercusSuggestions,
} from "@/assets/core/storeContext/Quercus/Quercus";

//----------------------------------------
// Socket receive message handlers
//----------------------------------------
// ################################################### App Notif ##########################################

// ################################################### App Notif ##########################################
const responseAppNotifList = AppNotif.responseAppNotifList;

// ################################################### User Notifications ##########################################
const responseUserNotificationPostLike =
  UserNotifs.responseUserNotificationPostLike;
const responseUserNotificationPostComment =
  UserNotifs.responseUserNotificationPostComment;
const responseUserNotifUnread = UserNotifs.responseUserNotifUnread;
const responseUserNotif = UserNotifs.responseUserNotif;

// ################################################### Search ##########################################
const responseAccommodations = MonetizationStore.responseAccommodations;
const responseTxAgents = MonetizationStore.responseTxAgents;

// ################################################### Search ##########################################
const responseAppSearch = AppSearches.responseAppSearch;
const responseAppTrending = AppSearches.responseAppTrending;

// ################################################### UserPosts ##########################################
const responsePostList = UserPosts.responsePostList;
const responsePostCommentList = UserPosts.responsePostCommentList;

// ################################################### Blogger ##########################################
const responseBlogList = ABlogger.responseBlogList;

// ################################################### Service Notifications ##########################################
const responseNotifList = ServiceNotifs.responseNotifList;
const responseNotifPostCommentList = ServiceNotifs.responseNotifPostCommentList;
const responseNotifLikes = ServiceNotifs.responseNotifLikes;
const responseNotifSend = ServiceNotifs.responseNotifSend;
const responseNotifPollUpdate = ServiceNotifs.responseNotifPollUpdate;
const responseNotifPollList = ServiceNotifs.responseNotifPollList;
const responseNotifPollDetails = ServiceNotifs.responseNotifPollDetails;
const responseNotifPollStatistics = ServiceNotifs.responseNotifPollStatistics;

// ################################################### API ##########################################
const responseConnectList = Follows.responseConnectList;
const responseConnectNew = Follows.responseConnectNew;
const responseRequestAccept = Follows.responseRequestAccept;
const responseRequestDelete = Follows.responseRequestDelete;
const responseSearch = Follows.responseSearch;
const responseRequestConnect = Follows.responseRequestConnect;
const responseRequestList = Follows.responseRequestList;

// ################################################### User_API ##########################################
const responseDirectory = CommAPI.responseDirectory;
const responseImage = CommAPI.responseImage;
const responseOccupation = CommAPI.responseOccupation;

// ################################################### Messages ##########################################
const responseMessageList = Messages.responseMessageList;
const responseMessageSend = Messages.responseMessageSend;
const responseMessageType = Messages.responseMessageType;

// ################################################### Communities ##########################################
const responseGroupConnectNew = groupView.responseGroupConnectList;
const responseGroupMessageList = groupView.responseGroupMessageList;
const responseGroupConnectList = groupView.responseGroupConnectList;
const responseGroupMessageSend = groupView.responseGroupMessageSend;

// ==============================================================================================================

const useGlobal = create(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
  //----------------------------------------
        // Initialization & Authentication
  //----------------------------------------
        initialized: false,
        isAuthenticated: false,
        user: null,
        tokens: null,
        theme: "light", // light, dark, auto
        language: "en",
        signUpComplete: false,
        agreementChecked: false,
        
        //----------------------------------------
        // Enhanced App State
        //----------------------------------------
        appState: {
          isLoading: false,
          isOnline: true,
          lastSync: null,
          error: null,
          notifications: [],
          unreadCount: 0,
        },

  //----------------------------------------
        // Enhanced Search & Discovery
  //----------------------------------------
        search: {
          query: "",
          results: {
            users: [],
            communities: [],
            posts: [],
            blogs: [],
          },
          trending: [],
          recentSearches: [],
          searchHistory: [],
          filters: {
            type: "all", // all, users, communities, posts, blogs
            category: "",
            dateRange: "all", // all, today, week, month, year
            sortBy: "relevance", // relevance, date, popularity
          },
          isLoading: false,
          hasMore: true,
          page: 1,
        },
              
        //----------------------------------------
        // Enhanced User Management
        //----------------------------------------
        userProfile: {
          preferences: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: false,
            profileVisibility: "public", // public, friends, private
            showOnlineStatus: true,
            allowMessagesFrom: "everyone", // everyone, friends, none
            autoPlayVideos: true,
            showTrendingContent: true,
            contentLanguage: "en",
            theme: "auto", // light, dark, auto  
          },
          analytics: { 
            totalLogins: 0,
            lastLogin: null,
            totalSessionTime: 0,
            averageSessionTime: 0,
            postsCreated: 0,
            commentsMade: 0,
            likesGiven: 0,
            likesReceived: 0,
            connectionsMade: 0,
            messagesSent: 0,
            messagesReceived: 0,
          },
          sessions: [],
        },
        
        //----------------------------------------
        // Enhanced Messaging System
        //----------------------------------------
        messaging: {
          conversations: [],
          activeConversation: null,
          messages: {},
          unreadMessages: {},
          typingUsers: {},
          onlineUsers: [],
          messageDrafts: {},
          attachments: [],
          reactions: {},
          // Message configuration
          settings: {
            autoDownloadMedia: true,
            showMessagePreview: true,
            enableNotifications: true,
            messageRetentionDays: 30,
            maxFileSize: 10 * 1024 * 1024, // 10MB
          },
        },
        
        //----------------------------------------
        // Enhanced Community Management
        //----------------------------------------
        communities: {
          userCommunities: [],
          discoveredCommunities: [],
          featuredCommunities: [],
          trendingCommunities: [],
          categories: [],
          moderators: {},
          members: {},
          posts: {},
          events: [],
        },
        
        //----------------------------------------
        // Enhanced Content Management
        //----------------------------------------
        content: {
          posts: [],
          blogs: [],
          comments: {},
          likes: {},
          shares: {},
          bookmarks: [],
          drafts: [],
          media: [],
          tags: [],
          categories: [],
          // Content configuration
          settings: {
            autoSaveDrafts: true,
            draftSaveInterval: 30000, // 30 seconds
            maxMediaSize: 50 * 1024 * 1024, // 50MB
            supportedFormats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'pdf'],
            enableComments: true,
            enableSharing: true,
            enableBookmarks: true,
          },
        },
        
        //----------------------------------------
        // Enhanced Networking
        //----------------------------------------
        networking: {
          connections: [],
          pendingRequests: [],
          receivedRequests: [],
          suggestions: [],
          blockedUsers: [],
          followers: [],
          following: [],
          mutualConnections: {},
        },

  //----------------------------------------
        // Performance & Analytics
  //----------------------------------------
        performance: {
          metrics: {
            appLoadTime: 0,
            apiResponseTime: {},
            memoryUsage: 0,
            batteryLevel: 100,
            networkSpeed: 0,
          },
          cache: {
            images: {},
            data: {},
            search: {},
          },
          errors: [],
          warnings: [],
        },

        //----------------------------------------
        // Monetization
        //----------------------------------------
        monetization: { ...MonetizationStore.state },

        //----------------------------------------
        // Service Guide
        //----------------------------------------
        serviceGuide: {
          serviceGuides: [],
          serviceGuidesNext: null,
          documents: [],
          documentsNext: null,
          aiSearchResults: null,
          isLoading: false,
          error: null,
        },

        //----------------------------------------
        // Quercus AI Assistant
        //----------------------------------------
        quercusAI: {
          conversations: [],
          currentConversation: null,
          messages: [],
          aiSuggestions: [],
          campusInfo: {},
          studyPlan: null,
          careerGuidance: null,
          aiSettings: {
            response_style: 'concise',
            auto_save: true,
            notifications_enabled: true,
          },
          isLoading: false,
          error: null,
          typing: false,
        },

        //----------------------------------------
        // Quercus AI Assistant
        //----------------------------------------
        quercusAI: {
          conversations: [],
          currentConversation: null,
          messages: [],
          aiSuggestions: [],
          campusInfo: {},
          studyPlan: null,
          careerGuidance: null,
          aiSettings: {
            response_style: 'concise',
            auto_save: true,
            notifications_enabled: true,
            max_conversation_length: 100,
            context_window: 10,
          },
          isLoading: false,
          error: null,
          typing: false,
          // Integration with messaging system
          messageIntegration: {
            enableQuercusInMessages: true,
            quercusMessagePrefix: '@quercus',
            autoSuggestQuercus: true,
          },
        },

  //----------------------------------------
        // Enhanced Initialization
  //----------------------------------------
        init: async () => {
          try {
            set({ appState: { ...get().appState, isLoading: true } });
            
            const credentials = await secure.get("credentials");
            const tokens = await secure.get("tokens");
            
            if (credentials && tokens) {
              try {
                const response = await api({
                  method: "POST",
                  url: "/api/signin",
                  data: {
                    username: credentials.username,
                    password: credentials.password,
                  },
                });
                
                if (response.status === 200) {
                  const user = response.data.user;
                  const newTokens = response.data.tokens;
                  
                  await secure.set("tokens", newTokens);
                  
                  set((state) => ({
                    initialized: true,
                    isAuthenticated: true,
                    user,
                    tokens: newTokens,
                    theme: user.theme_preference || "light",
                    language: user.language || "en",
                    signUpComplete: user.first_name && true,
                    agreementChecked: user.agreement && true,
                    appState: { 
                      ...state.appState, 
                      isLoading: false,
                      lastSync: new Date().toISOString()
                    },
                  }));
                  
                  // Initialize user-specific data
                  get().initializeUserData();

                  // Initialize message-post utilities
                  get().initializeMessagePostUtils();

                  return { success: true, user };
                }
              } catch (error) {
                console.error("Token validation failed:", error);
                // Clear invalid credentials
                await secure.remove("credentials");
                await secure.remove("tokens");
              }
            }
            
            set((state) => ({
              initialized: true,
              appState: { ...state.appState, isLoading: false }
            }));
            
            return { success: false };
          } catch (error) {
            console.error("Initialization error:", error);
            set((state) => ({
              initialized: true,
              appState: { 
                ...state.appState, 
                isLoading: false,
                error: error.message 
              }
            }));
            return { success: false, error: error.message };
          }
        },

  //----------------------------------------
        // Enhanced Authentication Methods
  //----------------------------------------
        signIn: async (credentials) => {
          try {
            set({ appState: { ...get().appState, isLoading: true } });
            
            const response = await api({
              method: "POST",
              url: "/api/signin",
              data: credentials,
            });
            
            if (response.status === 200) {
              const user = response.data.user;
              const tokens = response.data.tokens;
              
              await secure.set("credentials", credentials);
              await secure.set("tokens", tokens);
              
              set((state) => ({
                isAuthenticated: true,
                user,
                tokens,
                theme: user.theme_preference || "light",
                language: user.language || "en",
                signUpComplete: user.first_name && true,
                agreementChecked: user.agreement && true,
                appState: { 
                  ...state.appState, 
                  isLoading: false,
                  lastSync: new Date().toISOString()
                },
              }));
              
              get().initializeUserData();
              
              return { success: true, user };
            }
            
            return { success: false, error: "Invalid credentials" };
          } catch (error) {
            console.error("Sign in error:", error);
            set((state) => ({
              appState: { 
                ...state.appState, 
                isLoading: false,
                error: error.message 
              }
            }));
            return { success: false, error: error.message };
          }
        },

        signUp: async (userData) => {
          try {
            set({ appState: { ...get().appState, isLoading: true } });
            
            const response = await api({
              method: "POST",
              url: "/api/signup",
              data: userData,
            });
            
            if (response.status === 201) {
              const user = response.data.user;
              const tokens = response.data.tokens;
              
              await secure.set("tokens", tokens);
              
              set((state) => ({
                isAuthenticated: true,
                user,
                tokens,
                theme: user.theme_preference || "light",
                language: user.language || "en",
                signUpComplete: user.first_name && true,
                agreementChecked: user.agreement && true,
                appState: { 
                  ...state.appState, 
                  isLoading: false,
                  lastSync: new Date().toISOString()
                },
              }));
              
              get().initializeUserData();
              
              return { success: true, user };
            }
            
            return { success: false, error: "Registration failed" };
          } catch (error) {
            console.error("Sign up error:", error);
            set((state) => ({
              appState: { 
                ...state.appState, 
                isLoading: false,
                error: error.message 
              }
            }));
            return { success: false, error: error.message };
          }
        },

        signOut: async () => {
          try {
            const tokens = get().tokens;
            if (tokens?.access) {
              await api({
                method: "POST",
                url: "/api/signout",
                headers: {
                  Authorization: `Bearer ${tokens.access}`,
                },
              });
            }
          } catch (error) {
            console.error("Sign out error:", error);
          } finally {
            await secure.remove("credentials");
            await secure.remove("tokens");
            
            set({
              isAuthenticated: false,
              user: null,
              tokens: null,
              signUpComplete: false,
              agreementChecked: false,
              appState: {
                isLoading: false,
                isOnline: true,
                lastSync: null,
                error: null,
                notifications: [],
                unreadCount: 0,
              },
            });
          }
        },

        //----------------------------------------
        // Enhanced Search Methods
        //----------------------------------------
        appSearchAll: async (query, filters = {}) => {
          try {
            set((state) => ({
              search: {
                ...state.search,
                query,
                isLoading: true,
                filters: { ...state.search.filters, ...filters },
              },
            }));
            
            const response = await api({
              method: "GET",
              url: "/api/search",
              params: { q: query, ...filters },
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            if (response.status === 200) {
              const { results, total_results } = response.data;
              
              // Update search history
              const newHistory = [query, ...get().search.searchHistory.filter(item => item !== query)].slice(0, 10);
              
              set((state) => ({
                search: {
                  ...state.search,
                  results,
                  totalResults: total_results,
                  searchHistory: newHistory,
                  isLoading: false,
                  hasMore: total_results > (state.search.page * 20),
                },
              }));
              
              return results;
            }
          } catch (error) {
            console.error("Search error:", error);
            set((state) => ({
              search: { ...state.search, isLoading: false },
              appState: { ...state.appState, error: error.message },
            }));
            throw error;
          }
        },

        appGetTrending: async () => {
          try {
            const response = await api({
              method: "GET",
              url: "/api/trending",
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            if (response.status === 200) {
              set((state) => ({
                search: {
                  ...state.search,
                  trending: response.data.trending || [],
                },
              }));
              
              return response.data.trending;
            }
          } catch (error) {
            console.error("Trending error:", error);
            throw error;
          }
        },

        //----------------------------------------
        // Enhanced User Data Management
        //----------------------------------------
        initializeUserData: async () => {
          try {
            // Load user preferences
            const prefsResponse = await api({
              method: "GET",
              url: "/api/user/preferences",
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            if (prefsResponse.status === 200) {
              set((state) => ({
                userProfile: {
                  ...state.userProfile,
                  preferences: prefsResponse.data.preferences,
                },
              }));
            }
            
            // Load user analytics
            const analyticsResponse = await api({
              method: "GET",
              url: "/api/user/analytics",
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            if (analyticsResponse.status === 200) {
              set((state) => ({
                userProfile: {
                  ...state.userProfile,
                  analytics: analyticsResponse.data.analytics,
                },
              }));
            }
            
            // Load notifications
            get().loadNotifications();
            
            // Load communities
            get().loadUserCommunities();
            
            // Load connections
            get().loadConnections();
            
          } catch (error) {
            console.error("User data initialization error:", error);
          }
        },

  //----------------------------------------
        // Enhanced Notification Management
  //----------------------------------------
        loadNotifications: async () => {
          try {
            const response = await api({
              method: "GET",
              url: "/api/notifications",
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            if (response.status === 200) {
              const { notifications, unread_count } = response.data;
              
              set((state) => ({
                appState: {
                  ...state.appState,
                  notifications,
                  unreadCount: unread_count,
                },
              }));
              console.log("Notifications loaded:", notifications);
            }
          } catch (error) {
            console.error("Load notifications error:", error);
          }
        },

        markNotificationsAsRead: async (notificationIds = []) => {
          try {
            await api({
              method: "PUT",
              url: "/api/notifications",
              data: { notification_ids: notificationIds },
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            // Update local state
            set((state) => ({
              appState: {
                ...state.appState,
                notifications: state.appState.notifications.map(notif => 
                  notificationIds.length === 0 || notificationIds.includes(notif.id)
                    ? { ...notif, is_read: true }
                    : notif
                ),
                unreadCount: notificationIds.length === 0 
                  ? 0 
                  : Math.max(0, state.appState.unreadCount - notificationIds.length),
              },
            }));
          } catch (error) {
            console.error("Mark notifications as read error:", error);
          }
        },

        //----------------------------------------
        // Enhanced Theme Management
        //----------------------------------------
        setTheme: (theme) => {
          set({ theme });
          // Update user preference
          get().updateUserPreference('theme', theme);
        },

  //----------------------------------------
        // Enhanced User Preferences
        //----------------------------------------
        updateUserPreference: async (key, value) => {
          try {
            await api({
              method: "PUT",
              url: "/api/user/preferences",
              data: { [key]: value },
              headers: {
                Authorization: `Bearer ${get().tokens?.access}`,
              },
            });
            
            set((state) => ({
              userProfile: {
                ...state.userProfile,
                preferences: {
                  ...state.userProfile.preferences,
                  [key]: value,
                },
              },
            }));
          } catch (error) {
            console.error("Update preference error:", error);
          }
        },

  //----------------------------------------
        // Enhanced Error Handling
  //----------------------------------------
        setError: (error) => {
          set((state) => ({
            appState: { ...state.appState, error },
          }));
        },

        clearError: () => {
          set((state) => ({
            appState: { ...state.appState, error: null },
          }));
        },

  //----------------------------------------
        // Enhanced Performance Monitoring
  //----------------------------------------
        updatePerformanceMetrics: (metrics) => {
          set((state) => ({
            performance: {
              ...state.performance,
              metrics: { ...state.performance.metrics, ...metrics },
            },
          }));
        },

        addError: (error) => {
          set((state) => ({
            performance: {
              ...state.performance,
              errors: [...state.performance.errors, { ...error, timestamp: new Date().toISOString() }],
            },
          }));
        },

  //----------------------------------------
        // Enhanced Cache Management
  //----------------------------------------
        setCache: (key, data, type = 'data') => {
          set((state) => ({
            performance: {
              ...state.performance,
              cache: {
                ...state.performance.cache,
                [type]: {
                  ...state.performance.cache[type],
                  [key]: { data, timestamp: Date.now() },
                },
              },
            },
          }));
        },

        getCache: (key, type = 'data') => {
          const cache = get().performance.cache[type][key];
          if (cache && Date.now() - cache.timestamp < 5 * 60 * 1000) { // 5 minutes
            return cache.data;
          }
          return null;
        },

  //----------------------------------------
  // Message-Post Configuration & Settings
  //----------------------------------------

  // Get integrated message-post configuration
  getMessagePostConfig: () => {
    return {
      messaging: get().messaging.settings,
      content: get().content.settings,
      quercusAI: get().quercusAI.messageIntegration,
      analytics: {
        enabled: true,
        trackMessages: true,
        trackPosts: true,
        trackInteractions: true,
      },
    };
  },

  // Update message-post integration settings
  updateMessagePostSettings: async (settings) => {
    try {
      const response = await api({
        method: "PUT",
        url: "/api/message-post/settings",
        data: settings,
        headers: {
          Authorization: `Bearer ${get().tokens?.access}`,
        },
      });

      if (response.status === 200) {
        set((state) => ({
          messaging: {
            ...state.messaging,
            settings: { ...state.messaging.settings, ...settings.messaging },
          },
          content: {
            ...state.content,
            settings: { ...state.content.settings, ...settings.content },
          },
          quercusAI: {
            ...state.quercusAI,
            messageIntegration: { ...state.quercusAI.messageIntegration, ...settings.quercusAI },
          },
        }));

        return { success: true };
      }
    } catch (error) {
      console.error('Update message-post settings error:', error);
      return { success: false, error: error.message };
    }
  },

  // Initialize message-post utilities
  initializeMessagePostUtils: async () => {
    try {
      // Load utilities from Quercus.js
          const QuercusUtils = require('@/assets/core/utils/Quercus');

      // Initialize number formatting utility
      if (QuercusUtils.formatNumber) {
        set((state) => ({
          content: {
            ...state.content,
            utils: {
              ...state.content.utils,
              formatNumber: QuercusUtils.formatNumber,
            },
          },
        }));
      }

      // Initialize AI response templates
      if (QuercusUtils.aiResponseTemplates) {
        set((state) => ({
          quercusAI: {
            ...state.quercusAI,
            responseTemplates: QuercusUtils.aiResponseTemplates,
          },
        }));
      }

      // Initialize campus AI prompts
      if (QuercusUtils.campusAIPrompts) {
        set((state) => ({
          quercusAI: {
            ...state.quercusAI,
            campusPrompts: QuercusUtils.campusAIPrompts,
          },
        }));
      }

      return { success: true };
    } catch (error) {
      console.error('Initialize message-post utils error:', error);
      return { success: false, error: error.message };
    }
  },

  //----------------------------------------
  // Missing Methods for Backward Compatibility
  //----------------------------------------
  loadUserCommunities: async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/api/user/communities",
        headers: {
          Authorization: `Bearer ${get().tokens?.access}`,
        },
      });

      if (response.status === 200) {
        set((state) => ({
          communities: {
            ...state.communities,
            userCommunities: response.data.communities || [],
          },
        }));
      }
    } catch (error) {
      console.error("Load user communities error:", error);
    }
  },

  loadConnections: async () => {
    try {
      const response = await api({
        method: "GET",
        url: "/api/user/connections",
        headers: {
          Authorization: `Bearer ${get().tokens?.access}`,
        },
      });

      if (response.status === 200) {
        set((state) => ({
          networking: {
            ...state.networking,
            connections: response.data.connections || [],
            followers: response.data.followers || [],
            following: response.data.following || [],
          },
        }));
      }
    } catch (error) {
      console.error("Load connections error:", error);
    }
  },

  //----------------------------------------
  // Quercus AI Methods
  //----------------------------------------
  quercusGenerateResponse: async (prompt, context = 'campus_assistant') => {
    try {
      // Check if store is initialized
      if (!get().initialized) {
        throw new Error('Store not initialized');
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            source: "quercus.ai_query",
            prompt: prompt,
            context: context,
            timestamp: new Date().toISOString(),
          })
        );
        console.log('Quercus AI query sent:', prompt);
      } else {
        throw new Error('WebSocket not connected');
      }
    } catch (error) {
      console.error('Quercus generate response error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
      throw error;
    }
  },

  quercusGetConversationHistory: async (conversationId = null) => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.conversation_history",
            conversation_id: conversationId,
          })
        );
      }
    } catch (error) {
      console.error('Quercus conversation history error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusCreateConversation: async (title = '') => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.conversation_create",
            title: title,
          })
        );
      }
    } catch (error) {
      console.error('Quercus create conversation error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusSendTypingIndicator: async (isTyping = true) => {
    try {
      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: isTyping ? "quercus.typing_start" : "quercus.typing_end",
          })
        );
      }
    } catch (error) {
      console.error('Quercus typing indicator error:', error);
    }
  },

  quercusGetCampusInfo: async (type, query = '') => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.campus_info",
            type: type,
            query: query,
          })
        );
      }
    } catch (error) {
      console.error('Quercus campus info error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusGetStudyPlan: async (subject, duration, difficulty) => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.study_plan",
            subject: subject,
            duration: duration,
            difficulty: difficulty,
          })
        );
      }
    } catch (error) {
      console.error('Quercus study plan error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusGetCareerGuidance: async (field, interests) => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.career_guidance",
            field: field,
            interests: interests,
          })
        );
      }
    } catch (error) {
      console.error('Quercus career guidance error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusUpdateSettings: async (settings) => {
    try {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket) {
        socket.send(
          JSON.stringify({
            source: "quercus.settings_update",
            settings: settings,
          })
        );
      }
    } catch (error) {
      console.error('Quercus settings update error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
    }
  },

  quercusClearError: () => {
    set((state) => ({
      quercusAI: {
        ...state.quercusAI,
        error: null,
      },
    }));
  },

  //----------------------------------------
  // Message-Post Integration Utilities
  //----------------------------------------

  // Enhanced Quercus AI response generation with better error handling
  quercusGenerateResponseEnhanced: async (prompt, context = 'campus_assistant') => {
    try {
      // Check if store is initialized
      if (!get().initialized) {
        throw new Error('Store not initialized');
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          isLoading: true,
          error: null,
        },
      }));

      const socket = get().socket;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            source: "quercus.ai_query",
            prompt: prompt,
            context: context,
            timestamp: new Date().toISOString(),
          })
        );

        console.log('Quercus AI enhanced query sent:', prompt);
        return { success: true };
      } else {
        throw new Error('WebSocket not connected');
      }
    } catch (error) {
      console.error('Quercus generate response enhanced error:', error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: error.message,
          isLoading: false,
        },
      }));
      return { success: false, error: error.message };
    }
  },

  // Enhanced message sending with Quercus AI integration
  sendMessageWithQuercus: async (messageData) => {
    try {
      const { message, conversationId, enableQuercus = false } = messageData;

      // Check if message should trigger Quercus AI
      if (enableQuercus && message.includes(get().quercusAI.messageIntegration.quercusMessagePrefix)) {
        const quercusPrompt = message.replace(get().quercusAI.messageIntegration.quercusMessagePrefix, '').trim();
        if (quercusPrompt) {
          // Send to Quercus AI first
          await get().quercusGenerateResponse(quercusPrompt, 'messaging_assistant');


    // try {
    //   // Check if store is initialized
    //   if (!get().initialized) {
    //     throw new Error('Store not initialized');
    //   }

    //   set((state) => ({
    //     quercusAI: {
    //       ...state.quercusAI,
    //       isLoading: true,
    //       error: null,
    //     },
    //   }));

    //   const socket = get().socket;
    //   if (socket && socket.readyState === WebSocket.OPEN) {
    //     socket.send(
    //       JSON.stringify({
    //         source: "quercus.ai_query",
    //         prompt: quercusPrompt,
    //         context: "messaging_assistant",
    //         timestamp: new Date().toISOString(),
    //       })
    //     );
    //     console.log('Quercus AI query sent:', quercusPrompt);
    //   } else {
    //     throw new Error('WebSocket not connected');
    //   }
    // } catch (error) {
    //   console.error('Quercus generate response error:', error);
    //   set((state) => ({
    //     quercusAI: {
    //       ...state.quercusAI,
    //       error: error.message,
    //       isLoading: false,
    //     },
    //   }));
    //   throw error;
    // } 
  
        }    
      }

      

       

      

      // Send regular message
      await get().messageSend({
        connectionId: conversationId,
        message: message,
      });

      // Track analytics
      if (get().user) {
        import('@/assets/core/storeContext/amonetization/analytics').then(({ trackPageVisit }) => {
          trackPageVisit('message_sent', conversationId, 'message');
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Send message with Quercus error:', error);
      set((state) => ({
        appState: { ...state.appState, error: error.message }
      }));
      return { success: false, error: error.message };
    }
  },

  // Enhanced post creation with utilities integration
  createPostWithAnalytics: async (postData) => {
    try {
      const { description, image, userId } = postData;

      // Create the post
      await get().postSend({
        userId,
        description,
        image,
      });

      // Track analytics
      if (get().user) {
        import('@/assets/core/storeContext/amonetization/analytics').then(({ trackPageVisit }) => {
          trackPageVisit('post_created', userId, 'post');
        });
      }

      // Auto-suggest Quercus AI for study-related posts
      if (description.toLowerCase().includes('study') || description.toLowerCase().includes('help')) {
        set((state) => ({
          quercusAI: {
            ...state.quercusAI,
            aiSuggestions: [
              'I noticed you mentioned studying. Would you like help with study techniques?',
              'I can help you create a study plan if needed.',
              ...state.quercusAI.aiSuggestions,
            ],
          },
        }));
      }

      return { success: true };
    } catch (error) {
      console.error('Create post with analytics error:', error);
      set((state) => ({
        appState: { ...state.appState, error: error.message }
      }));
      return { success: false, error: error.message };
    }
  },

  // Message formatting utilities
  formatMessageContent: (content, type = 'text') => {
    try {
      const QuercusUtils = require('@/assets/core/utils/Quercus');

      switch (type) {
        case 'number':
          return QuercusUtils.formatNumber ? QuercusUtils.formatNumber(content) : content;
        case 'list':
          return Array.isArray(content) ? content.join(', ') : content;
        default:
          return content;
      }
    } catch (error) {
      console.error('Message formatting error:', error);
      return content;
    }
  },

  // Auto-save message drafts
  saveMessageDraft: (conversationId, content) => {
    set((state) => ({
      messaging: {
        ...state.messaging,
        messageDrafts: {
          ...state.messaging.messageDrafts,
          [conversationId]: {
            content,
            timestamp: Date.now(),
          },
        },
      },
    }));
  },

  // Load message draft
  loadMessageDraft: (conversationId) => {
    return get().messaging.messageDrafts[conversationId];
  },

  // Clear message draft
  clearMessageDraft: (conversationId) => {
    set((state) => {
      const newDrafts = { ...state.messaging.messageDrafts };
      delete newDrafts[conversationId];
      return {
        messaging: {
          ...state.messaging,
          messageDrafts: newDrafts,
        },
      };
    });
  },

  // Get conversation statistics
  getConversationStats: (conversationId) => {
    const messages = get().messaging.messages[conversationId] || [];
    const user = get().user;

    if (!user) return null;

    const userMessages = messages.filter(msg => msg.sender_id === user.id);
    const totalMessages = messages.length;

    return {
      totalMessages,
      userMessages: userMessages.length,
      otherMessages: totalMessages - userMessages.length,
      lastActivity: messages.length > 0 ? messages[messages.length - 1].timestamp : null,
      participants: 2, // Assuming 1-on-1 conversations for now
    };
  },

  // Search messages across conversations
  searchMessages: (query) => {
    const allMessages = Object.values(get().messaging.messages).flat();
    return allMessages.filter(message =>
      message.content.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Get unread message count for specific conversation
  getUnreadCount: (conversationId) => {
    return get().messaging.unreadMessages[conversationId] || 0;
  },

  // Mark conversation as read
  markConversationAsRead: async (conversationId) => {
    try {
      await get().messageRed(conversationId, 'red');

      // Update local state
      set((state) => ({
        messaging: {
          ...state.messaging,
          unreadMessages: {
            ...state.messaging.unreadMessages,
            [conversationId]: 0,
          },
        },
      }));

      return { success: true };
    } catch (error) {
      console.error('Mark conversation as read error:', error);
      return { success: false, error: error.message };
    }
  },

  // Enhanced typing indicator with Quercus integration
  sendTypingWithQuercus: async (conversationId, isTyping = true) => {
    try {
      // Send regular typing indicator
      await get().messageType(get().user?.username);

      // If typing stopped and Quercus integration is enabled, check for suggestions
      if (!isTyping && get().quercusAI.messageIntegration.enableQuercusInMessages) {
        const lastMessage = get().getLastMessage(conversationId);
        if (lastMessage && lastMessage.includes('?')) {
          // Auto-suggest Quercus AI for questions
          set((state) => ({
            quercusAI: {
              ...state.quercusAI,
              aiSuggestions: [
                'I can help answer that question!',
                'Would you like me to explain this further?',
                ...state.quercusAI.aiSuggestions,
              ],
            },
          }));
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Send typing with Quercus error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get last message in conversation
  getLastMessage: (conversationId) => {
    const messages = get().messaging.messages[conversationId] || [];
    return messages.length > 0 ? messages[messages.length - 1].content : '';
  },

  // Check if user can send media
  canSendMedia: (fileSize, fileType) => {
    const settings = get().content.settings;
    const maxSize = settings.maxMediaSize;
    const supportedTypes = settings.supportedFormats;

    // Extract extension from MIME type or filename
    const extension = fileType.split('/')[1] || fileType.split('.').pop();

    return {
      sizeAllowed: fileSize <= maxSize,
      typeAllowed: supportedTypes.includes(extension.toLowerCase()),
      maxSize,
      supportedTypes,
    };
  },

  // Auto-cleanup old messages and posts
  cleanupOldContent: async () => {
    try {
      const messageRetentionDays = get().messaging.settings.messageRetentionDays;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - messageRetentionDays);

      // This would typically be handled by the backend
      // but we can implement client-side cleanup for performance

      set((state) => ({
        messaging: {
          ...state.messaging,
          // Mark old messages for cleanup (backend would handle actual deletion)
          cleanupCandidates: Object.entries(state.messaging.messages).map(([conversationId, messages]) => ({
            conversationId,
            oldMessages: messages.filter(msg => new Date(msg.timestamp) < cutoffDate),
          })).filter(item => item.oldMessages.length > 0),
        },
      }));

      return { success: true };
    } catch (error) {
      console.error('Content cleanup error:', error);
      return { success: false, error: error.message };
    }
  },

  //----------------------------------------
        // Legacy Methods for Backward Compatibility
  //----------------------------------------

   // Legacy search methods removed - use the main functions directly

        // Legacy notification methods
        responseAppNotifList,
        responseUserNotificationPostLike,
        responseUserNotificationPostComment,
        responseUserNotifUnread,
        responseUserNotif,
        responseAppSearch,
        responseAppTrending,
        responsePostList,
        responsePostCommentList,
        responseBlogList,
        responseNotifList,
        responseNotifPostCommentList,
        responseNotifLikes,
        responseNotifSend,
        responseNotifPollUpdate,
        responseNotifPollList,
        responseNotifPollDetails,
        responseNotifPollStatistics,
        responseConnectList,
        responseConnectNew,
        responseRequestAccept,
        responseRequestDelete,
        responseSearch,
        responseRequestConnect,
        responseRequestList,
        responseDirectory,
        responseImage,
        responseOccupation,
        responseMessageList,
        responseMessageSend,
        responseMessageType,
        responseGroupConnectNew,
        responseGroupMessageList,
        responseGroupConnectList,
        responseGroupMessageSend,
        responseAccommodations,
        responseTxAgents,

        // Quercus AI Methods
       

        responseQuercusAI,
        responseQuercusConversationHistory,
        responseQuercusConversationList,
        responseQuercusConversationCreated,
        responseQuercusCampusInfo,
        responseQuercusStudyPlan,
        responseQuercusCareerGuidance,
        responseQuercusSettingsUpdated,
        responseQuercusTyping,
        responseQuercusError,
        responseQuercusImageAnalysis,
        responseQuercusDocumentAnalysis,
        responseQuercusConversationSummary,
        responseQuercusConversationInsights,
        responseQuercusAnalytics,
        responseQuercusSuggestions,

  //----------------------------------------
        // WebSocket for Real-Time Updates
  //----------------------------------------

  socket: null,

  socketConnect: async () => {
    const tokens = await secure.get("tokens");
    const url = `ws://${ADDRESS}/api/?token=${tokens.access}`;

    const socket = new WebSocket(url);
    socket.onopen = () => {
      utils.log("socket.open");

      socket.send(
        JSON.stringify({
          source: "app.trending",
        })
      );

      socket.send(
        JSON.stringify({
          source: "user.notif.unread_notifs",
        })
      );

      socket.send(
        JSON.stringify({
          source: "app.notif.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "directory.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "request.list",
        })
      );
      socket.send(
        JSON.stringify({
          source: "connect.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.likes",
        })
      );

      socket.send(
        JSON.stringify({
          source: "blog.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "post.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "post.likes",
        })
      );

      socket.send(
        JSON.stringify({
          source: "comment.likes",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.comment.likes",
        })
      );

      socket.send(
        JSON.stringify({
          source: "comment.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.comment.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "blog.interactions",
        })
      );

      socket.send(
        JSON.stringify({
          source: "post.interactions",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.interactions",
        })
      );

      socket.send(
        JSON.stringify({
          source: "comment.interactions",
        })
      );

      socket.send(
        JSON.stringify({
          source: "notif.comment.interactions",
        })
      );

      socket.send(
        JSON.stringify({
          source: "blog.shared",
        })
      );

      socket.send(
        JSON.stringify({
          source: "groupmessages.list",
        })
      );

      socket.send(
        JSON.stringify({
          source: "group_connect.list",
        })
      );

      // Initialize message-post utilities
      socket.send(
        JSON.stringify({
          source: "message.post.utils.init",
        })
      );

      // Initialize analytics tracking
      socket.send(
        JSON.stringify({
          source: "analytics.init",
        })
      );

      // Initialize Quercus AI integration
      socket.send(
        JSON.stringify({
          source: "quercus.integration.init",
        })
      );
    };

    socket.onmessage = (event) => {
      // Convert data back to JS object
      const parsed = JSON.parse(event.data);

      // Debug log formatted data
      utils.log("socket.onmessage", parsed);

      const responses = {
        "app.search": responseAppSearch,
        "app.trending": responseAppTrending,
        ////////////////

        // "user.notif.post.like.list": responseUserNotificationPostLike,
        "user.notif.all_notifs": responseUserNotif,
        "user.notif.unread_notifs": responseUserNotifUnread,
        ////////////////

        "app.notif.list": responseAppNotifList,
        ////////////////

        "directory.list": responseDirectory,
        //////////////////

        "user.occupation": responseOccupation,
        search: responseSearch,
        "image.upload": responseImage,
        //////////////////

        "request.accept": responseRequestAccept,
        "request.delete": responseRequestDelete,
        "request.connect": responseRequestConnect,
        "request.list": responseRequestList,
        //////////////////

        "blog.list": responseBlogList,
        // "blog.send": responseBlogSend,
        ///////////////

        "post.list": responsePostList,
        "comment.list": responsePostCommentList,
        // "post.send": responsePostSend,
        ////////////////

        "notif.comment.list": responseNotifPostCommentList,
        "notif.list": responseNotifList,
        "notif.likes": responseNotifLikes,
        "notif.poll.update": responseNotifPollUpdate,
        "notif.poll.list": responseNotifPollList,
        "notif.poll.details": responseNotifPollDetails,
        "notif.poll.statistics": responseNotifPollStatistics,
        "notif.poll.update": responseNotifPollUpdate,
        /////////////////

        "connect.list": responseConnectList,
        "connect.new": responseConnectNew,
        ///////////////// 

        "message.list": responseMessageList,
        "message.send": responseMessageSend,
        "message.type": responseMessageType,
        //////////////////

        "group_connect.new": responseGroupConnectNew,
        "group_connect.list": responseGroupConnectList,
        "groupmessages.list": responseGroupMessageList,
        "group_message.send": responseGroupMessageSend,

        // Enhanced message-post routing
        "message.post.create": (set, get, data) => {
          // Handle combined message and post creation
          const { message, post } = data;

          // Update messaging state
          if (message) {
            set((state) => ({
              messaging: {
                ...state.messaging,
                messages: {
                  ...state.messaging.messages,
                  [message.conversation_id]: [
                    ...(state.messaging.messages[message.conversation_id] || []),
                    message,
                  ],
                },
              },
            }));
          }

          // Update content state
          if (post) {
            set((state) => ({
              content: {
                ...state.content,
                posts: [post, ...state.content.posts],
              },
            }));
          }
        },

        "message.analytics.track": (set, get, data) => {
          // Track message analytics
          import('@/assets/core/storeContext/amonetization/analytics').then(({ trackPageVisit }) => {
            trackPageVisit('message_interaction', data.conversation_id, 'message');
          });
        },

        "post.analytics.track": (set, get, data) => {
          // Track post analytics
          import('@/assets/core/storeContext/amonetization/analytics').then(({ trackPageVisit }) => {
            trackPageVisit('post_interaction', data.post_id, 'post');
          });
        },
  // monetization
    "monetization.marketing": MonetizationStore.responseMarketing,
  "monetization.library": MonetizationStore.responseLibrary,
  "monetization.campusmap": MonetizationStore.responseCampusMap,
  "monetization.accommodations": MonetizationStore.responseAccommodations,
  "monetization.tx": MonetizationStore.responseTxAgents,

    // analytics
    "analytics.dashboard": (set, get, data) => {
      set((state) => ({
        monetization: {
          ...state.monetization,
          analytics: {
            ...state.monetization.analytics,
            dashboard: data.dashboard || [],
            isLoading: false
          }
        }
      }));
    },
    "analytics.summary": (set, get, data) => {
      set((state) => ({
        monetization: {
          ...state.monetization,
          analytics: {
            ...state.monetization.analytics,
            summary: data.summary || {
              total_visits_7days: 0,
              unique_visitors_7days: 0,
              top_pages: []
            }
          }
        }
      }));
    },
    "analytics.visit_tracked": (set, get, data) => {
      // Optionally refresh analytics data after a visit is tracked
      console.log('Visit tracked:', data);
    },

    // Service Guide AI Search
    "service_guide.ai_search": (set, get, data) => {
      if (data.error) {
        console.error('AI Search error:', data.error);
        return;
      }

      // Store AI search results in a dedicated state
      set((state) => ({
        serviceGuide: {
          ...state.serviceGuide,
          aiSearchResults: data,
          isLoading: false
        }
      }));
    },

    "service_guide.list": (set, get, data) => {
      set((state) => ({
        serviceGuide: {
          ...state.serviceGuide,
          serviceGuides: [...(state.serviceGuide.serviceGuides || []), ...(data.service_guides || [])],
          serviceGuidesNext: data.next || null,
          isLoading: false
        }
      }));
    },

    "service_guide.documents": (set, get, data) => {
      if (data.error) {
        console.error('Service guide documents error:', data.error);
        return;
      }

      set((state) => ({
        serviceGuide: {
          ...state.serviceGuide,
          documents: data.documents || [],
          documentsNext: data.next || null,
          isLoading: false
        }
      }));
    },

    // Quercus AI Response Handlers
    "quercus.ai_response": responseQuercusAI,
    "quercus.conversation_history": responseQuercusConversationHistory,
    "quercus.conversation_list": responseQuercusConversationList,
    "quercus.conversation_created": responseQuercusConversationCreated,
    "quercus.campus_info": responseQuercusCampusInfo,
    "quercus.study_plan": responseQuercusStudyPlan,
    "quercus.career_guidance": responseQuercusCareerGuidance,
    "quercus.settings_updated": responseQuercusSettingsUpdated,
    "quercus.typing": responseQuercusTyping,
    "quercus.error": responseQuercusError,
    "quercus.image_analysis": responseQuercusImageAnalysis,
    "quercus.document_analysis": responseQuercusDocumentAnalysis,
    "quercus.conversation_summary": responseQuercusConversationSummary,
    "quercus.conversation_insights": responseQuercusConversationInsights,
    "quercus.analytics": responseQuercusAnalytics,
    "quercus.suggestions": responseQuercusSuggestions,

    // Quercus AI Response Handlers
    "quercus.ai_response": (set, get, data) => {
      if (data.error) {
        console.error('Quercus AI response error:', data.error);
        set((state) => ({
          quercusAI: {
            ...state.quercusAI,
            error: data.error,
            isLoading: false
          }
        }));
        return;
      }

      // Add AI response to messages
      const newMessage = {
        id: Date.now(),
        text: data.response,
        isUser: false,
        timestamp: data.timestamp || new Date().toISOString(),
        type: 'ai_response',
        conversation_id: data.conversation_id,
        message_id: data.message_id,
      };

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          messages: [...(state.quercusAI.messages || []), newMessage],
          currentConversation: data.conversation_id || state.quercusAI.currentConversation,
          isLoading: false,
          typing: false,
        }
      }));
    },

    "quercus.conversation_history": (set, get, data) => {
      if (data.error) {
        console.error('Conversation history error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          conversations: data.conversations || [],
          messages: data.messages || [],
          isLoading: false,
        }
      }));
    },

    "quercus.conversation_list": (set, get, data) => {
      if (data.error) {
        console.error('Conversation list error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          conversations: data.conversations || [],
          isLoading: false,
        }
      }));
    },

    "quercus.conversation_created": (set, get, data) => {
      if (data.error) {
        console.error('Conversation creation error:', data.error);
        return;
      }

      // Add new conversation to the list
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          conversations: [data, ...(state.quercusAI.conversations || [])],
          currentConversation: data.conversation_id,
          isLoading: false,
        }
      }));
    },

    "quercus.campus_info": (set, get, data) => {
      if (data.error) {
        console.error('Campus info error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          campusInfo: {
            ...state.quercusAI.campusInfo,
            [data.type]: data,
          },
          isLoading: false,
        }
      }));
    },

    "quercus.study_plan": (set, get, data) => {
      if (data.error) {
        console.error('Study plan error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          studyPlan: data,
          isLoading: false,
        }
      }));
    },

    "quercus.career_guidance": (set, get, data) => {
      if (data.error) {
        console.error('Career guidance error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          careerGuidance: data,
          isLoading: false,
        }
      }));
    },

    "quercus.settings_updated": (set, get, data) => {
      if (data.error) {
        console.error('Settings update error:', data.error);
        return;
      }

      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          aiSettings: { ...state.quercusAI.aiSettings, ...data },
          isLoading: false,
        }
      }));
    },

    "quercus.typing": (set, get, data) => {
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          typing: data.is_typing || false,
        }
      }));
    },

    "quercus.error": (set, get, data) => {
      console.error('Quercus error:', data.error);
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          error: data.error,
          isLoading: false,
          typing: false,
        }
      }));
    },

    // Enhanced message sending response
    "message.send.with_utils": (set, get, data) => {
      if (data.error) {
        console.error('Message send with utils error:', data.error);
        return;
      }

      // Update message state with utilities data
      set((state) => ({
        messaging: {
          ...state.messaging,
          messages: {
            ...state.messaging.messages,
            [data.conversation_id]: [
              ...(state.messaging.messages[data.conversation_id] || []),
              { ...data.message, utils_processed: true },
            ],
          },
        },
      }));
    },

    // Enhanced post creation response
    "post.create.with_utils": (set, get, data) => {
      if (data.error) {
        console.error('Post create with utils error:', data.error);
        return;
      }

      // Update content state with utilities data
      set((state) => ({
        content: {
          ...state.content,
          posts: [data.post, ...state.content.posts],
        },
      }));
    },

    // Quercus message processing response
    "quercus.process_message": (set, get, data) => {
      if (data.error) {
        console.error('Quercus message processing error:', data.error);
        return;
      }

      // Add Quercus AI insights to the conversation
      if (data.ai_insights) {
        set((state) => ({
          messaging: {
            ...state.messaging,
            messages: {
              ...state.messaging.messages,
              [data.conversation_id]: [
                ...(state.messaging.messages[data.conversation_id] || []),
                {
                  id: data.message_id,
                  content: data.ai_insights,
                  type: 'ai_insight',
                  timestamp: data.timestamp,
                },
              ],
            },
          },
        }));
      }
    },

    // Batch operations response
    "message.batch_operations": (set, get, data) => {
      if (data.error) {
        console.error('Batch operations error:', data.error);
        return;
      }

      // Update multiple states based on batch results
      if (data.results) {
        data.results.forEach(result => {
          if (result.type === 'message_update') {
            set((state) => ({
              messaging: {
                ...state.messaging,
                messages: {
                  ...state.messaging.messages,
                  [result.conversation_id]: result.messages,
                },
              },
            }));
          }
        });
      }
    },

    // Message search response
    "message.search.with_utils": (set, get, data) => {
      if (data.error) {
        console.error('Message search error:', data.error);
        return;
      }

      // Update search results with utilities processing
      set((state) => ({
        messaging: {
          ...state.messaging,
          searchResults: data.results || [],
          searchMetadata: data.metadata || {},
        },
      }));
    },

    // Content insights response
    "content.insights": (set, get, data) => {
      if (data.error) {
        console.error('Content insights error:', data.error);
        return;
      }

      // Store content insights
      set((state) => ({
        content: {
          ...state.content,
          insights: {
            ...state.content.insights,
            [data.content_id]: data.insights,
          },
        },
      }));
    },

    // Message post sync response
    "message.post.sync": (set, get, data) => {
      if (data.error) {
        console.error('Message post sync error:', data.error);
        return;
      }

      // Update sync status
      set((state) => ({
        messaging: {
          ...state.messaging,
          lastSync: data.timestamp,
          syncStatus: 'synced',
        },
        content: {
          ...state.content,
          lastSync: data.timestamp,
          syncStatus: 'synced',
        },
      }));
    },

    // Message-Post utilities initialization response
    "message.post.utils.init": (set, get, data) => {
      console.log('Message-Post utilities initialized:', data);
      // Configure message-post integration settings
      set((state) => ({
        messaging: {
          ...state.messaging,
          settings: { ...state.messaging.settings, ...data.messaging_settings },
        },
        content: {
          ...state.content,
          settings: { ...state.content.settings, ...data.content_settings },
        },
      }));
    },

    // Analytics initialization response
    "analytics.init": (set, get, data) => {
      console.log('Analytics initialized:', data);
      // Set up analytics configuration
      set((state) => ({
        performance: {
          ...state.performance,
          metrics: { ...state.performance.metrics, ...data.analytics_config },
        },
      }));
    },

    // Quercus integration initialization response
    "quercus.integration.init": (set, get, data) => {
      console.log('Quercus integration initialized:', data);
      // Configure Quercus AI integration settings
      set((state) => ({
        quercusAI: {
          ...state.quercusAI,
          messageIntegration: { ...state.quercusAI.messageIntegration, ...data.integration_settings },
        },
      }));
    },
      };

      const resp = responses[parsed.source];
      if (resp) {
        utils.log('parsed.source "' + parsed.source + '" not found');
        return resp(set, get, parsed.data);
      }
    };
    socket.onerror = (e) => {
      utils.log("socket.onerror", e.message);
    };
    socket.onclose = () => {
      utils.log("socket.onclose ");
    };
    set((state) => ({
      socket: socket,
    }));
    utils.log("TOKENS", tokens);
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
    }
    set((state) => ({
      socket: null,
    }));
  },

  //----------------------------------------
  //            Search
  //----------------------------------------

  searchlist: null,

  searchUsers: (query) => {
    if (query) {
      const socket = get().socket;
      socket.send(
        JSON.stringify({
          source: "search",
          query: query,
        })
      );
    } else {
      set((state) => ({
        searchlist: null,
      }));
    }
  },

  //---------------------------------------------------------------------------------
  //            Communication Feed
  //---------------------------------------------------------------------------------

  /////////////////////////////////////////// Bloger ///////////////////////////
  /////////////////////////////////////////// Bloger ///////////////////////////
  /////////////////////////////////////////// Bloger ///////////////////////////

  DailyBlogList: [],
  blogsNext: null,
  BlogsUsername: null,
  BlogList: (blogse, page = 0) => {
    if (page === 0) {
      set((state) => ({
        DailyBlogList: [],
        blogsNext: null,
        BlogsUsername: null,
      }));
    } else {
      set((state) => ({
        blogsNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "blog.list",
        // blogse: blogse,
        page: page,
      })
    );
  },

  blogSend: (details, file) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "blog.send",
        UserId: details.UserId,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
        tags: details.tags,
        directoryId: details.directoryId,
        description: details.description,
      })
    );
  },

  blogInteraction: (blogId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "blog.interactions",
        action: action,
        blogId: blogId,
        userId: userId,
      })
    );
  },

  blogShared: (blogId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "blog.shared",
        action: action,
        blogId: blogId,
        userId: userId,
      })
    );
  },

  /////////////////////////////////////////// Posts ///////////////////////////
  /////////////////////////////////////////// Post ///////////////////////////
  /////////////////////////////////////////// Posts ///////////////////////////

  PostList: [],
  PostsNext: null,
  postsList: (page = 0) => {
    if (page === 0) {
      set((state) => ({
        PostList: [],
        PostsNext: null,
      }));
    } else {
      set((state) => ({
        PostsNext: null,
      }));
    }

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "post.list",
        page: page,
      })
    );
  },

  postSend: (details, file) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "post.send",
        userId: details.userId,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
        description: details.description,
      })
    );
  },

  postLike: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "post.likes",
        action: action,
        postId: postId,
        userId: userId,
      })
    );
  },

  postInteraction: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "post.interactions",
        action: action,
        postId: postId,
        userId: userId,
      })
    );
  },

  commentInteraction: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "comment.interactions",
        action: action,
        postId: postId,
        userId: userId,
      })
    );
  },

  commentLike: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "comment.likes",
        action: action,
        postId: postId,
        userId: userId,
      })
    );
  },

  PostCommentsList: [],
  PostsCommentsNext: null,
  fetchPostComments: (postId, page = 1) => {
    if (page === 1) {
      set((state) => ({
        PostCommentsList: [],
        PostsCommentsNext: null,
      }));
    } else {
      set((state) => ({
        PostsCommentsNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "comment.list",
        postId: postId,
        page: page,
      })
    );
  },

  sendPostComment: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "comment.send",
        userId: details.userId,
        postId: details.postId,
        description: details.description,
      })
    );
  },

  /////////////////////////////////////////// Notfications ///////////////////////////
  /////////////////////////////////////////// Notfications ///////////////////////////
  /////////////////////////////////////////// Notfications ///////////////////////////

  loading: false,
  error: null,
  notifList: [],
  notifNext: null,
  notifUsername: null,
  // Poll-specific state
  pollList: [],
  pollNext: null,
  pollDetails: null,
  pollStatistics: {},
  pollVoteDistribution: [],
  pollWinners: [],
  notificationList: (notifId, userId, action, page = 0) => {
    if (page === 0) {
      set((state) => ({
        notifUsername: [],
        notifList: [],
        notifNext: null,
        loading: true,
        error: null,
      }));
    } else {
      set((state) => ({
        notifNext: null,
      }));
    }

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.list",
        page: page,
        notifId: notifId,
        userId: userId,
        action: action,
      })
    );
  },

  notifLike: (notifId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.likes",
        action: action,
        notifId: notifId,
        userId: userId,
      }) 
    );
  },      

  notifSend: (details, file) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.send",
        sender: details.sender,
        service: details.service,
        update_type: details.update_type,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
        description: details.description,
        extra_data: details.extra_data,
      })
    );
  }, 

  notifPostInteraction: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.interactions",
        action: action,
        notifId: postId,
        userId: userId,
      })
    );
  },

  notifCommentInteraction: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.comment.interactions",
        action: action,
        notifId: postId,
        userId: userId,
      })
    );
  },

  notifCommentLike: (postId, userId, action) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.comment.likes",
        action: action,
        notifId: postId,
        userId: userId,
      })
    );
  },

  notifPollVote: (notifId, pollOptionIndex) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.poll.vote",
        notifId: notifId,
        pollOptionIndices: Array.isArray(pollOptionIndex) ? pollOptionIndex : [pollOptionIndex],
      })
    );
  },

  notifPostCommentsList: [],
  notifPostsCommentsNext: null,
  fetchNotifPostComments: (postId, page = 1) => {
    if (page === 1) {
      set((state) => ({
        notifPostCommentsList: [],
        notifPostsCommentsNext: null,
      }));
    } else {
      set((state) => ({
        notifPostsCommentsNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.comment.list",
        notifId: postId,
        page: page,
      })
    );
  },

  sendNotifPostComment: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.comment.send",
        userId: details.userId,
        notifId: details.postId,
        description: details.description,
      })
    );
  },

  /////////////////////////////////////////// Poll Methods ///////////////////////////
  /////////////////////////////////////////// Poll Methods ///////////////////////////
  /////////////////////////////////////////// Poll Methods ///////////////////////////

  pollList: (page = 0, category = null, status = "active") => {
    if (page === 0) {
      set((state) => ({
        pollList: [],
        pollNext: null,
        loading: true,
        error: null,
      }));
    } else {
      set((state) => ({
        pollNext: null,
      }));
    }

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.poll.list",
        page: page,
        category: category,
        status: status,
      })
    );
  },

  pollDetails: (notifId) => {
    set((state) => ({
      pollDetails: null,
      loading: true,
      error: null,
    }));

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.poll.details",
        notifId: notifId,
      })
    );
  },

  pollStatistics: (notifId) => {
    set((state) => ({
      pollStatistics: {},
      pollVoteDistribution: [],
      pollWinners: [],
      loading: true,
      error: null,
    }));

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.poll.statistics",
        notifId: notifId,
      })
    );
  },

  pollVote: (notifId, pollOptionIndices) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "notif.poll.vote",
        notifId: notifId,
        pollOptionIndices: Array.isArray(pollOptionIndices) ? pollOptionIndices : [pollOptionIndices],
      })
    );
  },

  /////////////////////////////////////////// Connections ///////////////////////////
  /////////////////////////////////////////// Connections ///////////////////////////
  /////////////////////////////////////////// Connections ///////////////////////////

  //----------------------------------------
  //            Friends
  //----------------------------------------

  ConnectList: null,

  /////////////////////////////////////////// Messages ///////////////////////////
  /////////////////////////////////////////// Messages ///////////////////////////
  /////////////////////////////////////////// Messages ///////////////////////////

  //-----------------------------------------
  //            Messages
  //----------------------------------------

  messagesList: [],
  messagesNext: null,
  MessagesTyping: null,
  messagesUsername: null,

  messageList: (connectionId, page = 0) => {
    if (page === 0) {
      set((state) => ({
        messagesList: [],
        messagesNext: null,
        MessagesTyping: null,
        messagesUsername: null,
      }));
    } else {
      set((state) => ({
        messagesNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.list",
        connectionId: connectionId,
        page: page,
      })
    );
  },

  messageSend: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.send",
        connectionId: details.connectionId,
        message: details.message,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
      })
    );
  },

  messageType: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "message.type",
        username: username,
      })
    );
  },

  messageRed: (connectionId, action = "red") => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        connectionId: connectionId,
        action: action,
        source: "message.red",
      })
    );
  },

  /////////////////////////////////////////// GroupMessages ///////////////////////////
  /////////////////////////////////////////// GroupMessaages ///////////////////////////
  /////////////////////////////////////////// GroupMessages ///////////////////////////
  //-----------------------------------------
  //            Group Messages
  //----------------------------------------

  chatsList: [],
  ChatsMembers: [],
  // MessagesTyping: null,
  chatsUsername: null,
  GroupChatList: (grpConnId, page = 0) => {
    if (page === 0) {
      set((state) => ({
        chatsList: [],
        ChatsMembers: [],
        // MessagesTyping: null,
        // messagesUsername: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "groupmessages.list",
        grpConnId: grpConnId,
        page: page,
      })
    );
  },

  groupMessageSend: (grpConnId, grpmessage) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "groupmessages.send",
        grpConnId: grpConnId,
        grpmessage: grpmessage,
      })
    );
  },

  groupMessageType: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "groupmessages.type",
        username: username,
      })
    );
  },

  ////////////////////////////////////////// DiretoryList ///////////////////////////
  /////////////////////////////////////////// DirectoryList ///////////////////////////
  /////////////////////////////////////////// DirectoryList ///////////////////////////
  //----------------------------------------
  //            DirectoryList
  //----------------------------------------
  directoryList: [],
  User: null,
  CommunityDirectoryList: (directoryId, directory_status1) => {
    set((state) => ({
      directoryList: [],
    }));
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "directory.list",
        directoryId: directoryId,
        directory_status1: directory_status1,
      })
    );
  },

  CommunityDirectoryCreate: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "directory.create",
        userId: details.userId,
        username: details.username,
        code: details.code,
        email: details.email,
        bio: details.bio,
        directory_status1: details.directory_status1,
        directory_status2: details.directory_status2,
        directory_status3: details.directory_status3,
        followers: details.followers,
        agreement: true,
        profile_imageB64: details.profile_image
          ? details.profile_image.base64
          : null,
        profile_imageFileName: details.profile_image
          ? details.profile_image.fileName
          : null,

        cover_imageB64: details.cover_image ? details.cover_image.base64 : null,
        cover_imageFileName: details.cover_image
          ? details.cover_image.fileName
          : null,
      })
    );
  },

  /////////////////////////////////////////// Requests ///////////////////////////
  /////////////////////////////////////////// Requests ///////////////////////////
  /////////////////////////////////////////// Requests ///////////////////////////

  //----------------------------------------
  //            Requests
  //----------------------------------------

  requestsList: null,

  requestAccept: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.accept",
        username: username,
      })
    );
  },

  requestDelete: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.delete",
        username: username,
      })
    );
  },

  requestConnect: (username) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "request.connect",
        username: username,
      })
    );
  },

  ///////////////////////////////////////////  Uploading User Information ///////////////////////////
  ///////////////////////////////////////////  Uploading User Information ///////////////////////////
  ///////////////////////////////////////////  Uploading User Information ///////////////////////////

  //----------------------------------------
  //            Uploading User Information
  //----------------------------------------
  //--------------------
  //  Upload Image
  //--------------------
  uploadImage: (file) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "image.upload",
        base64: file.base64,
        filename: file.fileName,
      })
    );
  },

  ///////////////////////////////////////////  App Notifications ///////////////////////////
  ///////////////////////////////////////////  App Notifications //// ///////////////////////////
  ///////////////////////////////////////////  App Notifications //// ///////////////////////////

  //----------------------------------------
  //            app notif list
  //----------------------------------------
  appNotifList: [],
  appNotifNext: null,
  appNotif: (page = 0) => {
    if (page === 0) {
      set((state) => ({
        appNotifList: [],
        appNotifNext: null,
      }));
    } else {
      set((state) => ({
        appNotifList: [],
        appNotifNext: null,
      }));
    }
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "app.notif.list",
        page: page,
      })
    );
  },

  //----------------------------------------
  //           app notif interact
  //----------------------------------------
  appNotifInteract: (userId, appNotifId) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "app.notif.interactions",
        appNotifId: appNotifId,
        action: "interaction",
        userId: userId,
      })
    );
  },

  //----------------------------------------
  //           app report Send
  //----------------------------------------
  appReport: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "app.report.send",
        userId: details.userId,
        subject: details.subject,
        description: details.description,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
      })
    );
  },

  //----------------------------------------
  //           app feedback send
  //----------------------------------------
  appFeedback: (details) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "app.feedback.send",
        userId: details.userId,
        description: details.description,
        imageBase64: details.image ? details.image.base64 : null,
        imageFilename: details.image ? details.image.fileName : null,
      })
    );
  },

  //--------------------
  //  App Search
  //--------------------
  appSearchUserList: null,
  appSearchBlogList: null,
  appSearchPostList: null,
  appSearchNotif: null,
  appTrendingData: null,
  // isLoading: false,
  appSearchAll: (val) => {
    if (val) {
      set((state) => ({
        // isLoading: true,
        appSearchList: [],
        appSearchUserList: [],
        appSearchBlogList: [],
        appSearchPostList: [],
        appSearchNotif: [],
      }));
    } else {
      set((state) => ({
        // isLoading: false,
        // appSearchList: null,
        appSearchUserList: null,
        appSearchBlogList: null,
        appSearchPostList: null,
        appSearchNotif: null,
        appTrendingData: null,
      }));
    }

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "app.search",
        query: val,
      })
    );
  },

  appGetTrending: () => {
    const socket = get().socket;
    if (socket) {
      socket.send(
        JSON.stringify({
          source: "app.trending",
        })
      );
    } 
  },

  //----------------------------------------
  // Monetization actions
  //----------------------------------------
  monetizationFetchAccommodations: async (params) => await MonetizationStore.fetchAccommodations(set, get, params),
  monetizationFetchTXAgent: async (params) => await MonetizationStore.fetchTxAgents(set, get, params),
//  monetizationCreateAccommodation: async (payload) => await MonetizationStore.createAccommodation(set, get, payload),
  monetizationSubscribeDataSaver: async (method) => await MonetizationStore.subscribeDataSaver(set, get, method),

  // Lost and Found actions
  lostFoundFetchLostItems: async (params) => await MonetizationStore.fetchLostItems(set, get, params),
  lostFoundFetchFoundItems: async (params) => await MonetizationStore.fetchFoundItems(set, get, params),
  lostFoundCreateLostItem: async (payload) => await MonetizationStore.createLostItem(set, get, payload),
  lostFoundCreateFoundItem: async (payload) => await MonetizationStore.createFoundItem(set, get, payload),
  lostFoundSearch: async (params) => await MonetizationStore.searchLostFound(set, get, params),

  // Analytics actions
  fetchAnalyticsDashboard: async () => await MonetizationStore.fetchAnalyticsDashboard(set, get),
  fetchAnalyticsSummary: async () => await MonetizationStore.fetchAnalyticsSummary(set, get),
  trackPageVisit: async (pageName, sessionId, userAgent) => await MonetizationStore.trackPageVisit(set, get, pageName, sessionId, userAgent),
  clearAnalyticsError: () => MonetizationStore.clearAnalyticsError(set, get),

  // Socket-based monetization helpers (mirror post.list / post.send)

  monetizationSocketFetchAccommodations: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.accommodations", page }));
  },

  monetizationSocketFetchTxAgents: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.tx", page }));
  },

  monetizationSocketFetchMarketing: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.marketing", page }));
  },

  monetizationSocketFetchLibrary: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.library", page }));
  },

  monetizationSocketFetchCampusMap: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.campusmap", page }));
  },

  monetizationSocketCreateAccommodation: (details = {}) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "monetization.create_accommodation",
        userId: details.userId,
        title: details.title,
        description: details.description,
        price: details.price,
        currency: details.currency,
        phone: details.phone,
        geo_lat: details.geo_lat,
        geo_lng: details.geo_lng,
        imageBase64: details.images && details.images[0] ? details.images[0].base64 : null,
        imageFilename: details.images && details.images[0] ? details.images[0].fileName : null,
      })
    );
  },

  CreateMonetizationAgentTx: (payload = {}) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        userId: payload.userId,
        source: "monetization.create_tx_agent",
        title: payload.title,
        description: payload.description,
        method: payload.method,
        type: payload.type,
        provider_name: payload.provider_name,
        provider_location: payload.provider_location,
        // imageBase64: details.images && details.images[0] ? details.images[0].base64 : null,
        // imageFilename: details.images && details.images[0] ? details.images[0].fileName : null,
      })
    );
  },

  // Lost and Found socket helpers
  lostFoundSocketFetchLostItems: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.lost_items", page }));
  },

  lostFoundSocketFetchFoundItems: (page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(JSON.stringify({ source: "monetization.found_items", page }));
  },

  lostFoundSocketCreateLostItem: (details = {}) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "monetization.create_lost_item",
        title: details.title,
        description: details.description,
        category: details.category,
        location: details.location,
        date_lost: details.date_lost,
        images: details.images || [],
        reward_offered: details.reward_offered,
        currency: details.currency || "USD",
        contact_info: details.contact_info || {},
        is_premium: details.is_premium || false,
      })
    );
  },

  lostFoundSocketCreateFoundItem: (details = {}) => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "monetization.create_found_item",
        title: details.title,
        description: details.description,
        category: details.category,
        location: details.location,
        date_found: details.date_found,
        images: details.images || [],
        contact_info: details.contact_info || {},
        is_premium: details.is_premium || false,
      })
    );
  },

  lostFoundSocketSearch: (query = "", category = "") => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "monetization.lost_found_search",
        query: query,
        category: category,
      })
    );
  },

  // Analytics websocket methods
  analyticsSocketFetchDashboard: () => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "analytics.dashboard",
      })
    );
  },

  analyticsSocketFetchSummary: () => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "analytics.summary",
      })
    );
  },

  analyticsSocketTrackVisit: (pageName, sessionId = "", userAgent = "") => {
    const socket = get().socket;
    if (!socket) return;
    socket.send(
      JSON.stringify({
        source: "analytics.track_visit",
        page_name: pageName,
        session_id: sessionId,
        user_agent: userAgent,
      })
    );
  },

  // Enhanced message sending with utilities integration
  sendMessageWithUtils: (messageData) => {
    const socket = get().socket;
    if (!socket) return;

    const { conversationId, message, metadata = {} } = messageData;

    socket.send(
      JSON.stringify({
        source: "message.send.with_utils",
        conversationId,
        message,
        metadata,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Enhanced post creation with utilities integration
  createPostWithUtils: (postData) => {
    const socket = get().socket;
    if (!socket) return;

    const { description, image, userId, utils = {} } = postData;

    socket.send(
      JSON.stringify({
        source: "post.create.with_utils",
        userId,
        description,
        image,
        utils,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Quercus AI enhanced message processing
  processMessageWithQuercus: (messageData) => {
    const socket = get().socket;
    if (!socket) return;

    const { message, conversationId, context = 'general' } = messageData;

    socket.send(
      JSON.stringify({
        source: "quercus.process_message",
        message,
        conversationId,
        context,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Batch message operations
  batchMessageOperations: (operations) => {
    const socket = get().socket;
    if (!socket) return;

    socket.send(
      JSON.stringify({
        source: "message.batch_operations",
        operations,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Message search with utilities
  searchMessagesWithUtils: (query, filters = {}) => {
    const socket = get().socket;
    if (!socket) return;

    socket.send(
      JSON.stringify({
        source: "message.search.with_utils",
        query,
        filters,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Content analytics and insights
  getContentInsights: (contentType, contentId) => {
    const socket = get().socket;
    if (!socket) return;

    socket.send(
      JSON.stringify({
        source: "content.insights",
        contentType,
        contentId,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Message post synchronization
  syncMessagePost: (syncData) => {
    const socket = get().socket;
    if (!socket) return;

    socket.send(
      JSON.stringify({
        source: "message.post.sync",
        ...syncData,
        timestamp: new Date().toISOString(),
      })
    );
  },

  // Service Guide WebSocket methods
  serviceGuideSocketAISearch: (query) => {
    const socket = get().socket;
    if (!socket) return;
    set((state) => ({
      serviceGuide: {
        ...state.serviceGuide,
        isLoading: true,
        error: null
      }
    }));
    socket.send(
      JSON.stringify({
        source: "service_guide.ai_search",
        query: query,
      })
    );
  },

  serviceGuideSocketList: (page = 0, serviceType = "all") => {
    const socket = get().socket;
    if (!socket) return;
    set((state) => ({
      serviceGuide: {
        ...state.serviceGuide,
        isLoading: true,
        error: null
      }
    }));
    socket.send(
      JSON.stringify({
        source: "service_guide.list",
        page: page,
        service_type: serviceType,
      })
    );
  },

  serviceGuideSocketDocuments: (serviceGuideId, page = 0) => {
    const socket = get().socket;
    if (!socket) return;
    set((state) => ({
      serviceGuide: {
        ...state.serviceGuide,
        isLoading: true,
        error: null
      }
    }));
    socket.send(
      JSON.stringify({
        source: "service_guide.documents",
        service_guide_id: serviceGuideId,
        page: page,
      })
    );
  },

  clearServiceGuideError: () => {
    set((state) => ({
      serviceGuide: {
        ...state.serviceGuide,
        error: null
      }
    }));
  },

 

  //----------------------------------------
  //            Uploading User Information
  //----------------------------------------
  //--------------------
  //  UserInformation
  //--------------------
  modifyProfile: (profile) => {
    const socket = get().socket;

    socket.send(
      JSON.stringify({
        source: "user.profile",
        action: profile.action,
        profile_value: "huigfdr",
        // profile_value: profile.value,
        profile_value2: profile.value2,

        profile_image_filename: profile.profile_image
          ? profile.profile_image.fileName
          : null,
        profile_image_base64: profile.profile_image
          ? profile.profile_image.base64
          : null,

        cover_image_filename: profile.cover_image
          ? profile.cover_image.fileName
          : null,
        cover_image_base64: profile.cover_image
          ? profile.cover_image.base64
          : null,
      })
    );

    // socket.send(
    //   JSON.stringify({
    //     source: "user.profile",
    //     base64: file.base64,
    //     filename: file.fileName,

    //   })
    // );
  },

  /////////////////////////////////////////// User Notifications ///////////////////////////
  //----------------------------------------
  //            User Notifications
  //----------------------------------------
  usernotifListUnread: [],
  fetchUserUnreadNotifs: () => {
    set((state) => ({
      usernotifListUnread: [],
    }));

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "user.notif.unread_notifs",
      })
    );
  },

  usernotifList: [],
  fetchUserNotifs: () => {
    set((state) => ({
      usernotifList: [],
    }));

    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "user.notif.all_notifs",
        action: "get_notif",
      })
    );
  },

  markUserNotifRead: (notifId, notif_type) => {
    const socket = get().socket;
    socket.send(
      JSON.stringify({
        source: "user.notif.red",
        notif_user_id: notifId,
        action: "mark_as_read",
      })
    );
  },
})),

       
      {
        name: 'community-app-storage',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
          language: state.language,
          userProfile: state.userProfile,
          search: {
            searchHistory: state.search.searchHistory,
            recentSearches: state.search.recentSearches,
          },
        }),
        storage: {
          getItem: async (name) => {
            try {
              const value = await secure.get(name);
              return value ? JSON.parse(value) : null;
            } catch (error) {
              console.error('Storage getItem error:', error);
              return null;
            }
          },
          setItem: async (name, value) => {
            try {
              await secure.set(name, JSON.stringify(value));
            } catch (error) {
              console.error('Storage setItem error:', error);
            }
          },
          removeItem: async (name) => {
            try {
              await secure.remove(name);
            } catch (error) {
              console.error('Storage removeItem error:', error);
            }
          },
        },
      }
    ),
    {
      name: 'community-app-store',
    }
  )
);

export default useGlobal;
