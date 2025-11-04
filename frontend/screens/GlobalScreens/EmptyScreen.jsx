import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

const EmptyScreen = ({
  text,
  icon,
  OnPressText,
  onPress,
  color,
  marginBottom,
  height,
  Iconheight,
  getView,
  borderWidth,
  btn = true,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal:"5%"
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View>{icon}</View>
        <Text
          style={{
            textAlign: "left",
            color: isLight ? LGlobals.lighttext : DGlobals.text,
            lineHeight: 40,
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          {text}
        </Text>
        {btn && (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
              alignItems: "flex-start",
              alignSelf: "flex-start",
              marginTop: "2%",
              paddingBottom: marginBottom,
              
            }}
          >
            <Text
              style={{
                color: isLight ? DGlobals.text : DGlobals.text,
                textAlign: "center",
                paddingHorizontal: 35,
                fontWeight: 800,
                fontSize: 16,
                //letterSpacing:0.5,
                width: "auto%",
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25,
                paddingVertical: "2%",
                // backgroundColor: color,
                borderWidth: 0.5,
                borderColor: color,
              }}
              onPress={onPress}
            >
              {OnPressText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View>{getView}</View>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({});
