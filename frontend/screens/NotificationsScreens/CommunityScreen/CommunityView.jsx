import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import CommunityInforView from "./CommunityInforView";
import CheckClientType from "../../GlobalScreens/CheckClientType";



function CommunityView({
  duration,
  image,
  description,
  time,
  profileimg,
  name,
  item,
}) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  

  function OpenCommunity(params) {
    navigation.navigate("CommunityInbox", item);
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => OpenCommunity()}
      style={{
        /*backgroundColor: isLight
          ? LNotifs.events.notifPostView.AccountBackgroundColor
          : DNotifs.events.notifPostView.AccountBackgroundColor,*/
        marginBottom: "1%",
        position: "relative",
        paddingBottom: 7,
        paddingHorizontal: "1%",
        borderBottomWidth: 0.3,
        borderColor: isLight
          ? LNotifs.events.notifPostView.borderColor
          : DNotifs.events.notifPostView.borderColor,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <View
        style={{
          paddingBottom: "2%",
        }}
      >
        <View
          id="TopView"
          style={{
            backgroundColor: isLight ? "#00000020" : "#ffffff1b",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: "1%",
            paddingHorizontal: "2%",
            borderRadius: 13,
            marginVertical: "1%",
          }}
        >
          <CheckClientType
            DirectoryView={
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {item.service.profile_image ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: isLight
                        ? LNotifs.events.notifPostView.profileImgbackgroundColor
                        : DNotifs.events.notifPostView.profileImgbackgroundColor,
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
                      source={utils.GetImage(item.service.profile_image)}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: isLight
                        ? LNotifs.events.notifPostView.profileImgbackgroundColor
                        : DNotifs.events.notifPostView.profileImgbackgroundColor,
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
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      textTransform: "capitalize",
                      color: isLight ? LGlobals.text : DGlobals.text,
                      fontWeight: "500",
                    }}
                  >
                    {item.service.username}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            directoryStatus={item.service.directory_status1}
            verified={item.service.verified}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable>
              <FontAwesomeIcon
                icon=" fa-regular fa-bell"
                size={15}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </Pressable>
          </View>
        </View>

        <View
          id="Desc-View"
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {item.image ? (
            <View
              activeOpacity={0.5}
              style={{
                marginRight: "2%",
                borderColor: isLight
                  ? LNotifs.events.notifPostView.imageBorderColor
                  : DNotifs.events.notifPostView.imageBorderColor,
                overflow: "hidden",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-file-image"
                size={25}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </View>
          ) : (
            ""
          )}
          <View
            style={{
              maxWidth: item.image ? "90%" : "100%",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                textAlign: "justify",
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
              numberOfLines={3}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </View>
      <CommunityInforView time={item} />
    </TouchableOpacity>
  );
}

export default CommunityView;

const styles = StyleSheet.create({});
