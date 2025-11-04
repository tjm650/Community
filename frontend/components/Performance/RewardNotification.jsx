import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const { width } = Dimensions.get("window");

const RewardNotification = ({
  visible = false,
  rewardAmount = 0,
  itemTitle = "",
  onClose,
  theme,
  autoHide = true,
  duration = 5000
}) => {
  const [animation] = useState(new Animated.Value(0));
  let isLight = theme === "light";

  useEffect(() => {
    if (visible) {
      // Slide in animation
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      // Auto hide after duration
      if (autoHide) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      // Slide out animation
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [visible, autoHide, duration]);

  const handleClose = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start(() => {
      onClose?.();
    });
  };

  if (!visible) return null;

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 1],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 50,
        left: 16,
        right: 16,
        transform: [{ translateY }],
        opacity,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          backgroundColor: isLight ? "#E8F5E8" : "#1E3A2E",
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: isLight ? "#4CAF50" : "#66BB6A",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <View
            style={{
              backgroundColor: isLight ? "#4CAF50" : "#66BB6A",
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <MaterialIcons
              name="celebration"
              size={20}
              color="#fff"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: isLight ? "#2E7D32" : "#81C784",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Reward Earned!
            </Text>
            <Text
              style={{
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontSize: 12,
              }}
            >
              Congratulations on your successful report
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleClose}
            style={{
              padding: 4,
            }}
          >
            <MaterialIcons
              name="close"
              size={20}
              color={isLight ? LGlobals.greyText : DGlobals.greyText}
            />
          </TouchableOpacity>
        </View>

        {/* Reward Amount */}
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Text
            style={{
              color: isLight ? "#2E7D32" : "#81C784",
              fontSize: 24,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            ${rewardAmount.toFixed(2)}
          </Text>
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 12,
            }}
          >
            Reward credited to your account
          </Text>
        </View>

        {/* Item Info */}
        {itemTitle && (
          <View
            style={{
              backgroundColor: isLight ? "#F1F8E9" : "#2E3A2E",
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              Item Reported:
            </Text>
            <Text
              style={{
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontSize: 12,
              }}
              numberOfLines={2}
            >
              {itemTitle}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              // TODO: Navigate to wallet/balance screen
              console.log("Navigate to wallet");
            }}
            style={{
              backgroundColor: isLight ? "#4CAF50" : "#66BB6A",
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              View Balance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // TODO: Share achievement
              console.log("Share achievement");
            }}
            style={{
              backgroundColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar for Auto Hide */}
        {autoHide && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: isLight ? "#f0f0f0" : "#333",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <Animated.View
              style={{
                height: "100%",
                backgroundColor: isLight ? "#4CAF50" : "#66BB6A",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                width: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["100%", "0%"],
                }),
              }}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default RewardNotification;