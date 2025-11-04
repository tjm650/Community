import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ProfileImage from "../GlobalScreens/ProfileImage";

const HomeMonetisationHeader = () => {
  const navigation = useNavigation();
  const [openOptions, setOpenOptions] = useState(false);
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        paddingHorizontal: "3%",
        paddingTop: "3%",
        paddingBottom: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
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
            Monetization
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
          <TouchableOpacity activeOpacity={0.8}>
            <FontAwesomeIcon
              icon="fa-solid fa-sack-dollar"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOpenOptions((value) => !value)}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeMonetisationHeader;

const styles = StyleSheet.create({});


