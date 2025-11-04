import { StyleSheet, TouchableOpacity, View } from "react-native";

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
import React from "react";
import { Animated, Text } from "react-native";
import ProfileImage from "../GlobalScreens/ProfileImage";
//<FontAwesomeIcon icon="fa-solid fa-gift"  size={30} color="#057d8c" />

const HomeTopView = ({
  height,
  transform,
  UFontWeight,
  DBFontSize,
  DBFontWeight,
  UFontsize,
  scrollX,
  scrollViewRef,
  screenWidth,
}) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const tabs = [
    {
      id: "Explore",
      label: "Explore",
      fontSize: UFontsize,
      fontWeight: UFontWeight,
    },

    {
      id: "Updates",
      label: "Updates",
      fontSize: UFontsize,
      fontWeight: UFontWeight,
    },

  ];

  const handleTabPress = (index) => {
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const HeaderView = ({}) => {
    return (
      <View style={{ flexDirection: "row",  alignItems: "center" }}>
        {tabs.map((tab, index) => {
          // Calculate scaling based on scroll position
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.05, 1], // Scale up when active
            extrapolate: "clamp",
          });

          const color = scrollX.interpolate({
            inputRange,
            outputRange: [
              isLight ? LGlobals.lighttext : DGlobals.lighttext,
              isLight ? LGlobals.text : DGlobals.text,
              isLight ? LGlobals.lighttext : DGlobals.lighttext,
            ],

            extrapolate: "clamp",
          });

          const fontWeight = scrollX.interpolate({
            inputRange,
            outputRange: ["700", "800", "700"],

            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "transparent",
              "transparent",
              // isLight
              //   ? LGlobals.HomeHeader.Background
              //   : DGlobals.HomeHeader.Background,
              "transparent",
            ],

            extrapolate: "clamp",
          });

          const borderColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "transparent",
              isLight ? LGlobals.borderColorView : DGlobals.borderColorView,
              "transparent",
            ],

            extrapolate: "clamp",
          });

          const borderWidth = scrollX.interpolate({
            inputRange,
            outputRange: [0, 0.3, 0],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={tab.id}
              // onPress={() => handleTabPress(index)}
              disabled={true}
              style={{
                backgroundColor: backgroundColor,
                // borderColor: borderColor,
                // borderWidth: borderWidth,
                paddingHorizontal: "3%",
                paddingVertical: "0.5%",
                borderBottomStartRadius: 30,
                borderTopStartRadius: 30,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale }],
              }}
            >
              <Animated.Text
                style={{
                  color,
                  fontSize: tab.fontSize,
                  fontWeight: tab.fontWeight,
                  transform: [{ scale }],
                }}
              >
                {tab.label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        position: "absolute",
        width: "100%",
        left: 0,
        paddingTop: "3%",
        paddingBottom: "1%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        height: height,
      }}
    >
      <Animated.View
        id="HomeScreenTopView"
        style={{
          paddingHorizontal: "3%",
          // paddingBottom:"2%",
          alignItems: "center",
          flexDirection: "row",
          transform: transform,

          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: "35%",
          }}
        >
          <ProfileImage />
        </View>
        <View id="ImageView">
          {/* <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "900",
              fontSize: 25,
            }}
          >
            ©
          </Text> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity activeOpacity={0.8}>
            <FontAwesomeIcon
              icon="fa-solid fa-shop"
              size={20}
              color={isLight ? LGlobals.text : DGlobals.text}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <FontAwesomeIcon
              icon="fa-solid fa-gift"
              size={20}
              color={isLight ? LGlobals.text : DGlobals.text}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        id="TopView"
        style={{
          borderTopColor: "#333",
          paddingHorizontal: "5%",
          // borderTopWidth: 1,
          // marginTop: "2%",
          // borderTopColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          height: height,
          transform: transform,
          justifyContent: "center",
        }}
      >
        <View
          id="Daily-Blog - Updates"
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <HeaderView
            nativeID={"Daily-Blog"}
            caption={"Daily-Blog"}
            DBFontSize={DBFontSize}
            DBFontWeight={DBFontWeight}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeTopView;

const styles = StyleSheet.create({});
