import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
import CheckClientType from "@/screens/GlobalScreens/CheckClientType";
import { useNavigation } from "@react-navigation/native";
//======================================================================================

const ForumTopDetails = ({
  item,
  profileimg,
  name,
  time,
  count_down,
  contester_username,
  directoryStatus,
  verified,
  count_down2,
  service_name,
}) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const OpenProfile = () => {
    if (item.service) {
      navigation.navigate("ProfileScreen", item);
    } else {
      navigation.navigate("ProfileScreen1", item);
    }
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
        marginVertical: "1%",
        marginHorizontal: "1%",
        paddingHorizontal: "1%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: "hidden",
      }}
    >
      <CheckClientType
        DirectoryView={
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={ count_down2 && count_down2!= 0 ? true : false} 
            onPress={OpenProfile}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              maxWidth: "90%",
            }}
          >
            <View>
              <View
                style={{
                  position: "absolute",
                  bottom: "-3",
                  right: "-5",
                  zIndex: 99,
                  backgroundColor: isLight
                    ? LGlobals.background
                    : DGlobals.background,
                  padding: "5%",
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor:count_down2  && count_down2 != 0
                      ? isLight
                        ? LGlobals.borderColorView
                        : DGlobals.borderColorView
                      :  isLight
                    ? LGlobals.borderColorView
                    : DGlobals.borderColorView,
                  
                  
                 
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-microphone-lines"
                  size={10}
                  color={
                    count_down2  && count_down2 != 0
                      ? isLight
                        ? LGlobals.bellNotifIcon
                        : DGlobals.bellNotifIcon
                      : isLight
                      ? LGlobals.icon
                      : DGlobals.icon
                  }
                />
              </View>
              {profileimg ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: isLight
                      ? LNotifs.events.notifLiveView.profileImgbackgroundColor
                      : DNotifs.events.notifLiveView.profileImgbackgroundColor,
                    borderRadius: 7,
                    // overflow: "hidden",
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
                      borderRadius: 7,
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
            </View>

            <View
              style={{
                maxWidth: "70%",
              }}
            >
              {count_down2 && count_down2 != 0 ? (
                <Text
                  numberOfLines={1}
                  style={{
                    textTransform: "capitalize",
                    color: isLight ? LGlobals.text : DGlobals.text,
                    fontWeight: 500,
                  }}
                >
                  <Text
                    style={{
                      textTransform: "capitalize",
                      color: isLight ? LGlobals.text : DGlobals.text,
                      // fontWeight: 700,
                    }}
                  >
                    {name}
                  </Text>{" "}
                  with {contester_username}
                </Text>
              ) : (
                <Text
                  numberOfLines={1}
                  style={{
                    textTransform: "capitalize",
                    color: isLight ? LGlobals.text : DGlobals.text,
                    // fontWeight: "500",
                  }}
                >
                  {service_name}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        }
        directoryStatus={directoryStatus}
        verified={verified}
      />

      {/* <TouchableOpacity
        activeOpacity={1}
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
              borderWidth: 0.3,
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
              source={profileimg}
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


      </TouchableOpacity> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
          // width: "25%",
        }}
      >
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: isLight ? "#00475d64" : "#0040487f",
            paddingHorizontal: 2,
            paddingVertical: 2,
          }}
        >
          <FontAwesomeIcon
            icon="fa-regular fa-bell"
            size={15}
            color={isLight ? "#001f29" : "#7cf0ffe7"}
          />
        </TouchableOpacity> */}

        {count_down && count_down == 0 ? (
          <Text
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            }}
          >
            {time}
          </Text>
        ) : count_down && count_down != 0 ? (
          <TouchableOpacity
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            <FontAwesomeIcon
              icon="fa-regular fa-clock"
              size={14}
              color={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
            />
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                // fontWeight:500
              }}
            >
              {count_down}
            </Text>
          </TouchableOpacity>
        ) : (
          !count_down && null
        )}

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
};

export default ForumTopDetails;

const styles = StyleSheet.create({});
