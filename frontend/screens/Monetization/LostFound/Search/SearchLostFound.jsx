import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { MaterialIcons } from "@expo/vector-icons";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";

const SearchLostFound = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState([
    "iPhone",
    "Student ID",
    "Backpack",
    "Keys",
    "Calculator",
  ]);

  const categories = [
    { id: "all", name: "All Items", icon: "search" },
    { id: "electronics", name: "Electronics", icon: "phone-android" },
    { id: "documents", name: "Documents", icon: "description" },
    { id: "clothing", name: "Clothing", icon: "checkroom" },
    { id: "keys", name: "Keys & Cards", icon: "vpn-key" },
    { id: "bags", name: "Bags & Wallets", icon: "work" },
  ];

  const sampleResults = [
    {
      id: "1",
      title: "iPhone 12 Pro",
      type: "lost",
      description: "Black iPhone 12 Pro with cracked screen",
      location: "Library - Study Area B",
      date: "2024-01-15",
      category: "Electronics",
      status: "active",
    },
    {
      id: "2",
      title: "Student ID Card",
      type: "found",
      description: "University student ID card",
      location: "Main Campus - Cafeteria",
      date: "2024-01-14",
      category: "Keys & Cards",
      status: "unclaimed",
    },
    {
      id: "3",
      title: "Blue Backpack",
      type: "lost",
      description: "Navy blue backpack with laptop compartment",
      location: "Lecture Hall A",
      date: "2024-01-13",
      category: "Bags & Wallets",
      status: "resolved",
    },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // TODO: Implement search API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Filter sample results based on search query
      const filtered = sampleResults.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
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
      case "expired":
        return "#9E9E9E";
      default:
        return "#9E9E9E";
    }
  };

  const SearchResultCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ItemDetails", {
          itemId: item.id,
          type: item.type,
          itemData: item,
        })
      }
      style={{
        borderColor: isLight ? "#f8f9fa" : "#2a2a2a",
        borderBottomWidth:1,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
        }}
      >
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
            // backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
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
          marginBottom: 8,
          lineHeight: 20,
        }}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
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

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            {item.date}
          </Text>
        </View>

        <View
          style={{
            // backgroundColor: item.type === "lost" ? "red" : "#66BB6A",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 10,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CategoryFilter = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: isSelected
          ? isLight
            ? LGlobals.bluetext
            : DGlobals.bluetext
          : isLight
          ? "#f0f0f0"
          : "#333",
        marginRight: 8,
      }}
    >
      <Text
        style={{
          color: isSelected ? "#fff" : isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
          fontSize: 12,
        }}
      >
        {category.name}
      </Text>
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
          paddingVertical: 5,
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
          Search Items
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 25,
            paddingHorizontal: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: isLight ? "#ddd" : "#333",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-search"
            size={16}
            color={isLight ? LGlobals.greyText : DGlobals.greyText}
          />
          <TextInput
            placeholder="Search for lost or found items..."
            placeholderTextColor={isLight ? "#888" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 12,
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 14,
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
              style={{ padding: 4 }}
            >
              <MaterialIcons
                name="clear"
                size={20}
                color={isLight ? LGlobals.greyText : DGlobals.greyText}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Search Button */}
{/* 
        <TouchableOpacity
          onPress={handleSearch}
          disabled={loading || !searchQuery.trim()}
          style={{
            // borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,

            borderColor: isLight ? "#ddd" : "#555",
            paddingVertical: 7,
            borderRadius: 25,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          {loading ? (
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
        </TouchableOpacity> */}

        {/* Category Filters */}
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 12,
          }}
        >
          Filter by Category
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {categories.map((category) => (
            <CategoryFilter
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Recent Searches */}
        {/* {searchResults.length === 0 && !loading && (
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 16,
                color: isLight ? LGlobals.text : DGlobals.text,
                marginBottom: 12,
              }}
            >
              Recent Searches
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchQuery(search);
                    handleSearch();
                  }}
                  style={{
                    backgroundColor: isLight ? "#f0f0f0" : "#333",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 16,
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontSize: 12,
                    }}
                  >
                    {search}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )} */}

        {/* Search Results */}
        {loading && (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator
              size="large"
              color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
            />
           
          </View>
        )}

        {!loading && searchResults.length > 0 && (
          <View>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <SearchResultCard item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {!loading && searchResults.length === 0 && searchQuery.length > 0 && (
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
              No items found
            </Text>
      
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchLostFound;

const styles = StyleSheet.create({});
