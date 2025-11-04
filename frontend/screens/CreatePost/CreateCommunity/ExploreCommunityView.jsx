import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
//=========

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import CheckClientType from "../../GlobalScreens/CheckClientType";

const ExploreCommunityView = ({ item }) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenCommunity(params) {
    navigation.navigate("CommunityInbox", item);
  }

  const profileimg = item.profileimg;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => OpenCommunity()}
      style={{
        /*backgroundColor: isLight
        ? LNotifs.events.notifPostView.AccountBackgroundColor
        : DNotifs.events.notifPostView.AccountBackgroundColor,*/
        position: "relative",
        marginBottom: "1%",
        paddingBottom: "2%",
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
                {item.profile_image ? (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: isLight
                        ? LNotifs.events.notifPostView.profileImgbackgroundColor
                        : DNotifs.events.notifPostView
                            .profileImgbackgroundColor,
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
                      source={utils.GetImage(item.profile_image)}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: isLight
                        ? LNotifs.events.notifPostView.profileImgbackgroundColor
                        : DNotifs.events.notifPostView
                            .profileImgbackgroundColor,
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
                    {item.username}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            directoryStatus={item.directory_status1}
          />
        </View>

        <View
          id="Bio-View"
          style={{
            paddingHorizontal: "2%",
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
            numberOfLines={3}
          >
            {item.bio}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExploreCommunityView;

const styles = StyleSheet.create({});
