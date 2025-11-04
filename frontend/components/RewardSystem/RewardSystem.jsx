import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// ========================== Colors ==========================================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";

const RewardSystem = ({
  rewardAmount = 0,
  isPremiumUser = false,
  itemStatus = "active",
  onRewardClaim,
  theme
}) => {
  const { global: globalState } = useGlobal();
  let isLight = theme === "light";

  const [claiming, setClaiming] = useState(false);
  const [rewardBreakdown, setRewardBreakdown] = useState({
    baseReward: 0,
    premiumBonus: 0,
    totalReward: 0,
  });

  useEffect(() => {
    calculateReward();
  }, [rewardAmount, isPremiumUser, itemStatus]);

  const calculateReward = () => {
    if (itemStatus !== "claimed" && itemStatus !== "resolved") {
      setRewardBreakdown({
        baseReward: 0,
        premiumBonus: 0,
        totalReward: 0,
      });
      return;
    }

    // Parse reward amount (remove currency symbols and convert to number)
    const baseAmount = parseFloat(rewardAmount.toString().replace(/[$,ZWL\s]/g, "")) || 0;

    // Calculate reporter's share (50% of offered reward)
    const reporterShare = baseAmount * 0.5;

    // Premium bonus ($1 for premium subscribers)
    const premiumBonus = isPremiumUser ? 1 : 0;

    const totalReward = reporterShare + premiumBonus;

    setRewardBreakdown({
      baseReward: reporterShare,
      premiumBonus,
      totalReward,
    });
  };

  const handleClaimReward = async () => {
    if (rewardBreakdown.totalReward <= 0) {
      Alert.alert("No reward is available for this item.");
      return;
    }

    setClaiming(true);
    try {
      // TODO: Implement API call to claim reward
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        "Reward Claimed!",
        `Congratulations! You earned $${rewardBreakdown.totalReward.toFixed(2)} for your report on this item.`,
        [
          {
            text: "OK",
            onPress: () => {
              onRewardClaim?.(rewardBreakdown.totalReward);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Failed to claim reward. Please try again.");
    } finally {
      setClaiming(false);
    }
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  if (itemStatus !== "claimed" && itemStatus !== "resolved") {
    return (
      <View
        style={{
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <MaterialIcons
            name="info"
            size={20}
            color={isLight ? LGlobals.greyText : DGlobals.greyText}
          />
          <Text
            style={{
              color: isLight ? LGlobals.greyText : DGlobals.greyText,
              fontSize: 14,
              marginLeft: 8,
              fontWeight: "600",
            }}
          >
            Reward Information
          </Text>
        </View>
        <Text
          style={{
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
            fontSize: 12,
          }}
        >
          Rewards are available once the item is claimed or resolved.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
        <MaterialIcons
          name="celebration"
          size={24}
          color={isLight ? "#4CAF50" : "#66BB6A"}
        />
        <Text
          style={{
            color: isLight ? "#2E7D32" : "#81C784",
            fontSize: 16,
            fontWeight: "700",
            marginLeft: 8,
          }}
        >
          Reward Earned!
        </Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Reward Breakdown:
        </Text>

        <View style={{ marginLeft: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text
              style={{
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontSize: 12,
              }}
            >
              50% of offered reward:
            </Text>
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {formatCurrency(rewardBreakdown.baseReward)}
            </Text>
          </View>

          {isPremiumUser && (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="star"
                  size={12}
                  color={isLight ? "#FF6B6B" : "#FF8A80"}
                />
                <Text
                  style={{
                    color: isLight ? LGlobals.greyText : DGlobals.greyText,
                    fontSize: 12,
                    marginLeft: 4,
                  }}
                > 
                  Premium bonus:
                </Text>
              </View>
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {formatCurrency(rewardBreakdown.premiumBonus)}
              </Text>
            </View>
          )}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: isLight ? "#4CAF50" : "#66BB6A",
              marginVertical: 8,
              paddingVertical: 4,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Total Reward:
              </Text>
              <Text
                style={{
                  color: isLight ? "#2E7D32" : "#81C784",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {formatCurrency(rewardBreakdown.totalReward)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleClaimReward}
        disabled={claiming}
        style={{
          borderColor: claiming
            ? (isLight ? "#ccc" : "#555")
            : (isLight ? "#4CAF50" : "#66BB6A"),
            borderWidth: 1,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {claiming ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <MaterialIcons
              name="account-balance-wallet"
              size={18}
              color="#fff"
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "700",
                marginLeft: 8,
              }}
            >
              Claim Reward
            </Text>
          </>
        )}
      </TouchableOpacity>

      {!isPremiumUser && rewardBreakdown.baseReward > 0 && (
        <View
          style={{
            padding: 12,
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="info"
              size={16}
              color={isLight ? "#F57C00" : "#FFB74D"}
            />
            <Text
              style={{
                color: isLight ? "#E65100" : "#FFCC80",
                fontSize: 12,
                fontWeight: "600",
                marginLeft: 6,
              }}
            >
              Premium Tip
            </Text>
          </View>
          <Text
            style={{
              color: isLight ? "#E65100" : "#FFCC80",
              fontSize: 11,
              marginTop: 4,
            }}
          >
            Get verified to earn an additional $1 bonus on all rewards!
          </Text>
        </View>
      )}
    </View>
  );
};

export default RewardSystem;