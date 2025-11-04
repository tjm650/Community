
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import useGlobal from "@/assets/core/useGlobal";
import React, { useState } from "react";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import utils from "@/assets/core/utils";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AppNotifView = ({ item, navigation }) => {
  const ConnectList = useGlobal((state) => state.ConnectList);
  const user = useGlobal((state) => state.user);
  const appNotif = useGlobal((state) => state.appNotif);
  const appNotifInteract = useGlobal((state) => state.appNotifInteract);

  const [isRead, setIsRead] = useState(false);

  async function  OpenNotif(data) {
    navigation.navigate("AppNotifInbox", data);
    appNotifInteract(user.id, data.id)
    appNotif()
    setIsRead((val) => (val = true));
  }

  // const OpenNotif = (props = (data) => {
  //   navigation.navigate("AppNotifInbox", { data: data });
  //   setIsRead((val) => (val = true));
  // });

  //   const OpenNotif = (props = (data) => {
  //     navigation.navigate("PostInbox", { data: data });
  //   });

  function userRed() {
    let val = item.interactions.some(
      (name) =>
        name.username.replace(/\s+/g, " ").trim().toLowerCase() ===
        user.username.toLowerCase()
    );
    if (val) {
      return true;
    }
  } 

  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      onPress={OpenNotif}
      activeOpacity={0.6}
      style={{
        flex: 1,
        marginBottom: "1%",
        paddingVertical: "3%",
        marginHorizontal: "3%",
        paddingHorizontal: "3%",          
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: userRed()
          ? isLight
            ? "#00000020"
            : "#5b5b5b1b"
          : isLight
          ? "#00000020"
          : "#05778b11",

        shadowColor: isLight ? "#00000020" : "#ffffff1b",
      }}
    >
      <View
        id="TopView"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "2%",
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={1}
          id="CommunityName"
          style={{
            fontSize: 15,
            fontWeight: userRed() ? "600" : "700",
            maxWidth: "65%",
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {item.subject}
        </Text>

        <View
          id="time"
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {!userRed() && (
            <View>
              <FontAwesomeIcon
                icon="bell"
                size={16}
                color={
                  isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon
                }
              />
            </View>
          )}

          <Text
            style={{
              fontWeight: userRed() ? "normal" : "600",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            {utils.CalendarTime(item.created)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            width: "95%",
            fontWeight: userRed() ? "" : "500",
            color: isLight ? LGlobals.greyText : DGlobals.greyText,
          }}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppNotifView;

const styles = StyleSheet.create({});
