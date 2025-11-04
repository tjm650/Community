import React from "react";
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
import { useNavigation } from "@react-navigation/native";
import ThemeNavigations from "./ThemeNavigations";

function OptionView({ icon, option, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        gap: 25,
        alignItems: "center",
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

function DrawerOptions({}) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);


  function OpenNetworkPage(params) {
    navigation.navigate("ChannelPage");
  }

  function OpenProfileScreen(params) {
    navigation.navigate("UserProfileScreen");
  }

  return (
    <View
      style={{
        paddingBottom: "5%",
        marginBottom: "3%",
        borderBottomWidth: 0.3,
        borderBottomColor: "#606060",
        gap: 10,
      }}
    >
      <OptionView
        icon={
          <FontAwesomeIcon
            icon="user"
            size={30}
            color={isLight ? LGlobals.icon : DGlobals.text}
          />
        }
        option={"Profile"}
        onPress={OpenProfileScreen}
      />

      <OptionView
        icon={
          <FontAwesomeIcon
            icon="bookmark"
            size={30}
            color={isLight ? LGlobals.icon : DGlobals.text}
          />
        }
        option={"Bookmarks"}
      />

    
      <ThemeNavigations />
    </View>
  );
}

export default DrawerOptions;

const styles = StyleSheet.create({});
