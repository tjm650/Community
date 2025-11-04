import { StyleSheet, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useRef, useState } from "react";
import ShareContent from "../../../../ApplicationServices/Sharing/ShareContent";
import StatsCount from "../../../../GlobalScreens/Interactions/StatsCount";

const PostCommentInteraction = ({ item, OpenCommentScreen }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const sharing = useRef([]);

  const user = useGlobal((state) => state.user);
  const commentLike = useGlobal((state) => state.commentLike);
  const [executeLike, setExecuteLike] = useState(false);

  const userId = user.id;
  const postCommentsId = item.id;

  const postCommentLink = `apost/Post/${item.id}`;

  const handleCommentLike = () => {
    commentLike(postCommentsId, userId, "like");
    setExecuteLike(true);

    setTimeout(() => {
      setExecuteLike(false);
      // Set loading to false after 5 minutes
    }, 1 * 60 * 1000); // 1 minutes in milliseconds
  };

  const handleShared = () => {
    sharing.current.open();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      {item.comments && (
        <TouchableOpacity
          onPress={() => OpenCommentScreen(item)}
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
            color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
          />
          <StatsCount count={item.comments_count ? item.comments_count : 0} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => handleCommentLike()}
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
          icon="fa-regular fa-share-from-square"
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
        postLink={postCommentLink}
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

export default PostCommentInteraction;

const styles = StyleSheet.create({});
