import {
  Animated,
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

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import ProfileImage from "../GlobalScreens/ProfileImage";

const tabs = [
  {
    id: "Marketing",
    label: "Marketing",
  },

  {
    id: "Accommodation",
    label: "Accommodation",
  },
];

////////////////////////////////////////////// Functions ////////////////////////////////////////////////

const HomeCommunityTopView = ({
  height,
  transform,
  scrollX,
  scrollViewRef,
  screenWidth,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const HeaderView = () => {
    // const screenWidth = Dimensions.get("window").width;
    // const scrollX = useRef(new Animated.Value(0)).current;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          // gap: 15,
          width: "100%",
          alignItems: "center",
        }}
      >
        {tabs.map((tab, index) => {
          // Calculate scaling based on scroll position
          const inputRange = [(index - 1) * screenWidth, index * screenWidth];

          const color = scrollX.interpolate({
            inputRange,
            outputRange: [
              isLight ? LGlobals.lighttext : DGlobals.lighttext,
              isLight ? LGlobals.text : DGlobals.text,
            ],

            extrapolate: "clamp",
          });

          return (
            <View
              style={{
                alignItems: "center",
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                key={tab.id}
                // onPress={() => handleTabPress(index)}
                disabled={true}
              >
                <Text
                  style={{
                    color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                    fontWeight: 500,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </View>
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Pressable>
            <FontAwesomeIcon
              icon="fa-solid fa-shop"
              size={20}
              color={isLight ? LGlobals.fadeBlueIcon : DGlobals.fadeBlueIcon}
            />
          </Pressable>
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
          style={{
            flexDirection: "row",
            gap: 15,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <HeaderView />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeCommunityTopView;

const styles = StyleSheet.create({});
