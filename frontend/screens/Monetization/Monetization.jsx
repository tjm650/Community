import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/core/useGlobal";
import { formatNumber } from "@/assets/core/utils/numberFormat";

const Monetization = () => {
  const navigation = useNavigation();
  const { theme, monetization } = useGlobal();
  let isLight = theme === "light";

  // Get analytics data from store
  const analyticsData = monetization.analytics.dashboard;

  // Track page visit when component mounts
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Only track if the function exists and we have a valid connection
        if (
          monetization &&
          typeof monetization.trackPageVisit === "function" &&
          monetization.getState &&
          monetization.getState()
        ) {
          await monetization.trackPageVisit("monetization_dashboard");
        }
      } catch (error) {
        console.error("Error tracking monetization dashboard visit:", error);
      }
    };
    trackVisit();
  }, []);

  // Fetch daily analytics data when component mounts
  useEffect(() => {
    const fetchDailyAnalytics = async () => {
      try {
        // Only fetch if the function exists and we have a valid connection
        if (
          monetization &&
          typeof monetization.fetchAnalyticsDashboard === "function" &&
          monetization.getState &&
          monetization.getState()
        ) {
          await monetization.fetchAnalyticsDashboard();
        }
      } catch (error) {
        console.error("Error fetching daily analytics:", error);
      }
    };
    fetchDailyAnalytics();
  }, []);

  const navigationAny = navigation;

  // Analytics metrics mapping
  const getMetricLabel = (pageName) => {
    const labels = {
      accommodations: "Accommodations",
      // marketing: "Marketing",
      library: "Library",
      campusmap: "Campus Map",
      lost_items: "Lost Items",
      found_items: "Found Items",
      // online_transactions: "Online Transactions",
    };
    return labels[pageName] || pageName;
  };

  const AnalyticsCard = ({ item, onPress }) => {
    // Define realistic metrics for a small campus app (under 100 visits/day)
    const getMetricsForPage = (pageName) => {
      const metrics = {
        OnlineTransactions: {
          label: getMetricLabel("online_transactions"),
          value: "1247",
          change: 15,
          subtitle: "Active listings",
        },
        AccommodationAgents: {
          label: getMetricLabel("accommodations"),
          value: "89",
          change: 8,
          subtitle: "Available rooms",
        },
        Marketing: {
          label: getMetricLabel("marketing"),
          value: "156",
          change: 22,
          subtitle: "Active campaigns",
        },
        Library: {
          label: getMetricLabel("library"),
          value: "234",
          change: 5,
          subtitle: "Resources shared",
        },
        CampusMap: {
          label: getMetricLabel("campusmap"),
          value: "1892",
          change: 12,
          subtitle: "Locations viewed",
        },
        ServiceGuide: {
          label: "Service Guide",
          value: "567",
          change: 18,
          subtitle: "Services accessed",
        },
        CommunityAds: {
          label: "Community Ads",
          value: "89",
          change: 25,
          subtitle: "Ads displayed",
        },
        Blogs: {
          label: getMetricLabel("Blogs"),
          // label: "Blogs",
          value: "1456",
          change: 31,
          subtitle: "Posts read",
        },
        LostFound: {
          label: getMetricLabel("lost_items"),
          value: "67",
          change: 7,
          subtitle: "Items reported",
        },
      };

      return (
        metrics[pageName] || {
          label: getMetricLabel(pageName.toLowerCase()) || "Activity",
          value: "12",
          change: 0,
          subtitle: "Daily average",
        }
      );
    };

    // Check if we have real analytics data from the backend
    const hasRealAnalyticsData = item && item.visits_count !== undefined;

    // Show analytics card when data is available
    const metrics = getMetricsForPage(item.page_name);

    return (
      <TouchableOpacity
        onPress={() => onPress && onPress(item)}
        activeOpacity={0.7}
        style={{
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          marginHorizontal: 2,
          minWidth: "48%",
          borderWidth: isLight ? 0.3 : 1,
          borderColor: isLight ? LGlobals.borderColor : "#333333",
        }}
      >
        <View style={{ marginBottom: 8 }}>
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            {metrics.label}
          </Text>
        </View>

        {/* Show real analytics data if available, otherwise show static metrics */}
        {hasRealAnalyticsData ? (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,

                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                {formatNumber(item.visits_count)}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={item.trend_percentage >= 0 ? faArrowUp : faArrowDown}
                    size={10}
                    color={
                      item.trend_percentage >= 0
                        ? isLight
                          ? "#4CAF50"
                          : "#66BB6A"
                        : "#FF5722"
                    }
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      color:
                        item.trend_percentage >= 0
                          ? isLight
                            ? "#4CAF50"
                            : "#66BB6A"
                          : "#FF5722",
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    {Math.abs(item.trend_percentage)}%
                  </Text>
                </View>
                <Text
                  style={{
                    color: isLight ? LGlobals.greyText : DGlobals.greyText,

                    fontSize: 9,
                  }}
                >
                  vs last week
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              {metrics.subtitle || "Daily visits"}
            </Text>
          </>
        ) : (
          <>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,

                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                {formatNumber(metrics.value)}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    icon={metrics.change >= 0 ? faArrowUp : faArrowDown}
                    size={10}
                    color={
                      metrics.change >= 0
                        ? isLight
                          ? "#4CAF50"
                          : "#66BB6A"
                        : "#FF5722"
                    }
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      color:
                        metrics.change >= 0
                          ? isLight
                            ? "#4CAF50"
                            : "#66BB6A"
                          : "#FF5722",
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    {Math.abs(metrics.change)}%
                  </Text>
                </View>
                <Text
                  style={{
                    color: isLight ? LGlobals.greyText : DGlobals.greyText,

                    fontSize: 9,
                  }}
                >
                  growth rate
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                fontSize: 11,
                marginBottom: 4,
              }}
            >
              {metrics.subtitle || "Daily average"}
            </Text> */}
          </>
        )}
      </TouchableOpacity>
    );
  };

  const navigateToPage = (item) => {
    const pageMapping = {
      // Analytics data mapping
      // OnlineTransactions: "OnlineTransactions",
      // AccommodationAgents: "LandlordLodge",
      // Marketing: "GeneralMarketing",
      Library: "LibraryMarketing",
      CampusMap: "DataSaverHub",
      ServiceGuide: "ServiceGuide",
      // CommunityAds: "CommunityAds",
      // Blogs: "DailyBlog",
      LostFound: "LostFound",
      // Fallback button mapping
      // "Online Transactions": "OnlineTransactions",
      // "Accommodation Agents": "LandlordLodge",
      // "Campus Map": "DataSaverHub",
      "Service Guide": "ServiceGuide",
      // "Community Ads": "CommunityAds",
      "Lost & Found": "LostFound",
    }; 

    const routeName = pageMapping[item.page_name];
    if (routeName) {
      navigationAny.navigate(routeName);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {analyticsData && analyticsData.length > 0
          ? // Show real analytics data when available
            analyticsData.map((item, index) => (
              <AnalyticsCard key={index} item={item} onPress={navigateToPage} />
            ))
          : // Show static analytics cards when no real data is available
            [
              // { page_name: "OnlineTransactions" },
              // { page_name: "AccommodationAgents" },
              // { page_name: "Marketing" },
              { page_name: "Library" },
              { page_name: "CampusMap" },
              { page_name: "ServiceGuide" },
              // { page_name: "CommunityAds" },
              // { page_name: "Blogs" },
              { page_name: "LostFound" },
            ].map((item, index) => (
              <AnalyticsCard key={index} item={item} onPress={navigateToPage} />
            ))}
      </View>
    </SafeAreaView>
  );
};

export default Monetization;

const styles = StyleSheet.create({});
