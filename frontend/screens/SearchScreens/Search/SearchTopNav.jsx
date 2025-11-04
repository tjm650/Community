import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { Animated } from "react-native";

const tabs = [
  {
    id: "Posts",
    label: "Posts",
  },

  {
    id: "Services",
    label: "Services",
  },
  {
    id: "Blogs",
    label: "Blogs",
  },
  {
    id: "Connects",
    label: "Connects",
  },
  {
    id: "Marketing",
    label: "Marketing",
  },
];

const SearchTopNav = ({ DBFontSize, DBFontWeight, scrollX, screenWidth }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const HeaderView = ({}) => {
    return (
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        {tabs.map((tab, index) => {
          // Calculate scaling based on scroll position
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.025, 1], // Scale up when active
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
      id="TopView"
      style={{
        borderTopColor: "#333",
        paddingHorizontal: "5%",
        // borderTopWidth: 1,
        // marginTop: "2%",
        // borderTopColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        justifyContent: "center",
      }}
    >
      <ScrollView
        horizontal
        style={{
          gap: 15,
        }}
      >
        <HeaderView />
      </ScrollView>
    </Animated.View>
  );
};

export default SearchTopNav;

const styles = StyleSheet.create({});
