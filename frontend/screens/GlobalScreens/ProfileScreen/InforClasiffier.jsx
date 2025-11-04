import { StyleSheet, Text } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import useGlobal from "@/assets/core/useGlobal";
import React from "react";

const InforClasiffier = ({infor}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <Text
      numberOfLines={3}
      style={{
        marginBottom:5,
        marginHorizontal:-5,
        paddingHorizontal:"1%",
        paddingVertical:3,
        textTransform: "capitalize",
        color: isLight ? LGlobals.text : DGlobals.text,
        fontWeight: "500",
        fontSize: 18,
       // backgroundColor:"#b5b5b511"
      }}
    >
      {infor}
    </Text>
  );
};

export default InforClasiffier;

const styles = StyleSheet.create({});
