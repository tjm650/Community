import React from "react";
import { StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================


const TermsAndConditions = () => {
    const { theme } = useGlobal(); 
    let isLight = theme === "light";
    return (
        <View
        style={{
          marginTop: "15%",
          marginBottom: "5%",
        }}
      >
        <Text
          style={{
            lineHeight: 20,
            textAlign: "center",
            textAlignVertical: "center",
            color: "#505050",
          }}
        >
          Application usage depends on the agreed{" "}
          <Text
            style={{
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            Terms and Conditions
          </Text>{" "}
          in cooperation with institution rules and regulation.
        </Text>
      </View>
    )
}

export default TermsAndConditions

const styles = StyleSheet.create({})