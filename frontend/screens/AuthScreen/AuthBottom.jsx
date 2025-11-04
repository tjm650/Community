import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const AuthBottom = ({ space = true }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: Dimensions.get("window").height * 0.1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width:"100%"
      }}
    >
      <Text
        style={{
          color: DGlobals.text,
          textAlign: "center",
          fontWeight: 800,
          fontSize: 25,
          textAlignVertical: "center",
        }}
      >
        Community
      </Text>
      <Text
        style={{
          textAlign: "center",
          textAlignVertical: "center",
          color: DGlobals.text,
          fontWeight: "900",
          fontSize: 30,
        }}
      >
        ©
      </Text>
      {/* <FontAwesomeIcon icon="fa-solid fa-meteor" color="#ECEDEE" size={25} /> */}
    </View>
  );
};

export default AuthBottom;

const styles = StyleSheet.create({});
