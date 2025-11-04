import { StyleSheet, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DHome } from "@/constants/DarkColor/DHome";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LHome } from "@/constants/LightColor/LHome";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import PostBottomView from "./PostBottomView";
import PostDetailsView from "./PostDetailsView";
import PostTopView from "./PostTopView";

function PostView({ item }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const fetchPostComments = useGlobal((state) => state.fetchPostComments);
  const commentInteraction = useGlobal((state) => state.commentInteraction);
  const postInteraction = useGlobal((state) => state.postInteraction);

  const userId = user.id;
  const postId = item.id;

  function OpenProfile(data) {
    navigation.navigate("ProfileScreen", data);
  }

  const openPost = (data) => {
    navigation.navigate("PostInbox", { data: data });
    fetchPostComments(item.id)
  };

  const OpenCommentScreen = (data) => {
    navigation.navigate("PostCommentScreen", { data: data });
  };

  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.3,
        borderBottomColor: isLight
          ? LHome.Post.borderColor
          : DHome.Post.borderColor,
        paddingBottom: "2%",
        marginBottom: "1%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <PostTopView item={item} />
      <PostDetailsView item={item} openPost={openPost} />
      <PostBottomView OpenCommentScreen={OpenCommentScreen} item={item} />
    </View>
  );
}

export default PostView;

const styles = StyleSheet.create({});
