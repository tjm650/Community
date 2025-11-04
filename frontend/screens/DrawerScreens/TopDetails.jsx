import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNavScreens } from "@/constants/DarkColor/DNavScreens";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNavScreens } from "@/constants/LightColor/LNavScreens";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import BadgeButtonNotifsCount from "../GlobalScreens/BadgeButtonNotifsCount";

function TopDetails({}) {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const appNotifList = useGlobal((state) => state.appNotifList);

  const [newMessage, setNewMessage] = useState(true);

  // Object.values(appNotifList).flat()

  const getRedNotifs = Object.values(appNotifList)
    .flat()
    .filter((item) => item.user_interacted === true);
  const redNotifs = getRedNotifs.length;
  const unredNotifs = appNotifList.length - redNotifs;

  function NewMessageBadge({}) {
    const { theme } = useGlobal();
    let isLight = theme === "light";

    return (
      <BadgeButtonNotifsCount
        top={-10}
        right={-10}
        notifCounts={unredNotifs}
        color={isLight ? LGlobals.text : DGlobals.text}
        backgroundColor={
          isLight
            ? LNavScreens.Drawer.DrawerbackgroundColor
            : DNavScreens.Drawer.DrawerbackgroundColor
        }
        borderRadius={20}
        borderColor={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
      />
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("OfficialAppNotif")}
      style={{
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        borderBottomWidth: 0,
        borderRadius: 20,
        borderBottomColor: "#606060",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        {unredNotifs !== 0 ? (
          <View>
            <NewMessageBadge
              user={user}
              color={
                isLight
                  ? LNavScreens.Drawer.OfficialViewbackgroundColor
                  : DNavScreens.Drawer.OfficialViewbackgroundColor
              }
            />
            <FontAwesomeIcon
              icon="fa-solid fa-bell"
              size={20}
              color={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
            />
          </View>
        ) : (
          <FontAwesomeIcon
            icon="fa-regular fa-bell"
            size={20}
            color={
              isLight
                ? LNavScreens.Drawer.OfficialViewbackgroundColor
                : DNavScreens.Drawer.OfficialViewbackgroundColor
            }
          />
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("OfficialAppNotif")}
        style={{
          width: "90%",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: "auto",
            paddingVertical: "5%",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontWeight: unredNotifs !== 0 ? "500" : "normal",
              color: isLight ? LGlobals.fadetext : DGlobals.fadetext,
            }}
          >
            {appNotifList[0] ? appNotifList[0].description : "Community" }
          </Text>
        </View>

        <View
          style={{
            alignSelf:"flex-start",
            paddingVertical: "0.5%",
            paddingHorizontal: "3%",
            backgroundColor:
              unredNotifs !== 0 && isLight
                ? LNavScreens.Drawer.OfficialViewbackgroundColor
                : DNavScreens.Drawer.OfficialViewbackgroundColor,
            borderColor: isLight ? LGlobals.icon : DGlobals.icon,
            borderWidth: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontWeight: unredNotifs !== 0 ? "700" : "normal",
              color: isLight ? DGlobals.text : DGlobals.text,
            }}
          >
            {appNotifList[0]? appNotifList[0].subject : "username" +
              " • "
              // appNotifList[0] ? utils.CalendarTime(appNotifList[0].created) : ""
              }
           {" "} ▶ <Text>{user.username} </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
export default TopDetails;

const styles = StyleSheet.create({});
