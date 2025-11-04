import React from "react";
import { StyleSheet, Text } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";

//======================================================================================

const BadgeButtonNotifsCount = ({
  backgroundColor,
  borderRadius,
  notifCounts,
  right,
  top,
  color,
  borderColor,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <Text
      style={{
        position: "absolute",
        top: top,
        right: right,
        backgroundColor: backgroundColor,
        zIndex: 99,
        paddingVertical: "0%",
        paddingHorizontal: "10%",
        borderRadius: borderRadius,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: borderColor,
        minWidth:25,
        fontWeight: "700",
        fontSize: 12,
        color: color,
        textAlign: "center",
        alignItems: "center",
        textAlignVertical: "center",
      }}
    >
      {notifCounts}
    </Text>
  );
};

export default BadgeButtonNotifsCount;

const styles = StyleSheet.create({});
