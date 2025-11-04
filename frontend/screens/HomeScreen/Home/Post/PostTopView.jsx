import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import CheckClientType from "../../../GlobalScreens/CheckClientType";
import MoreMessagePostInfor from "../../../GlobalScreens/MorePostInfor/MoreMessagePostInfor/MoreMessagePostInfor";
import RBOptionsSheet from "../../../GlobalScreens/RBSheets/RBOptionsSheet";

const PostTopView = ({ item }) => {
  const navigation = useNavigation();
  const moreInfo = useRef([]);


  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenProfile(params) {
    navigation.navigate("ProfileScreen1", item);
  }

  const handleShowOptions = () => {
    moreInfo.current.open();
  };

  return (
    <View
      id="Top View"
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        height: "auto",
        flexDirection: "row",
        backgroundColor: isLight ? "#bfe7ed58" : "#43515346",
        paddingVertical: "1%",
        paddingHorizontal: "1%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <CheckClientType
        DirectoryView={
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: "gray",
                borderRadius: 35,
                borderWidth: item.sender.profile_image ? 0 : 0.5,
                borderColor: "gray",
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={OpenProfile}
            >
              {item.sender.profile_image ? (
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: "cover",
                    alignSelf: "center",
                  }}
                  source={utils.GetImage(item.sender.profile_image)}
                />
              ) : (
                <Ionicons name="person" size={25} color="#fbfbfb98" />
              )}
            </TouchableOpacity>
 
            <Pressable
              style={{
                flexDirection: "row",
                gap: 5,
              }}
              onPress={OpenProfile}
              id="ContactName"
            >
              <Text
                style={{
                  justifyContent: "center",
                  color: isLight ? LGlobals.fadetext : DGlobals.fadetext,
                }}
              >
                {item.sender.name}
              </Text>
            </Pressable>
          </View>
        }
        directoryStatus={item.sender.directory_status1}
        verified={item.sender.verified}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          id="Time"
          style={{ color: isLight ? LGlobals.lighttext : DGlobals.lighttext }}
        >
          {/* {utils.CalendarTime(item.created)} */}
          {utils.CalendarPostTime(item.created)}
        </Text>

        <RBOptionsSheet
          GetIcon={
            <TouchableOpacity
              onPress={() => handleShowOptions()}
              style={{
                // width: 50,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: isLight ? "#43515321" : "#303030",
                paddingVertical: 2,
                paddingRight: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                flexDirection: "row",
                gap: 3,
              }}
            >
              <Entypo
                name="dots-three-vertical"
                size={15}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </TouchableOpacity>
          }
          CommmentSheet={moreInfo}
          height={"auto"}
          GetView={<MoreMessagePostInfor post={item} />}
        />
      </View>
    </View>
  );
};

export default PostTopView;

const styles = StyleSheet.create({});
