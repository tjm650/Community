import React, { useLayoutEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import MainHeader from "../GlobalScreens/MainHeader";
import InternshipsScreen from "./Internships/InternshipsScreen";

const NetworkHomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          header={
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 20,
                fontWeight: "700",
                marginBottom: "1%",
              }}
            >
              Networking
            </Text>
          }
          getView={
            <FontAwesomeIcon
              icon="earth"
              size={25}
              color={isLight ? LGlobals.text : DGlobals.text}
            />
          }
        />
      ),
    });
  });
  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "0%",
      }}
    >
      <InternshipsScreen />
    </SafeAreaView>
  );
};

export default NetworkHomeScreen;

const styles = StyleSheet.create({});
