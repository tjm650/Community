import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
import { useNavigation } from "expo-router";

function OptionView({ icon, option }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        gap: 25,
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <View>{icon}</View>
      <View>
        <Text
          style={{
            fontWeight: "700",
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 17,
          }}
        >
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const ThemeNavigations = () => {
  const navigation = useNavigation();
  const [getDarkTheme, setGetDarkTheme] = useState(true);

  ////////////////// Local States //////////////////
  const { theme, AppTheme, setTheme } = useGlobal();
  const isLight = theme === "light";

  function ChangeToDarkTheme(params) {
    setGetDarkTheme((value) => (value = true));
    getDarkTheme ? theme : theme;
    setTheme("light");
  }

  function ChangeToLightTheme(params) {
    setGetDarkTheme((value) => (value = false));
    getDarkTheme ? theme : theme;
    setTheme("dark");
    //AppTheme(theme = "dark")
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <OptionView
        icon={
          <FontAwesomeIcon
            icon="cloud-meatball"
            size={30}
            color={isLight ? LGlobals.icon : DGlobals.text}
          />
        }
        option={"Theme"}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 35,
        }}
      >
        <TouchableOpacity
          onPress={ChangeToLightTheme}
          style={{
            width: 30,
            paddingVertical: "3%",
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon="moon"
            size={15}
            color={getDarkTheme ? "#000000" : "#909090"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 30,
            paddingVertical: "3%",
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={ChangeToDarkTheme}
        >
          <FontAwesomeIcon
            icon="sun"
            size={15}
            color={getDarkTheme ? "#909090" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThemeNavigations;

const styles = StyleSheet.create({});
