import React from "react";
import { StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";

const NetworkPageTopView = ({ description }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      id="Top View"
      style={{
        paddingHorizontal: "1%",
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          //backgroundColor: "#4141411b",
          borderWidth: 0.3,
          borderColor: "#6d6d6d46",
          paddingHorizontal: "2%",
          height:"auto",
          paddingVertical: "1%",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingHorizontal: "2%",
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default NetworkPageTopView;

const styles = StyleSheet.create({});
