import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//====================================================================================

import useGlobal from "@/assets/core/useGlobal";

const NotifTopIcons = ({ sheet }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const refRBSheet = useRef([]);
  const navigation = useNavigation();

  const user = useGlobal((state) => state.user);

  const [backgroundColor, setBackgroundColor] = useState(
    isLight ? LGlobals.icon : DGlobals.text
  );

  function RandomColorGeneration() {
    const BrightColor = 256;
    const randomColor = `rgb(${Math.floor(Math.random() * BrightColor)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)})`;

    console.log(randomColor);
    setBackgroundColor(randomColor);
  }

  // rgb(191, 141, 208);

  function Icon({ IconType, icon, OnPress }) {
    const { theme } = useGlobal();
    let isLight = theme === "light";
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          gap: 5,
          maxWidth: "30%",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={OnPress}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </TouchableOpacity>

        <Text
          numberOfLines={2}
          style={{
            fontSize: 12,
            fontWeight: 700,
            width: "100%",
            color: isLight ? LGlobals.text : DGlobals.text,
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {IconType}
        </Text>
      </View>
    );
  }

  const OpenIcons = () => {
    refRBSheet.current.open();
    RandomColorGeneration();
  };

  const CloseIcons = () => {
    refRBSheet.current.close();
    sheet.current.close();
  };

  function OpenCreate(data) {
    navigation.navigate("Create");
  }

  function OpenCreateLiveForum(data) {
    navigation.navigate("CreateLiveForum");
  }

  function OpenExploreCommunities(data) {
    navigation.navigate("ExploreCommunities");
  }
  function OpenCreateEvent(data) {
    navigation.navigate("CreateEvent");
  }

  function OpenCreatePoll(data) {
    navigation.navigate("CreatePoll");
  }

  return (
    <View>
      <View id="OpenIcons" style={{}}>
        <TouchableOpacity
          onPress={() => OpenIcons()}
          activeOpacity={0.5}
          style={{
             height: 56,
          width: 56,
          borderRadius: 28,
          backgroundColor: isLight
            ? 'rgba(0,0,0,0.05)'
            : 'rgba(255,255,255,0.1)',
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
          transform: [{ scale: 1 }],
          }}
        >
          <FontAwesomeIcon
            icon={"fa-dice"}
            size={25}
            color={isLight ? LGlobals.icon : "#fff"}
          />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={{
            fontWeight: "700",
            color: isLight ? LGlobals.text : DGlobals.text,
            textAlign: "center",
          }}
        >
          Start
        </Text>
      </View>

      <RBSheet
        ref={refRBSheet}
        openDuration={2000}
        closeDuration={2000}
        customStyles={{
          wrapper: {
            height: "100%",
            backgroundColor: isLight ? "#d0d0d0e4" : "#3d4343f3",
            alignItems: "center",
          },
          container: {
            height: "90%",
            width: "100%",
            alignSelf: "center",
            borderTopRightRadius: 13,
            borderTopLeftRadius: 13,
            alignItems: "center",
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },
        }}
        customModalProps={{
          animationType: "fade",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}
      >
        <Pressable
          onPress={() => CloseIcons()}
          style={{
            flex: 1,
            paddingHorizontal: "5%",
            paddingVertical: "5%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : "#fff",
              fontSize: 25,
              marginBottom: "10%",
            }}
          >
            Get Started
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 40,
              justifyContent: "center",
              paddingHorizontal: "10%",
            }}
          >
            <Icon
              OnPress={OpenCreateLiveForum}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-chart-column"
                  size={25}
                  // color={backgroundColor}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Forum"}
            />

            <Icon
              OnPress={OpenCreateEvent}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-newspaper"
                  size={25}
                  // color={backgroundColor}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Event"}
            />

            {/* <Icon
              // OnPress={OpenCreateEvent}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-leaf"
                  size={25}
                  // color={backgroundColor}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Post"}
            />

            <Icon
              // OnPress={OpenCreateEvent}
              icon={
                <MaterialIcons
                  name="add-home-work"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
                // <FontAwesomeIcon
                //   icon="add-home-work"
                //   size={25}
                //   // color={backgroundColor}
                // />
              }
              IconType={"Blog"}
            />

            <Icon
              // OnPress={OpenCreateEvent}
              icon={
                <FontAwesomeIcon
                  icon="envelopes-bulk"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Update"}
            /> */}

            {/* <Icon
              // OnPress={OpenExploreCommunities}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-dice-d20"
                  size={25}
                  // color={backgroundColor}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Community"}
            /> */}

            {user.market_agreement && (
              <Icon
                // OnPress={OpenExploreCommunities}
                icon={
                  <FontAwesomeIcon
                    icon="fa-solid fa-store"
                    size={25}
                    // color={backgroundColor}
                    color={isLight ? LGlobals.icon : DGlobals.text}
                  />
                }
                IconType={"Business"}
              />
            )}

            <Icon
              IconType={"Poll"}
              icon={
                <FontAwesomeIcon
                  icon="square-poll-vertical"
                  size={22}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              OnPress={OpenCreatePoll}
            />

            <Icon
              OnPress={OpenCreate}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-plus"
                  size={25}
                  // color={backgroundColor}
                  // color={backgroundColor}
                  color={isLight ? LGlobals.icon : DGlobals.text}
                />
              }
              IconType={"Start"}
            />
          </View>
        </Pressable>
      </RBSheet>
    </View>
  );
};

export default NotifTopIcons;

const styles = StyleSheet.create({});
