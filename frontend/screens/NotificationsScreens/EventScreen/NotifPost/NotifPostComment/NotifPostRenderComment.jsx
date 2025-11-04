import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import PostDetailsView from "@/screens/HomeScreen/Home/Post/PostDetailsView";
import PostTopView from "@/screens/HomeScreen/Home/Post/PostTopView";
import { useNavigation } from "@react-navigation/core";
import NotifPostInteractions from "../../NotifPostInteractions";

const NotifPostRenderComment = ({
  isPostInbox = false,
  NotifPostCommentScreen,
  item,
}) => {
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
      activeOpacity={0.95}
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
      {/* <View
        style={{ 
          paddingBottom: "1%",
        }}
      >
        <NotifPostTopView
          time={utils.CalendarTime(item.created)}
          name={item.sender.name}
          profileimg={item.sender.profile_image}
          directoryStatus={item.sender.directory_status1}
          item={item}
          verified={item.sender.verified}
        />

        <NotifPostDetails
          image={item.image}
          item={item}
          description={item.description}
          sender={item.sender.username}
        />
      </View> */}
      <PostTopView OpenProfile={OpenProfile} item={item} />
      <PostDetailsView item={item} openPost={openPost} />
      <NotifPostInteractions
        NotifPostCommentScreen={NotifPostCommentScreen}
        item={item}
      />
    </TouchableOpacity>
  );
};

export default NotifPostRenderComment;

const styles = StyleSheet.create({});
