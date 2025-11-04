import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faShare,
  faSparkles,
  faSearch,
  faTimes,
  faRobot,
  faUser,
  faMapMarkerAlt,
  faPhone,
  faFileAlt,
  faStar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

// Colors
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";

// AI Components
import AISearchInterface from "./AISearchInterface";
import AISearchResults from "./AISearchResults";
import { Ionicons } from "@expo/vector-icons";

const ServiceGuide = () => {
  const navigation = useNavigation();
  const {
    theme,
    serviceGuide,
    serviceGuideSocketAISearch,
    serviceGuideSocketList,
  } = useGlobal();
  const isLight = theme === "light" || false; // Default to false if theme is undefined

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // AI Search states
  const [showAISearch, setShowAISearch] = useState(false);

  const serviceTypes = [
    { key: "all", label: "All Services" },
    { key: "Academic", label: "Academic Services" },
    { key: "Administrative", label: "Administrative" },
    { key: "Student Services", label: "Student Services" },
    { key: "Health", label: "Health Services" },
    { key: "Financial", label: "Financial Services" },
  ];

  useEffect(() => {
    // Load service guides from backend
    if (
      serviceGuide &&
      serviceGuide.serviceGuides &&
      serviceGuide.serviceGuides.length === 0
    ) {
      try {
        if (typeof serviceGuideSocketList === "function") {
          serviceGuideSocketList(0, selectedServiceType);
        }
      } catch (error) {
        console.error("Error loading service guides:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Filter guides based on search query and service type
    let filtered = serviceGuide.serviceGuides;

    if (selectedServiceType !== "all") {
      filtered = filtered.filter(
        (guide) => guide.service_type === selectedServiceType
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (guide) =>
          guide.service_name.toLowerCase().includes(query) ||
          guide.description.toLowerCase().includes(query) ||
          guide.department.toLowerCase().includes(query) ||
          guide.contact_person.toLowerCase().includes(query)
      );
    }

    setFilteredGuides(filtered);
  }, [searchQuery, selectedServiceType, serviceGuide.serviceGuides]);

  const handleContactEmail = (email) => {
    const url = `mailto:${email}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open email app");
      }
    });
  };

  const handleCall = (phone) => {
    const url = `tel:${phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to make phone call");
      }
    });
  };

  const handleWebsite = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open website");
      }
    });
  };

  const handleShare = async (guide) => {
    try {
      const result = await Share.share({
        message: `Check out ${guide.service_name}: ${guide.description}`,
        url: guide.website_url,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share");
    }
  };

  // AI Search handlers
  const handleAISearch = () => {
    setShowAISearch(true);
  };

  const handleAISearchResults = (results) => {
    // Call backend AI search service
    if (results.query && typeof serviceGuideSocketAISearch === "function") {
      try {
        serviceGuideSocketAISearch(results.query);
      } catch (error) {
        console.error("Error performing AI search:", error);
      }
    }
    setShowAISearch(false);
  };

  const handleAISearchClose = () => {
    setShowAISearch(false);
  };

  const handleNewAISearch = () => {
    // Clear previous results and show search interface
    setShowAISearch(true);
  };

  const handleAISearchResultsClose = () => {
    // Clear AI search results from global state
  };

  const renderServiceGuide = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.guideCard,
        {
          backgroundColor: isLight ? "#2A2A2A" : "#1A1A1A",
          borderColor: isLight ? "#404040" : "#333333",
          shadowColor: isLight ? "#000" : "#FFF",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isLight ? 0.1 : 0.3,
          shadowRadius: 4,
          elevation: 3,
          marginBottom: 5,
        },
      ]}
      activeOpacity={0.8}
    >
      {/* Header Section */}
      <View style={styles.guideHeader}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.guideName,
                {
                  color: isLight ? "#FFFFFF" : "#E0E0E0",
                },
              ]}
              numberOfLines={2}
            >
              {item.service_name}
            </Text>
            {item.is_verified && (
              <View
                style={[
                  styles.verifiedBadge,
                  {
                    backgroundColor: isLight
                      ? LGlobals.bluetext
                      : DGlobals.bluetext,
                  },
                ]}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  size={14}
                  color="#FFFFFF"
                  style={styles.verifiedIcon}
                />
              </View>
            )}
          </View>
          <View style={styles.serviceTypeContainer}>
            <Text
              style={[
                styles.serviceType,
                {
                  color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                  backgroundColor: isLight
                    ? `${LGlobals.bluetext}25`
                    : `${DGlobals.bluetext}25`,
                },
              ]}
            >
              {item.service_type}
            </Text>
          </View>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.descriptionSection}>
        <Text
          style={[
            styles.guideDescription,
            {
                  color: isLight ? LGlobals.text : DGlobals.text,
            },
          ]}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </View>

      {/* Quick Info Section */}
      <View
        style={[
          styles.quickInfoSection,
         
        ]}
      >
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size={16}
              color={isLight ? LGlobals.icon : DGlobals.icon}
              style={styles.infoIcon}
            />
            <Text
              style={[
                styles.infoText,
                { color: isLight ? "#E0E0E0" : "#CCCCCC" },
              ]}
              numberOfLines={1}
            >
              {item.location}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <FontAwesomeIcon
              icon={faFileAlt}
              size={16}
              color={isLight ? LGlobals.icon : DGlobals.icon}
              style={styles.infoIcon}
            />
            <Text
              style={[
                styles.infoText,
                { color: isLight ? LGlobals.text : DGlobals.text },
              ]}
            >
              Document Version {item.version}
            </Text>
          </View>
        </View>

        <View style={[styles.infoRow, { marginTop: "3%" }]}>
          <TouchableOpacity
            onPress={() => handleWebsite(item.website_url)}
            style={styles.infoItem}
          >
            <View style={[styles.infoIcon, { paddingLeft: -5 }]}>
              <FontAwesomeIcon
                icon={faGlobe}
                size={16}
                color={isLight ? LGlobals.icon : DGlobals.icon}
                style={styles.infoIcon}
              />
            </View>
            <Text
              style={[
                styles.tertiaryButtonText,
                {
                  color: isLight ? LGlobals.text : DGlobals.text,
                },
              ]}
            >
              Website
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleShare(item)}
            style={styles.infoItem}
          >
            <View style={[styles.infoIcon, { paddingLeft: -5 }]}>
              <Ionicons
                name="share-social"
                size={14}
                color={isLight ? LGlobals.icon : DGlobals.icon}
                style={styles.infoIcon}
              />
            </View>
            <Text
              style={[
                styles.tertiaryButtonText,
                {
                  color: isLight ? LGlobals.text : DGlobals.text,
                },
              ]}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceTypeFilter = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.filterContainer}
    >
      {serviceTypes.map((type) => (
        <TouchableOpacity
          key={type.key}
          style={[
            styles.filterButton,
            {
              backgroundColor: selectedServiceType === type.key ? "transparent" : "transparent",
              borderColor:
                selectedServiceType === type.key
                  ? isLight
                    ? LGlobals.bluetext
                    : DGlobals.bluetext
                  : "transparent",
              borderWidth: selectedServiceType === type.key ? 1 : 0,
            },
          ]}
          onPress={() => setSelectedServiceType(type.key)}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                                   isLight ? LGlobals.text : DGlobals.text,

              },
            ]}
          >
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Show AI Search Results if available
  if (serviceGuide.aiSearchResults) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: isLight
              ? LGlobals.background
              : DGlobals.background,
          },
        ]}
      >
        <AISearchResults
          searchResults={serviceGuide.aiSearchResults}
          onClose={handleAISearchResultsClose}
          onNewSearch={handleNewAISearch}
        />
      </SafeAreaView>
    );
  }

  // Show AI Search Interface if active
  if (showAISearch) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: isLight
              ? LGlobals.background
              : DGlobals.background,
          },
        ]}
      >
        <AISearchInterface
          onSearchResults={handleAISearchResults}
          onClose={handleAISearchClose}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: isLight ? LGlobals.text : DGlobals.text,
                },
              ]}
            >
              Service Guide
            </Text>
          </View>
          <Text
            style={[
              styles.subtitle,
              {
                color: isLight ? "#B0B0B0" : "#888888",
              },
            ]}
          >
            Find campus service guide
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: isLight ? "#404040" : "#2A2A2A",
              borderColor: isLight ? "#666666" : "#444444",
            },
          ]}
        >
          <FontAwesomeIcon
            icon="magnifying-glass"
            size={20}
            color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            style={{ marginRight: 15 }}
          />
          <TextInput
            style={[
              styles.searchInput,
              { color: isLight ? "#FFFFFF" : "#E0E0E0" },
            ]}
            placeholder="Search services..."
            placeholderTextColor={isLight ? "#888888" : "#666666"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <FontAwesomeIcon
                icon={faTimes}
                size={16}
                color={isLight ? "#B0B0B0" : "#888888"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* {renderServiceTypeFilter()} */}

      <FlatList
        data={filteredGuides}
        renderItem={renderServiceGuide}
        ListHeaderComponent={renderServiceTypeFilter()}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                { color: isLight ? LGlobals.fadetext : DGlobals.fadetext },
              ]}
            >
              No services found matching your criteria.
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTop: {
    marginBottom: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    flex: 1,
  },
  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 12,
  },
  aiButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  aiButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 16,
    marginLeft: 10,
  },
  filterContainer: {
    paddingHorizontal: "1%",
    marginBottom: "5%",
    paddingRight: "55%",
    // marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    height: 35,
    // marginRight: 10,
    borderWidth: 1,
    // marginBottom:10
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    height: 35,
  },
  list: {
    // flex: 1,
    paddingHorizontal: "2%",
  },
  guideCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    marginHorizontal: 2,
  },
  guideHeader: {
    marginBottom: 16,
  },
  headerContent: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  guideName: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  verifiedBadge: {
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  verifiedText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  serviceTypeContainer: {
    alignSelf: "flex-start",
  },
  serviceType: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: "hidden",
  },
  descriptionSection: {
    marginBottom: 16,
  },
  guideDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  quickInfoSection: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    gap: 5,
  },
  infoRow: {
    // flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoIcon: {
    fontSize: 16,
    width: 24,
    textAlign: "center",
    marginRight: 8,
  },
  infoText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  linkText: {
    textDecorationLine: "underline",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 24,
  },
  actionSection: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
  },
  primaryButton: {
    marginRight: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  secondaryButton: {
    marginHorizontal: 2,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  tertiaryButton: {
    marginLeft: 4,
  },
  tertiaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 80,
    right: 10,
    // width: 60,
    paddingHorizontal: "3%",
    height: 40,
    // borderRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonIcon: {
    // color: '#FFFFFF',
  },
});

export default ServiceGuide;
