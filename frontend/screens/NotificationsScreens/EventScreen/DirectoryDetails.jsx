import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import CheckClientType from "../../GlobalScreens/CheckClientType";

function DirectoryDetails({
  profileimg,
  name,
  directoryStatus,
  item,
  time,
  verified,
}) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const moreInfo = useRef([]);

  const OpenProfile = () => {
    if (item.service) {
      navigation.navigate("ProfileScreen", item);
    } else {
      navigation.navigate("ProfileScreen1", item);
    }
  };


  const handleShowOptions = () => {
    moreInfo.current.open();
  };

  return (
    <View
      style={{
        backgroundColor: isLight
          ? LNotifs.events.notifPostView.accountInforBackgroundColor
          : DNotifs.events.notifPostView.accountInforBackgroundColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: "1%",
        marginTop: "1%",
        //marginHorizontal: "1%",
        paddingHorizontal: "1%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        overflow: "hidden",
      }}
    >
      <CheckClientType
        DirectoryView={
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={OpenProfile}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {profileimg ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: isLight
                    ? LNotifs.events.notifLiveView.profileImgbackgroundColor
                    : DNotifs.events.notifLiveView.profileImgbackgroundColor,
                  borderRadius: 7,
                  overflow: "hidden",
                  // borderWidth: 0.3,
                }}
              >
                <Image
                  style={{
                    resizeMode: "cover",
                    justifyContent: "center",
                    alignSelf: "center",
                    width: 30,
                    height: 30,
                  }}
                  source={utils.GetImage(profileimg)}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: isLight
                    ? LNotifs.events.notifLiveView.profileImgbackgroundColor
                    : DNotifs.events.notifLiveView.profileImgbackgroundColor,
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-group"
                  size={15}
                  color="#d0d0d0"
                />
              </View>
            )}

            <View style={{
                maxWidth: "70%",

            }}>
              <Text
                numberOfLines={1}
                style={{
                  textTransform: "capitalize",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  // fontWeight: "500",
                }}
              >
                {name} 
              </Text>
            </View>
          </TouchableOpacity>
        }
        directoryStatus={directoryStatus}
        verified={verified}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          }}
        >
          {time}
        </Text>
        <TouchableOpacity>
          <FontAwesomeIcon
            icon="fa-solid fa-ellipsis-vertical"
            size={15}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DirectoryDetails;

const styles = StyleSheet.create({});
