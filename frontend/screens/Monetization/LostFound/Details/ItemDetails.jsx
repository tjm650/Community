import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";
import RewardSystem from "@/components/RewardSystem/RewardSystem";

const ItemDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useGlobal();
  let isLight = theme === "light";

    const user = useGlobal((state) => state.user);


  const { itemId, type, itemData } = route.params || {};
  const [loading, setLoading] = useState(false);

  // Sample item data - in real app, this would come from API
  const [item] = useState(itemData || {
    id: itemId || "1",
    title: type === "lost" ? "iPhone 12 Pro" : "Student ID Card",
    description: type === "lost"
      ? "Black iPhone 12 Pro with cracked screen, last seen in Library"
      : "University student ID card found in the cafeteria area",
    location: type === "lost" ? "Library - Study Area B" : "Main Campus - Cafeteria",
    date: type === "lost" ? "2024-01-15" : "2024-01-15",
    time: type === "lost" ? "14:30" : "13:20",
    category: type === "lost" ? "Electronics" : "Keys & Cards",
    urgency: type === "lost" ? "high" : null,
    condition: type === "found" ? "excellent" : null,
    reward: type === "lost" ? "$50" : null,
    storageLocation: type === "found" ? "Student Affairs Office" : null,
    status: type === "lost" ? "active" : "unclaimed",
    reporter: type === "lost" ? "John Doe" : "Sarah Wilson",
    finder: type === "found" ? "Sarah Wilson" : null,
    contactInfo: "Available after subscription",
    additionalDetails: type === "lost"
      ? "Phone has a distinctive case with stickers. Contains important photos and contacts."
      : "ID card is in excellent condition with clear photo. No visible damage.",
    color: type === "lost" ? "Black" : "Blue/White",
    brand: type === "lost" ? "Apple" : "University ID",
    uniqueFeatures: type === "lost"
      ? "Cracked screen on bottom left, distinctive case with stickers"
      : "Student number: 2024001234",
    estimatedValue: type === "lost" ? "$800" : null,
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "urgent":
        return "#FF6B6B";
      case "high":
        return "#FFA726";
      case "medium":
        return "#66BB6A";
      case "low":
        return "#42A5F5";
      default:
        return "#9E9E9E";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "excellent":
        return "#4CAF50";
      case "good":
        return "#66BB6A";
      case "fair":
        return "#FFA726";
      case "poor":
        return "#FF7043";
      case "damaged":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "unclaimed":
        return isLight ? LGlobals.bluetext : DGlobals.bluetext;
      case "claimed":
      case "resolved":
        return "#4CAF50";
      case "returned":
        return "#2196F3";
      case "expired":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const handleContactOwner = () => {
    // Check if user is premium using user verification field
    // const { user } = useGlobal();
    
    const isPremiumUser = user?.verified === false;

    if (!isPremiumUser) {
      Alert.alert(
        "Premium Feature",
        "Contact information and direct messaging is available for premium subscribers only.",
        [
          {
            text: "Upgrade Now",
            onPress: () => navigation.navigate("SubscriptionPlans")
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );
      return;
    }

    // Navigate to MessageInbox for direct communication
    const reporterInfo = {
      id: item.reporterId || item.id,
      name: item.reporter || "Item Reporter",
      username: item.reporterUsername || "reporter",
      profile_image: item.reporterImage || null,
      online: true, // Assume online for demo
    };

    const currentUser = useGlobal((s) => s.user);

    navigation.navigate("MesssageInbox", {
      connect: reporterInfo,
      sender: currentUser?.id,
      id: reporterInfo.id,
      tagedMessage: {
        text: `Regarding: ${item.title}`,
        serviceId: item.id,
        serviceRaw: item,
      }
    });
  };

  const handleClaimItem = async () => {
    if (type === "found") {
      setLoading(true);
      try {
        // TODO: Implement API call to claim item
        await new Promise(resolve => setTimeout(resolve, 2000));

        Alert.alert(
          "Success",
          "Item claim request has been submitted. The finder will be notified.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack()
            }
          ]
        );
      } catch (error) {
        Alert.alert("Failed to submit claim request. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const InfoRow = ({ icon, label, value, color }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <MaterialIcons
        name={icon}
        size={18}
        color={color || (isLight ? LGlobals.greyText : DGlobals.greyText)}
        style={{ marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 14,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Item Details
        </Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate("SearchLostFound")}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          {/* <FontAwesomeIcon
            icon="fa-solid fa-search"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          /> */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Item Header */}
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            // borderLeftWidth: 4,
            // borderLeftColor: type === "lost"
            //   ? getUrgencyColor(item.urgency)
            //   : getConditionColor(item.condition),
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "700",
                fontSize: 20,
                flex: 1,
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                // backgroundColor: getStatusColor(item.status),
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
              }}
            >
              <Text
                style={{
                  // color: "#fff",
                color: getStatusColor(item.status),

                  fontSize: 12,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 14,
              marginBottom: 12,
              lineHeight: 20,
            }}
          >
            {item.description}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <MaterialIcons
              name="category"
              size={16}
              color={isLight ? LGlobals.greyText : DGlobals.greyText}
            />
            <Text
              style={{
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontSize: 12,
                marginLeft: 4,
              }}
            >
              {item.category}
            </Text>
          </View>

          {item.reward && (
            <View
              style={{
                backgroundColor: "#FFF3E0",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#F57C00",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Reward: {item.reward}
              </Text>
            </View>
          )}
        </View>

        {/* Basic Information */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 12,
          }}
        >
          Basic Information
        </Text>

        <View
          style={{
            paddingHorizontal: 2,
            paddingVertical:5,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <InfoRow
            icon="location-on"
            label="Location"
            value={item.location}
          />

          <InfoRow
            icon="access-time"
            label={type === "lost" ? "Date & Time Lost" : "Date & Time Found"}
            value={`${item.date} at ${item.time}`}
          />

          {type === "lost" && item.urgency && (
            <InfoRow
              icon="priority-high"
              label="Urgency Level"
              value={item.urgency}
              color={getUrgencyColor(item.urgency)}
            />
          )}

          {type === "found" && item.condition && (
            <InfoRow
              icon="build"
              label="Condition"
              value={item.condition}
              color={getConditionColor(item.condition)}
            />
          )}

          {type === "found" && item.storageLocation && (
            <InfoRow
              icon="store"
              label="Storage Location"
              value={item.storageLocation}
            />
          )}
        </View>

        {/* Additional Details */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 12,
          }}
        >
          Additional Details
        </Text>

        <View
          style={{
            // backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          {item.color && (
            <InfoRow
              icon="palette"
              label="Color"
              value={item.color}
            />
          )}

          {item.brand && (
            <InfoRow
              icon="branding-watermark"
              label="Brand/Model"
              value={item.brand}
            />
          )}

          {item.uniqueFeatures && (
            <InfoRow
              icon="fingerprint"
              label="Unique Features"
              value={item.uniqueFeatures}
            />
          )}

          {item.estimatedValue && (
            <InfoRow
              icon="attach-money"
              label="Estimated Value"
              value={item.estimatedValue}
            />
          )}

          {item.additionalDetails && (
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  color: isLight ? LGlobals.greyText : DGlobals.greyText,
                  fontSize: 12,
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                Additional Information
              </Text>
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {item.additionalDetails}
              </Text>
            </View>
          )}
        </View>

        {/* Communication Section */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 12,
          }}
        >
          Contact Reporter
        </Text>

        <View
          style={{
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <MaterialIcons
              name="chat"
              size={20}
              color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
            />
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                fontWeight: "600",
                fontSize: 14,
                marginLeft: 8,
              }}
            >
              Direct Messaging
            </Text>
          </View>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
              marginBottom: 12,
            }}
          >
            Send a direct message to the person who reported this item.Verified users can communicate directly.
          </Text>
          <TouchableOpacity
            onPress={handleContactOwner}
            style={{
              backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 25,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
           
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
                marginLeft: 8,
              }}
            >
              Message Reporter
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reward System */}
        <RewardSystem
          rewardAmount={item.reward || 0}
          isPremiumUser={user?.verified === true}
          itemStatus={item.status}
          onRewardClaim={(amount) => {
            console.log(`Reward claimed: $${amount}`);
            // TODO: Update user balance, show notification
          }}
          theme={theme}
        />

        {/* Action Buttons */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 40 }}>
          {type === "found" && (
            <TouchableOpacity
              onPress={handleClaimItem}
              disabled={loading}
              style={{
               borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
               borderWidth:1,
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 12,
                flex: 1,
                alignItems: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  Claim Item
                </Text>
              )}
            </TouchableOpacity>
          )}

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({});