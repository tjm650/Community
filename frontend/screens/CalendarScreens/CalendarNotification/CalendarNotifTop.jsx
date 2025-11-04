import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

function CalendarNotifTop({ time, Sender, profileimg, directory_status1 }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      id="TopView"
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: "1%",
        borderRadius: 13,
        marginVertical: "1%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        {profileimg ? (
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: isLight ? "gray" : "#586d71d8",
              borderWidth: 0,
              borderColor: isLight ? "#bfe7edd8" : "#586d71d8",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignSelf: "center",
                width: 30,
                height: 30,
              }}
              source={utils.GetImage(profileimg)}
            />
          </View>
        ) : (
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              backgroundColor: isLight ? "gray" : "#586d71d8",
              borderWidth: 0.3,
              borderColor: isLight ? "gray" : "#586d71d8",
            }}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              size={15}
              color="#d0d0d0"
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              // textTransform: "capitalize",
              maxWidth: "100%",

              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "500",
            }}
          >
            {Sender}
          </Text>

          {/* <FontAwesomeIcon
            icon="fa-solid fa-bell"
            size={14}
            color={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
          /> */}
          {directory_status1 == "Staff" && (
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              • Staff
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          }}
        >
          {}
          {utils.formatNotifTime(time)}
        </Text>
      </View>
    </View>
  );
}

export default CalendarNotifTop;

const styles = StyleSheet.create({});
