import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

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
import EmptyScreen from "../GlobalScreens/EmptyScreen";

const Emails = () => {
  const emaillist = null;
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {emaillist === null ? (
        <EmptyScreen
          text={"No Mails"}
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-envelope"
              size={50}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          }
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          OnPressText={"Start a email conversation"}
          borderWidth={0.5}
        />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default Emails;

const styles = StyleSheet.create({});
