import React from "react";
import { StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

const BadgePlus = ({ backgroundColor, height, width, borderRadius, color }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        position: "absolute",
        top: -10,
        right: 10,
        backgroundColor: backgroundColor,
        zIndex: 99,
        height: height,
        width: width,
        borderRadius: borderRadius,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesomeIcon
        icon={"fa-solid fa-plus"}
        color={color}
        size={15}
      />
    </View>
  );
};

export default BadgePlus;

const styles = StyleSheet.create({});
