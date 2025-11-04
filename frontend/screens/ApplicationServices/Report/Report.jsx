import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Report = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: "2%",
        backgroundColor: isLight ? "#b5b5b53e" : "#d0d0d011",
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        marginTop: 10,
        //marginBottom: 2,
        height: 35,
        alignItems: "center",
      }}
    >
      <FontAwesomeIcon
        icon={"bell"}
        color={"red"} //{isLight ? LGlobals.icon : DGlobals.red}
        size={12}
      />
      <Text
        style={{
          color: "red",
          textAlignVertical: "center",
          fontWeight: 600,
        }}
      >
        Report
      </Text>
    </TouchableOpacity>
  );
};

export default Report;

const styles = StyleSheet.create({});
