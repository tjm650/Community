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

const BrowseFoundItems = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [foundItems, setFoundItems] = useState([
    {
      id: "1",
      title: "Student ID Card",
      description: "University student ID card found in the cafeteria area",
      location: "Main Campus - Cafeteria",
      dateFound: "2024-01-15",
      timeFound: "13:20",
      category: "Keys & Cards",
      condition: "excellent",
      storageLocation: "Student Affairs Office",
      contactInfo: "Available after subscription",
      status: "unclaimed",
      finder: "Sarah Wilson",
      image: null,
    },
    {
      id: "2",
      title: "Black Wallet",
      description: "Black leather wallet containing cards and some cash",
      location: "Library - Main Desk",
      dateFound: "2024-01-14",
      timeFound: "16:45",
      category: "Bags & Wallets",
      condition: "good",
      storageLocation: "Security Office",
      contactInfo: "Available after subscription",
      status: "claimed",
      finder: "David Brown",
      image: null,
    },
    {
      id: "3",
      title: "Calculator",
      description: "Scientific calculator, appears to be in good working condition",
      location: "Lecture Hall B",
      dateFound: "2024-01-13",
      timeFound: "11:30",
      category: "Electronics",
      condition: "fair",
      storageLocation: "Lost & Found Office",
      contactInfo: "Available after subscription",
      status: "unclaimed",
      finder: "Emma Davis",
      image: null,
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Implement API call to refresh found items
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real implementation, fetch fresh data here
    } catch (error) {
      console.error("Error refreshing found items:", error);
    } finally {
      setRefreshing(false);
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
      case "unclaimed":
        return isLight ? LGlobals.bluetext : DGlobals.bluetext;
      case "claimed":
        return "#4CAF50";
      case "returned":
        return "#2196F3";
      case "disposed":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const FoundItemCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ItemDetails", {
        itemId: item.id,
        type: "found",
        itemData: item
      })}
      style={{
        backgroundColor: isLight ? "#f8f9fa" : "#2a2a2a",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: getConditionColor(item.condition),
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

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
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
            {item.dateFound} at {item.timeFound}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: getConditionColor(item.condition),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
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
            {item.condition}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <MaterialIcons
          name="store"
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
          {item.storageLocation}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <MaterialIcons
          name="person"
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
          Found by: {item.finder}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ItemDetails", {
          itemId: item.id,
          type: "found",
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
          Found Items
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
            Unclaimed
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
            Recent
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
            Loading found items...
          </Text>
        </View>
      ) : (
        <FlatList
          data={foundItems}
          renderItem={({ item }) => <FoundItemCard item={item} />}
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
                No found items reported
              </Text>
              <Text
                style={{
                  color: isLight ? LGlobals.greyText : DGlobals.greyText,
                  fontSize: 14,
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Check back later or report a found item
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default BrowseFoundItems;

const styles = StyleSheet.create({});