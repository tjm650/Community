import { StyleSheet, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const SendIcon = ({ onPress, post = false, disabled }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: 35,
        height: 35,
        borderRadius: 45,
        backgroundColor: post 
          ? isLight
            ? "#172021"
            : "#283638"
          : "transparent",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: post ? 0.3 : 0,
        borderColor: "#6e9aa05a",
      }}
      onPress={onPress}
      disabled = {disabled}
    >
      <Ionicons
        name="send"
        size={ post ? 15 : 19}
        color={post ? "#07c9e3" : isLight ? LGlobals.icon : DGlobals.icon}
      />
    </TouchableOpacity>
  );
};

export default SendIcon;

const styles = StyleSheet.create({});
