import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

const AppDescription = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        marginTop:"5%",
        alignItems: "center",
        flexDirection:"row",
        gap:15,
        justifyContent:"center"
      }}
    >
      {/* <FontAwesomeIcon
        icon="fa-solid fa-meteor"
        color={isLight ? LGlobals.text : DGlobals.text}
        size={25}
      /> */}
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "500",
          fontSize: 16,
        }}
      >
        Community ©
      </Text>
    </View>
  );
};

export default AppDescription;

const styles = StyleSheet.create({});
