import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/core";
import PostDetailsView from "../PostDetailsView";
import PostTopView from "../PostTopView";
import PostCommentInteraction from "./PostCommentInteraction";

const RenderComment = ({ item, isPostInbox = false, OpenCommentScreen }) => {
      const navigation = useNavigation();

      const { theme } = useGlobal();
      let isLight = theme === "light";
    
  function OpenProfile(data) {
    navigation.navigate("ProfileScreen", data);
  }

  const openPost = (data) => {
    navigation.navigate("PostInbox", { data: data });
  };

  return (
    <TouchableOpacity
      style={{
        // backgroundColor: isLight ? LGlobals.icon : DGlobals.ImageBackground,
        backgroundColor: isPostInbox
          ? "transparent"
          : isLight
          ? "#43515321"
          : "#303030",
        borderBottomWidth: isPostInbox ? 0.3 : 0,
        borderBottomColor:
          isPostInbox && isLight ? LGlobals.borderColor : DGlobals.borderColor,
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginHorizontal: "1%",
      }}
    >
      <PostTopView OpenProfile={OpenProfile} item={item} />
      <PostDetailsView item={item} openPost={openPost} />
      <PostCommentInteraction OpenCommentScreen={OpenCommentScreen} item={item} />
    </TouchableOpacity>
  );
};

export default RenderComment;

const styles = StyleSheet.create({});
