import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";

const TrendingItem = ({ onPress, trendingItemName }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        borderBottomWidth: 0,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        marginBottom: "1%",
        paddingHorizontal: "2%",
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          textTransform: "capitalize",
          fontWeight: "700",
          fontSize: 24,
          // textAlign: 'center',
          textShadowColor: isLight
            ? "rgba(0,0,0,0.3)"
            : "rgba(255,255,255,0.3)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 3,
        }}
      >
        {trendingItemName}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingItem;

const styles = StyleSheet.create({});
