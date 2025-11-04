import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import LazyImage from "./LazyImage";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const MovieBoxItemCard = memo(({
  item,
  onPress,
  onMessage,
  theme,
  showReward = true,
  showStatus = true,
  compact = false
}) => {
  let isLight = theme === "light";

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: isLight ? "#fff" : "#1a1a1a",
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: isLight ? "#f0f0f0" : "#333",
      }}
    >
      {/* Header Section */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 16,
        paddingBottom: 12,
      }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "700",
              fontSize: 18,
              marginBottom: 4,
            }}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {/* Location and Date */}
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
                marginRight: 12,
              }}
              numberOfLines={1}
            >
              {item.location}
            </Text>

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
              {formatDate(item.date)}
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        {showStatus && (
          <View
            style={{
              backgroundColor: getStatusColor(item.status),
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              minWidth: 60,
              alignItems: "center",
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
        )}
      </View>

      {/* Image Section */}
      {item.images && item.images.length > 0 && (
        <View style={{
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}>
          <LazyImage
            source={{ uri: item.images[0] }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
            }}
            resizeMode="cover"
            placeholder="Loading image..."
            theme={theme}
          />
        </View>
      )}

      {/* Footer Section */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: isLight ? "#f0f0f0" : "#333",
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
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
              marginRight: 12,
            }}
          >
            {item.category}
          </Text>

          {item.type && (
            <View
              style={{
                backgroundColor: item.type === "lost" ? "#FFA726" : "#66BB6A",
                paddingHorizontal: 8,
                paddingVertical: 2,
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
                {item.type}
              </Text>
            </View>
          )}
        </View>

        {/* Reward Section */}
        {showReward && item.reward && item.reward !== "N/A" && (
          <View
            style={{
              backgroundColor: isLight ? "#FFF3E0" : "#3E2723",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: isLight ? "#FF9800" : "#FFB74D",
            }}
          >
            <Text
              style={{
                color: isLight ? "#F57C00" : "#FFB74D",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              Reward: {item.reward}
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        flexDirection: "row",
        gap: 8,
      }}>
        {/* Message Button */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onMessage?.(item);
          }}
          style={{
            backgroundColor: isLight ? "#4CAF50" : "#66BB6A",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
          }}
        >
          <MaterialIcons
            name="message"
            size={14}
            color="#fff"
          />
        </TouchableOpacity>

        {/* View Details Button */}
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
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
      </View>
    </TouchableOpacity>
  );
});

MovieBoxItemCard.displayName = "MovieBoxItemCard";

export default MovieBoxItemCard;