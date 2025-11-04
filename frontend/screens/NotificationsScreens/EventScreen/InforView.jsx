import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import ShareContent from "../../ApplicationServices/Sharing/ShareContent";
import StatsCount from "../../GlobalScreens/Interactions/StatsCount";
import UserComments from "../../GlobalScreens/RBSheets/UserComments";

function InforView({ item, time, NotifPostCommentScreen  }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const sharing = useRef([]);

  //console.log("Likes==>", item.likes);
  const user = useGlobal((state) => state.user);
  const notifLikes = useGlobal((state) => state.notifLikes);
  const notifList = useGlobal((state) => state.notifList);
  const LikeNotif = useGlobal((state) => state.LikeNotif);
  const notifLike = useGlobal((state) => state.notifLike);
  const notificationList = useGlobal((state) => state.notificationList);

  const [likes, setLikes] = useState(0);
  const [executeLike, setExecuteLike] = useState(false);

  const userId = user.id;
  const notifId = item.id;
  const notifLink = `anotif/Notif/${item.id}`;

  const handleShared = () => {
    sharing.current.open();
  };

  const handleLike = () => {
    notifLike(notifId, userId, "like");
    setExecuteLike(true);

    setTimeout(() => {
      setExecuteLike(false);
      // Set loading to false after 5 minutes
    }, 1 * 60 * 1000); // 1 minutes in milliseconds
  };

  return (
    <View
      style={{
        paddingHorizontal: "1%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1,
      }}
    >
      {<UserComments StatsCountView={<StatsCount />} height={"auto"} />}







      

      <TouchableOpacity
        onPress={() => handleLike()}
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: isLight ? "#43515321" : "#303030",
          paddingVertical: 2,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <FontAwesomeIcon
          icon={`fa-${
            executeLike
              ? item.user_liked
                ? "regular"
                : "solid"
              : item.user_liked
              ? "solid"
              : "regular"
          } fa-heart`}
          size={14}
          color={
            executeLike
              ? item.user_liked
                ? isLight
                  ? LGlobals.lighttext
                  : DGlobals.lighttext
                : isLight
                ? LGlobals.bluetext
                : DGlobals.bluetext
              : item.user_liked
              ? isLight
                ? LGlobals.bluetext
                : DGlobals.bluetext
              : isLight
              ? LGlobals.lighttext
              : DGlobals.lighttext
          }
        />
        <StatsCount
          count={
            executeLike
              ? item.user_liked
                ? item.likes_count - 1
                : item.likes_count + 1
              : item.likes_count
          }
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: isLight ? "#43515321" : "#303030",
          paddingVertical: 2,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-share"
          size={14}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
      </TouchableOpacity>

      <ShareContent
        refRBSheet={sharing}
        GetIcon={
          <TouchableOpacity
            onPress={() => handleShared()}
            style={{
              width: 50,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: isLight ? "#43515321" : "#303030",
              paddingVertical: 2,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              flexDirection: "row",
              gap: 3,
            }}
          >
            <Ionicons
              name="share-social"
              size={14}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </TouchableOpacity>
        }
        postLink={notifLink}
      />

      <TouchableOpacity
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: isLight ? "#43515321" : "#303030",
          paddingVertical: 2,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chart-simple"
          size={12}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
        <StatsCount count={235} />
      </TouchableOpacity>
    </View>
  );
}

export default InforView;

const styles = StyleSheet.create({});
