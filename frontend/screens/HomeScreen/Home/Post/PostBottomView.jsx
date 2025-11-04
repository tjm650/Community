import { StyleSheet, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import PostInteractions from "./PostInteractions";

const PostBottomView = ({ item, OpenCommentScreen }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%",
        marginTop: "0%",
        flex: 1,

      }}
    >
     <PostInteractions OpenCommentScreen={OpenCommentScreen} item={item}/>
    </View>
  );
};

export default PostBottomView;

const styles = StyleSheet.create({});
