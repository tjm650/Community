import React from "react";
import { StyleSheet, Text, View } from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const CompleteSignUpTopView = ({user}) => {
    const { theme } = useGlobal();
    let isLight = theme === "light";
  return (
    <View
      style={{
        backgroundColor: isLight? LGlobals.background : DGlobals.background,
        paddingVertical: "3%",
        paddingLeft: "5%",
        paddingRight: "1%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0,
        borderBottomColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: 800,
            fontSize: 25,
            color:  "rgba(248, 252, 254, 0.683)",
          }}
        >
          Complete Your Details
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
        }}
      >

      </View>
    </View>
  );
};

export default CompleteSignUpTopView;

const styles = StyleSheet.create({});
