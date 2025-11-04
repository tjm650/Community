import {
  StyleSheet,
  View
} from "react-native";
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

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import BlogBottomView from "./BlogBottomView";
import BlogDetailsView from "./BlogDetailsView";
import BlogTopView from "./BlogTopView";

function BlogView({ item }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const navigation = useNavigation();

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  function OnPressProfileImage(data) {
    navigation.navigate("ContactProfileScreen");
  }

  return (
    <View
      id={`${item.id}`}
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: isLight
          ? LHome.Blog.borderColor
          : DHome.Blog.borderColor,
        paddingBottom: "1%",
        marginBottom: "1%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <BlogTopView
        statusColor={"#0091ff"}
        item={item}
        OnPressProfileImage={OnPressProfileImage}
      />
      <BlogDetailsView item={item} HandleShowImage={HandleShowImage} />
      <BlogBottomView item={item} />
    </View>
  );
}

export default BlogView;

const styles = StyleSheet.create({});
