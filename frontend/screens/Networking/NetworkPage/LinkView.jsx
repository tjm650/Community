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

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

function LinkView({ icon, Infor, isLight }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();

  
  return (
    <View
      style={{
        //backgroundColor: "#6d6d6d46",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        overflow: "hidden",
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        size={15}
        color={isLight ? LGlobals.text : DGlobals.text}
      />
      <Text
        numberOfLines={1}
        style={{
          color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          fontWeight: 600,
        }}
      >
        {Infor}
      </Text>
    </View>
  );
}

export default LinkView;

const styles = StyleSheet.create({});
