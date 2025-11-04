import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import ForumNavigation from "./ForumNavigation";
import ForumTopDetails from "./ForumTopDetails";
import LiveForumDetails from "./LiveForumDetails";

//======================================================================================
const LiveForum = ({ item }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const [countdown, setCountdown] = useState("0");

  function OpenLiveForumPage(params) {
    navigation.navigate("LiveForumPage", item);
  }

  const NotifPostCommentScreen = (data) => {
    navigation.navigate("NotifPostCommentScreen", { data: data });
  };

  let futureDate = item.extra_data ? item.extra_data.end_date : 0;

  useEffect(() => {
    let interval;
    if (futureDate) {
      interval = setInterval(
        () => utils.Countdown(futureDate, setCountdown),
        1000
      );

    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [futureDate]);

  return (
    <Pressable
      onPress={OpenLiveForumPage}
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
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
          paddingBottom: "2%",
        }}
      >
        <ForumTopDetails
          // profileimg={profileimg}
          name={item.extra_data.name}
          contester_username={item.extra_data.sender_username}
          time={utils.CalendarPostTime(item.created)}
          count_down={countdown}
          item={item}
         
          count_down2={countdown}
          service_name={item.service.username}
          profileimg={item.service.profile_image}

           directoryStatus={
            item.service
              ? item.service.directory_status1
              : item.sender.directory_status1
          }
          verified={item.service ? item.service.verified : item.sender.verified}
        />
        <LiveForumDetails 
          image={item.image}
          item={item}
          description={item.description}
          Topic={item.extra_data.topic}
        />
      </View>

      <ForumNavigation
        item={item}
        count_down={countdown}
        NotifPostCommentScreen={NotifPostCommentScreen}
        showCountDown={countdown && countdown != 0 && true}
        showMarkSuccefull={true}
      />
    </Pressable>
  );
};

export default LiveForum;

const styles = StyleSheet.create({});
