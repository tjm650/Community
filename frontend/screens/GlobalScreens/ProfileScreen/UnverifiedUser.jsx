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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyScreen from "../EmptyScreen";

const UnverifiedUser = ({ networkLink }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 20,
      }} 
    >
      <EmptyScreen
        getView={
          <FontAwesomeIcon
            icon={"user"}
            color={isLight ? LGlobals.icon : DGlobals.icon}
            size={45}
          />
        }
      />
      <Text
        style={{
          textAlign: "left",
          color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          marginBottom: "2%",
        }}
      >
        This user is unverified
      </Text>
    </View>
  );
};

export default UnverifiedUser;

const styles = StyleSheet.create({});
