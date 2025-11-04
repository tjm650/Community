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

function IntershipNotifDetails({ name, description }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        gap: 10,
        marginBottom: "2%",
      }}
    >
      <Text
        numberOfLines={2}
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          lineHeight: 20
        }}
      >
        {description}
      </Text>
      {/*<ClientProfile clientName={name} />*/}
    </View>
  );
}

export default IntershipNotifDetails;

const styles = StyleSheet.create({});
