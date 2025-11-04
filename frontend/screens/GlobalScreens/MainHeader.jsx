import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const MainHeader = ({
  header,
  getView,
  backgroundColor,
  borderRadius,
  position,
  imagescreen = false,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        height: 40,
        width: "100%",
        alignItems: "center",
        paddingVertical:"3%",
        backgroundColor: !position
          ? isLight
            ? LGlobals.background
            : DGlobals.background
          : imagescreen && "black",
        flexDirection: "row",
        paddingHorizontal: "3%",
        borderRadius: borderRadius,
        position: position,
        zIndex:99
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 5,
          borderRadius: 20,
          marginRight: 20,
        }}
      >
        <FontAwesomeIcon
          icon=" fa-solid fa-arrow-left"
          size={20}
          color={isLight ? LGlobals.text : DGlobals.text}
        />
        {getView}
      </TouchableOpacity>
      {header}
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({});
