import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

function ConnectsScreenTopView(params) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: "2%",
        paddingHorizontal: "5%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}   
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: "bold",
          color: isLight ? LGlobals.text : DGlobals.text
        }}
      >
        Connects
      </Text>
    </View>
  );
}

export default ConnectsScreenTopView;

const styles = StyleSheet.create({});
