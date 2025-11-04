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

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import CheckClientType from "@/screens/GlobalScreens/CheckClientType";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const LiveForumPageHeader = ({
  count_down2,
  directoryStatus,
  verified,
  contester,
  name,
  profileimg,
  item,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const OpenProfile = () => {
    navigation.navigate("ProfileScreen1", item);
  };

  return (
    <View
      style={{
        paddingHorizontal: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: "1%",
          paddingVertical: "1%",
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: isLight
            ? LNotifs.events.notifPostView.accountInforBackgroundColor
            : DNotifs.events.notifPostView.accountInforBackgroundColor,
        }}
      >
        <CheckClientType
          DirectoryView={
            <TouchableOpacity
              onPress={OpenProfile}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
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
                    borderRadius: 50,
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
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-user"
                    size={15}
                    color="#d0d0d0"
                  />
                </View>
              )}

              <View
                style={{
                  maxWidth: "90%",
                }}
              >
                {count_down2 && count_down2 != 0 ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      textTransform: "capitalize",
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontWeight: "500",
                    }}
                  >
                    {contester}
                  </Text>
                ) : (
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
                    with {contester}
                  </Text>
                )}
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
            marginRight: "0%",
          }}
        >
          {count_down2 && count_down2 != 0 && (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: isLight
                  ? "rgba(246, 129, 129, 0.2)"
                  : "rgba(246, 129, 129, 0.1)",
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                }}
              >
                Live
              </Text>
              <FontAwesomeIcon
                icon="fa-solid fa-clock"
                size={14}
                color={
                  isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon
                }
              />
            </TouchableOpacity>
          )}

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
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: isLight ? "#001f29" : "#7cf0ffe7",
            }}
          >
            Trending
          </Text>
          <FontAwesomeIcon
            icon="fa-regular fa-bell"
            size={15}
            color={isLight ? "#001f29" : "red"}
          />
        </TouchableOpacity> */}

          <TouchableOpacity>
            <FontAwesomeIcon
              icon="fa-solid fa-ellipsis-vertical"
              size={15}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LiveForumPageHeader;

const styles = StyleSheet.create({});
