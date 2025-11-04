import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";
import MovieBoxItemCard from "@/components/Performance/MovieBoxItemCard";

const BrowseLostItems = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lostItems, setLostItems] = useState([
    {
      id: "1",
      title: "iPhone 12 Pro",
      description: "Black iPhone 12 Pro with cracked screen, last seen in Library",
      location: "Library - Study Area B",
      dateLost: "2024-01-15",
      timeLost: "14:30",
      category: "Electronics",
      urgency: "high",
      reward: "$50",
      contactInfo: "Available after subscription",
      status: "active",
      reporter: "John Doe",
      image: null,
    },
    {
      id: "2",
      title: "Student ID Card",
      description: "University student ID card with photo ID",
      location: "Cafeteria",
      dateLost: "2024-01-14",
      timeLost: "12:15",
      category: "Keys & Cards",
      urgency: "urgent",
      reward: "Coffee voucher",
      contactInfo: "Available after subscription",
      status: "active",
      reporter: "Jane Smith",
      image: null,
    },
    {
      id: "3",
      title: "Blue Backpack",
      description: "Navy blue backpack with laptop compartment, contains notebooks",
      location: "Lecture Hall A",
      dateLost: "2024-01-13",
      timeLost: "09:45",
      category: "Bags & Wallets",
      urgency: "medium",
      reward: "N/A",
      contactInfo: "Available after subscription",
      status: "resolved",
      reporter: "Mike Johnson",
      image: null,
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Implement API call to refresh lost items
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, fetch fresh data here
    } catch (error) {
      console.error("Error refreshing lost items:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleMessageReporter = (item) => {
    // Check if user is premium using user verification field
    const { user } = useGlobal();
    const isPremiumUser = user?.verified === true;

    if (!isPremiumUser) {
      Alert.alert(
        "Premium Feature",
        "Direct messaging is available for premium subscribers only.",
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
      id: item.id,
      name: item.reporter || "Item Reporter",
      username: "reporter",
      profile_image: null,
      online: true,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return isLight ? LGlobals.bluetext : DGlobals.bluetext;
      case "resolved":
        return "#4CAF50";
      case "expired":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const LostItemCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ItemDetails", {
        itemId: item.id,
        type: "lost",
        itemData: item
      })}
      style={{
        backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: getUrgencyColor(item.urgency),
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "700",
            fontSize: 16,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View
          style={{
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 10,
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
          marginBottom: 8,
          lineHeight: 20,
        }}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <MaterialIcons
          name="location-on"
          size={14}
          color={isLight ? LGlobals.greyText : DGlobals.greyText}
        />
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 12,
            marginLeft: 4,
          }}
        >
          {item.location}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="access-time"
            size={14}
            color={isLight ? LGlobals.greyText : DGlobals.greyText}
          />
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
              marginLeft: 4,
            }}
          >
            {item.dateLost} at {item.timeLost}
          </Text>
        </View>

        {item.reward !== "N/A" && (
          <View
            style={{
              backgroundColor: "#FFF3E0",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#F57C00",
                fontSize: 10,
                fontWeight: "600",
              }}
            >
              Reward: {item.reward}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <MaterialIcons
          name="category"
          size={14}
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
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 12,
            marginLeft: 8,
          }}
        >
          •
        </Text>
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 12,
            marginLeft: 8,
          }}
        >
          {item.reporter}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ItemDetails", {
          itemId: item.id,
          type: "lost",
          itemData: item
        })}
        style={{
          backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignSelf: "flex-start",
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          View Details
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
          borderBottomWidth: 1,
          borderBottomColor: isLight ? "#eee" : "#333",
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
          Lost Items
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchLostFound")}
          activeOpacity={0.7}
          style={{ padding: 8 }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-search"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: isLight ? "#eee" : "#333",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            All Items
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: isLight ? "#f0f0f0" : "#333",
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            Electronics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: isLight ? "#f0f0f0" : "#333",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            Documents
          </Text>
        </TouchableOpacity>
      </View>

      {/* Items List */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={isLight ? LGlobals.bluetext : DGlobals.bluetext} />
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              marginTop: 16,
            }}
          >
            Loading lost items...
          </Text>
        </View>
      ) : (
        <FlatList
          data={lostItems}
          renderItem={({ item }) => (
            <MovieBoxItemCard
              item={item}
              onPress={() => navigation.navigate("ItemDetails", {
                itemId: item.id,
                type: "lost",
                itemData: item
              })}
              onMessage={handleMessageReporter}
              theme={theme}
              showReward={true}
              showStatus={true}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]}
              tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
            />
          }
          ListEmptyComponent={
            <View style={{ paddingVertical: 40, alignItems: "center" }}>
              <MaterialIcons
                name="search-off"
                size={48}
                color={isLight ? LGlobals.greyText : DGlobals.greyText}
              />
              <Text
                style={{
                  color: isLight ? LGlobals.greyText : DGlobals.greyText,
                  fontSize: 16,
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                No lost items found
              </Text>
              <Text
                style={{
                  color: isLight ? LGlobals.greyText : DGlobals.greyText,
                  fontSize: 14,
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Check back later or report a lost item
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default BrowseLostItems;

const styles = StyleSheet.create({});