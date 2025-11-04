import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import EmptyScreen from "../GlobalScreens/EmptyScreen";
import PostCommentView from "./CalendarNotification/NotifType/PostCommentView";
import PostLikeView from "./CalendarNotification/NotifType/PostLikeView";
// import { acNotif } from "../../DammyData";
//======================================================================================
const acNotif = [];

function CalendarNotif({ item }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  switch (item.notif_type) {
    case "like":
      return <PostLikeView item={item} />;
    case "comment":
      return <PostCommentView item={item} />;
    default:
      return null;
  }
}

const CalendarMain = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const usernotifListUnread = useGlobal((state) => state.usernotifListUnread);
  const userNotifList = useGlobal((state) => state.userNotifList);
  const fetchUserUnreadNotifs = useGlobal(
    (state) => state.fetchUserUnreadNotifs
  );

  const uniqueData = Array.from(
    new Set(usernotifListUnread.map((item) => item.id))
  ).map((id) => usernotifListUnread.find((item) => item.id === id));
  // const userPostCommentNotifList = useGlobal(
  //   (state) => state.userPostCommentNotifList
  // );
  // const userPostLikeNotifList = useGlobal(
  //   (state) => state.userPostLikeNotifList
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUserUnreadNotifs();
      usernotifListUnread;
    }, 1 * 60 * 1000); // 2 minutes in milliseconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [usernotifListUnread, fetchUserUnreadNotifs]);

  // const PostLike = userPostCommentNotifList.map((p) => ({
  //   ...p,
  //   notif_type: "PostComment",
  //   created: p.created,
  // }));
  // const PostComment = userPostLikeNotifList.map((c) => ({
  //   ...c,
  //   notif_type: "PostLike",
  //   created: c.created,
  // }));

  // const Data = [...PostLike, ...PostComment].sort(
  //   (a, b) => new Date(b.created) - new Date(a.created)
  // );;
  // console.log("userNotifList---------->", Data);

  return (
    <View style={{ flex: 1, paddingTop: "2%" }}>
      {usernotifListUnread.length === 0 ? (
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-bell-slash"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          text={"No Notifications"}
          btn={false}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          borderWidth={0.5}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={usernotifListUnread}
            renderItem={({ item }) => <CalendarNotif item={item} />}
            // keyExtractor={(item) => (item.id, item.notif_type)}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}
    </View>
  );
};

export default CalendarMain;

const styles = StyleSheet.create({});
