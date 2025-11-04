import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import ProfileImage from "../GlobalScreens/ProfileImage";

////////////////////////////////////////////// Functions ////////////////////////////////////////////////
function Options({ text, onPress, icon, add }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        paddingVertical: 10,
        borderBottomWidth: 0,
        borderColor: "#606060",
        paddingHorizontal: "5%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        width: "100%",
        gap: 15,
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {add}
        {icon}
      </Pressable>
    </TouchableOpacity>
  );
}

const HomeEmailTopView = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [openOptions, setOpenOptions] = useState(false);

  function handleConnects() {
    navigation.navigate("ConnectsScreen");
    setOpenOptions((value) => (value = false));
  }
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "3%",
        paddingTop: "3%",
        paddingBottom: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <ProfileImage />
        <Text
          style={{
            fontWeight: 800,
            fontSize: 19,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Emails
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {/* <Pressable>
          <FontAwesomeIcon
            icon="fa-solid fa-user-tie"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </Pressable> */}
        <Pressable onPress={() => setOpenOptions((value) => !value)}>
          <FontAwesomeIcon
            icon="fa-solid fa-bars"
            size={20}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </Pressable>
      </View>
      {openOptions && (
        <View
          style={{
            position: "absolute",
            height: "auto",
            width: "auto",
            top: "150%",
            right: "1%",
            paddingRight: "5%",
            backgroundColor: isLight
              ? LNotifs.header.ExpanderBackgroundColor
              : DNotifs.header.ExpanderBackgroundColor,
            zIndex: 1,
            borderRadius: 5,
            borderWidth: 0.3,
            borderColor: isLight
              ? LNotifs.header.ExpanderBorderColor
              : DNotifs.header.ExpanderBorderColor,
          }}
        >
          <Options
            text={"Connects"}
            icon={
              <FontAwesomeIcon
                icon="fa-solid fa-address-book"
                size={20}
                color={isLight ? LGlobals.text : DGlobals.icon}
              />
            }
            onPress={handleConnects}
          />
        </View>
      )}
    </View>
  );
};

export default HomeEmailTopView;

const styles = StyleSheet.create({});
