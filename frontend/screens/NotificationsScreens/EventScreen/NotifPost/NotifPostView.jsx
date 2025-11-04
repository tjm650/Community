import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LNotifs } from "@/constants/LightColor/LNotifs";

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import NotifPostInteractions from "../NotifPostInteractions";
import NotifPostDetails from "./NotifPostDetails";
import NotifPostTopView from "./NotifPostTopView";

//======================================================================================

function NotifPostView({ item }) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [isOpenDescription, setIsOpenDescrition] = useState(false, item);

  const HandleShowImage = (data) => {
    navigation.navigate("ImageScreen", { data: data });
  };

  function OpenProfile1(data) {
    navigation.navigate("ProfileScreen1", data);
  }

  const OpenNotifPostInbox = (data) => {
    navigation.navigate("NotifPostInbox", { data: data });
  };

  const NotifPostCommentScreen = (data) => {
    navigation.navigate("NotifPostCommentScreen", { data: data });
  };

  return (
    <View
      style={{
        // backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        marginBottom: 5,
        position: "relative",
        marginHorizontal: "1%",
        paddingBottom: 7,
        borderBottomWidth: 0.3,
        borderColor: isLight
          ? LNotifs.events.notifPostView.borderColor
          : DNotifs.events.notifPostView.borderColor,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
      }}
    >
      <View
        style={{
          paddingBottom: "1%",
        }}
      >
        <NotifPostTopView
          time={utils.CalendarPostTime(item.created)}
          name={item.service ? item.service.username : item.sender.username}
          profileimg={
            item.service
              ? item.service.profile_image
              : item.sender.profile_image
          }
          directoryStatus={
            item.service
              ? item.service.directory_status1
              : item.sender.directory_status1
          }
          item={item}
          verified={item.service ? item.service.verified : item.sender.verified}
        />

        <NotifPostDetails
          image={item.image}
          item={item}
          description={item.description}
          sender={item.sender.username}
        />
      </View>
      <NotifPostInteractions
        NotifPostCommentScreen={NotifPostCommentScreen}
        item={item}
      />
    </View>
  );
}

export default NotifPostView;

const styles = StyleSheet.create({});
