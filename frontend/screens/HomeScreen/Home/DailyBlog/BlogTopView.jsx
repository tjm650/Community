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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import CheckClientType from "../../../GlobalScreens/CheckClientType";

const BlogTopView = ({ item, OnPressProfileImage, statusColor }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen", item);
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1%",
        backgroundColor: isLight
          ? LNotifs.events.notifPostView.accountInforBackgroundColor
          : DNotifs.events.notifPostView.accountInforBackgroundColor,
        paddingVertical: "1%",
        paddingHorizontal: "2%",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
      }}
    >
      <CheckClientType
        DirectoryView={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //width: "65%",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={OpenProfile}
              style={{
                width: 25,
                height: 25,
                backgroundColor: isLight
                  ? LNotifs.events.notifPostView.profileImgbackgroundColor
                  : DNotifs.events.notifPostView.profileImgbackgroundColor,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: "rgba(255, 255, 255, 0)",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "2%",
                overflow: "hidden",
              }}
            >
              {item.service.profile_image ? (
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: "center",
                    alignSelf: "center",
                  }}
                  source={utils.GetImage(item.service.profile_image)}
                />
              ) : (
                <FontAwesomeIcon icon="industry" size={20} color="#fbfbfb98" />
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  // fontWeight: "600",
                  justifyContent: "center",
                  alignItems: "center",
                  color: isLight ? LGlobals.text : DGlobals.text,
                }}
              >
                {item.service.username}
              </Text>
            </View>
          </View>
        }
        directoryStatus={item.service.directory_status1}
        verified={item.service.verified}
      />
      
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Text
          numberOfLines={1}
          id="Time"
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {/* {utils.CalendarTime(item.created)} */}
          {utils.CalendarPostTime(item.created)}
        </Text>
      </View>
    </View>
  );
};

export default BlogTopView;

const styles = StyleSheet.create({});
