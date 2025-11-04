import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import ShareContent from "@/screens/ApplicationServices/Sharing/ShareContent";
import { Ionicons } from "@expo/vector-icons";
import StatsCount from "../../GlobalScreens/Interactions/StatsCount";

//======================================================================================

const ForumNavigation = ({
  showCountDown = true,
  showMarkSuccefull = true,
  item,
  count_down,
  NotifPostCommentScreen,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const sharing = useRef([]);

  const postLink = `aforumn/Post/${item.id}`;

  const user = useGlobal((state) => state.user);
  const notifLike = useGlobal((state) => state.notifLike);
  const notificationList = useGlobal((state) => state.notificationList);
  const notifCommentLike = useGlobal((state) => state.notifCommentLike);

  const [executeLike, setExecuteLike] = useState(false);

  const userId = user.id;
  const notifId = item.id;

  const handleShared = () => {
    sharing.current.open();
  };

  const handleLike = () => {
    if (item.service) {
      notifLike(notifId, userId, "like");
      setExecuteLike(true);

      setTimeout(() => {
        setExecuteLike(false);
        // Set loading to false after 5 minutes
      }, 1 * 60 * 1000); // 1 minutes in milliseconds
    } else {
      notifCommentLike(notifId, userId, "like");
      setExecuteLike(true);

      setTimeout(() => {
        setExecuteLike(false);
        // Set loading to false after 5 minutes
      }, 1 * 60 * 1000); // 1 minutes in milliseconds
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: "1%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {item.comments && (
        <TouchableOpacity
          disabled={count_down == 0 && true}
          onPress={() => NotifPostCommentScreen(item)}
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
          <FontAwesomeIcon
            icon="fa-regular fa-comments"
            size={20}
            color={
              count_down != 0
                ? isLight
                  ? LGlobals.lighttext
                  : DGlobals.lighttext
                : isLight
                ? "#afafafd1"
                : "#424243d1"
            }
          />
          <StatsCount count={item.comments_count ? item.comments_count : 0} />
        </TouchableOpacity>
      )}

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

      {/* <TouchableOpacity
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
        <FontAwesomeIcon
          icon="fa-regular fa-share-from-square"
          size={14}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
      </TouchableOpacity> */}

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
        postLink={postLink}
      />

      {showMarkSuccefull && (
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
            flexDirection: "row",
            gap: 3,
          }}
        >
          <FontAwesomeIcon
            icon="fa-regular fa-circle-check"
            size={14}
            color={isLight ? LGlobals.icon : DGlobals.icon}
            // secondaryColor="white"
          />
        </TouchableOpacity>
      )}

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
          flexDirection: "row",
          gap: 3,
        }}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chart-simple"
          size={12}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
        <StatsCount count={item.total_interactions_count} />
      </TouchableOpacity>
    </View>
  );
};

export default ForumNavigation;

const styles = StyleSheet.create({});
