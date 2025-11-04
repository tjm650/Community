import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";
import { trackPageVisit } from "@/assets/core/storeContext/amonetization/analytics";

const LostFound = () => {
  const navigation = useNavigation();
  const { theme, user, monetization } = useGlobal();
  let isLight = theme === "light";

  const navigationAny = navigation;

  // Check if user has premium subscription
  const isPremiumUser = user?.verified === false 
  
  //||
    //                   monetization?.subscriptions?.some(sub => sub.status === 'active');

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Track page visit when component mounts
  useEffect(() => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const userAgent = 'React Native App'; // You can get actual user agent if needed

    trackPageVisit('LostFound', sessionId, userAgent);
  }, []);

  const FeatureButton = ({ title, icon, onPress, description, badge }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: isLight
          ? LGlobals.BottomTab.active
          : DGlobals.BottomTab.active,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
        minWidth: "48%",
        maxWidth: "48%",
        alignItems: "center",
        position: "relative",
      }}
    >
      {badge && (
        <View
          style={{
            position: "absolute",
            top: -5,
            right: -5,
            backgroundColor: "#FF6B6B",
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {badge}
          </Text>
        </View>
      )}
      <FontAwesomeIcon
        icon={icon}
        size={24}
        color={isLight ? LGlobals.text : DGlobals.text}
        style={{ marginBottom: 8 }}
      />
      <Text
        numberOfLines={2}
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {description && (
        <Text
          numberOfLines={2}
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 10,
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );

  const SubscriptionCard = () => (
    <TouchableOpacity
      onPress={() => navigationAny.navigate("SubscriptionPlans")}
      activeOpacity={0.8}
      style={{
        backgroundColor: isLight ? "#E8F4FD" : "#1E3A5F",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <MaterialIcons
          name="star"
          size={20}
          color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
        />
        <Text
          style={{
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            fontWeight: "700",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Premium Access Required
        </Text>
      </View>
      <Text
        style={{
          color: isLight ? LGlobals.greyText : DGlobals.greyText,
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        Get unlimited access to report and search lost & found items
      </Text>
      <TouchableOpacity
        onPress={() => navigationAny.navigate("SubscriptionPlans")}
        style={{
          backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: 12,
          }}
        >
          View Plans
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    if (!isPremiumUser) {
      Alert.alert(
        "Get Verified for this feature",
        "Search functionality can be used by verified users only.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Upgrade", onPress: () => navigationAny.navigate("SubscriptionPlans") }
        ]
      );
      return;
    }

    // if (!searchQuery.trim()) {
    //   Alert.alert("Search Required", "Please enter a search term");
    //   return;
    // }

    setIsSearching(true);
    // Navigate to search screen with query
    navigationAny.navigate("SearchLostFound", { initialQuery: searchQuery });
    setIsSearching(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {/* Header */}

      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 24,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Lost & Found
        </Text>

  
        <TouchableOpacity
          onPress={() => navigationAny.navigate("ReportFoundItem")}
          style={{
            borderRadius: 16,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal:"2%",
            paddingVertical:"2%"
          }}
        >
          <MaterialIcons name="add-circle" size={20} color="#fff" />
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Found
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>

        {/* Search Bar - Premium Only */}
        <View
          style={{
            borderRadius: 16,
            padding: 20,
            marginBottom: 150,
            justifyContent:"center",
            alignItems: "center",
          }}
        >



          <TouchableOpacity
            onPress={handleSearch}
            // disabled={!isPremiumUser || isSearching}
            style={{
              // borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,

              borderColor: isLight ? "#ddd" : "#555",
              paddingVertical: 7,
              borderRadius: 25,
              borderWidth:1,
              alignItems: "center",
              justifyContent: "center",
              width:"50%"
            }}
          >
            {isSearching ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 16,
                    marginRight: 8,
                  }}
                >
                 Search
                </Text>
               
              </>
            )}
          </TouchableOpacity>

          
        </View>

 

        {/* Subscription Card */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LostFound;

const styles = StyleSheet.create({});