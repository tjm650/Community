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
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { default as React, useState } from "react";
import { Animated } from "react-native";
import ProfileImage from "../GlobalScreens/ProfileImage";

const HomeNotifTopView = ({
  screenWidth,
  scrollX,
  scrollViewRef,
  handleTabPress,
  UFontWeight,
  DBFontSize,
  DBFontWeight,
  UFontsize,
}) => {
  const navigation = useNavigation();
  const [openOptions, setOpenOptions] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const tabs = [
    {
      id: "Monetization",
      label: "Monetization",
      icon: "fa-regular fa-hard-drive",
      fontSize: UFontsize,
      fontWeight: UFontWeight,
      size: 20,
    },
    {
      id: "Messages",
      label: "Messages",
      icon: "fa-regular fa-envelope",
      fontSize: UFontsize,
      fontWeight: UFontWeight,
      size: 20,
    },
    {
      id: "allNotifications",
      label: "All Notifications",
      icon: "fa-regular fa-bell",
      fontSize: UFontsize,
      fontWeight: UFontWeight,
      size: 20,
    },
  ];

  const HeaderView = ({}) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 15,
          alignItems: "center",
        }}
      >
        {tabs.map((tab, index) => {
          // Calculate scaling based on scroll position
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.25, 1], // Scale up when active
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
            outputRange: ["400", "700", "400"],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [
              "transparent",
              isLight
                ? LGlobals.HomeHeader.Background
                : DGlobals.HomeHeader.Background,
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
              activeOpacity={0.8}
              key={tab.id}
              onPress={() => handleTabPress(index)}
              style={{
                // backgroundColor: backgroundColor,
                // borderColor: borderColor,
                    borderColor: borderColor,
                    // borderBottomWidth:0.3,
                paddingHorizontal: "2%",
                paddingVertical: "2%",
                borderBottomStartRadius: 100,
                borderTopStartRadius: 30,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 100,
                width: "30.33%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  alignItems: "center",
                  gap: 3,
                }}
              >
                {/* <Animated.Text
                  style={{
                    color,
                    fontSize: tab.fontSize,
                    fontWeight: tab.fontWeight,
                    transform: [{ scale }],
                  }}
                >
                  {tab.label}
                </Animated.Text> */}
                <Animated.View
                  style={{
                    transform: [{ scale }],
                    color: color,

                  }}
                >
                  <FontAwesomeIcon
                    icon={tab.icon}
                    size={15}
                    color={isLight ? LGlobals.text : DGlobals.text}
                  />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  ////////////////// Functions ///////////////////////////////////
  function Options({ text, onPress, icon }) {
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
          gap: 10,
          width: "100%",
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
        <Pressable>{icon}</Pressable>
      </TouchableOpacity>
    );
  }

  function handleConnects() {
    navigation.navigate("ConnectsScreen");
    setOpenOptions((value) => (value = false));
  }

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
          ></Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("CalendarResourses")}
            style={{
              backgroundColor: isLight
                ? LGlobals.BottomTab.active
                : DGlobals.BottomTab.active,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                /*color: isLight
                          ? LNotifs.header.smallCarlendarText
                          : DNotifs.header.smallCarlendarText,
                        backgroundColor: isLight
                          ? LNotifs.header.smallCarlendarBackgroundColor
                          : DNotifs.header.smallCarlendarBackgroundColor,**/
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {utils.DateToday()}
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={0.8}>
            <FontAwesomeIcon
              icon="fa-solid fa-user-tie"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity> */}
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

        {openOptions && (
          <View
            style={{
              position: "absolute",
              height: "auto",
              width: "auto",
              top: "150%",
              right: "1.5%",
              paddingRight: "5%",
              backgroundColor: isLight
                ? LNotifs.header.ExpanderBackgroundColor
                : DNotifs.header.ExpanderBackgroundColor,
              zIndex: 1,
              borderRadius: 5,
              borderWidth: 0,
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
            {/* <Options text={"select notifications"} />
            <Options text={"clear all notifications"} /> */}
          </View>
        )}
      </View>

      <View
        style={{
          paddingTop: "3%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <HeaderView /> */}
      </View>
    </View>
  );
};

export default HomeNotifTopView;

const styles = StyleSheet.create({});
