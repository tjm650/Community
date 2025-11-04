import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import CalendarNotifTop from "../CalendarNotifTop";

const PostLikeView = ({ item }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const markUserNotifRead = useGlobal((state) => state.markUserNotifRead);
  const fetchUserUnreadNotifs = useGlobal(
    (state) => state.fetchUserUnreadNotifs
  );
  const PostList = useGlobal((state) => state.PostList);

  // const openPost = (props = (data) => {
  //   navigation.navigate("PostInbox", { data: data });
  // });

  const handleNotifPress = useCallback(
    async (notif) => {
      await markUserNotifRead(notif.id);

      const postNotif = await PostList.find((n) => n.id === notif.related_id);
      console.log("postNotif====>", postNotif);

      (await postNotif) && openPost(postNotif);
      await fetchUserUnreadNotifs();
    },
    [markUserNotifRead, navigation]
  );

  const openPost = (data) => {
    navigation.navigate("PostInbox", { data: data });
  };


  return (
    <TouchableOpacity
      onPress={() => handleNotifPress(item)}
      activeOpacity={0.5}
      style={{
        marginBottom: "1%",
        marginHorizontal: "1%",
        position: "relative",
        paddingBottom: 7,
        paddingHorizontal: "2%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        // backgroundColor: isLight ? "#00000020" : "#00d9ff1b",
        backgroundColor: item.is_read
          ? isLight
            ? "#00000020"
            : "#5b5b5b1b"
          : !item.is_read && isLight
          ? "#00000020"
          : "#05778b11",
        // shadowColor: isLight ? "#00000020" : "#ffffff1b",
      }}
    >
      <CalendarNotifTop
        time={item.created}
        profileimg={item.sender.profile_image}
        directory_status1={item.sender.directory_status1}
        Sender={item.description}
      />

      <View
        id="Desc-View"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: item.description ? "90%" : "100%",
          paddingHorizontal: "2%",
        }}
      >
        <View
          activeOpacity={0.5}
          style={{
            marginRight: "2%",
            overflow: "hidden",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-heart"
            size={25}
            color={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
          />
        </View>

        <View
          style={{
            maxWidth: item.description ? "90%" : "100%",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              lineHeight: 20,
            }}
            numberOfLines={2}
          >
            {item.extra_data.description} 
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostLikeView;

const styles = StyleSheet.create({});
