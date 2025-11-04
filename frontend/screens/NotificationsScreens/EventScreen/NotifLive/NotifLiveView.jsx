import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

import useGlobal from "@/assets/common/core/useGlobal";
import { TouchableOpacity } from "react-native";
import utils from "@/assets/core/utils";
import DirectoryDetails from "../DirectoryDetails";

//======================================================================================

function NotifLiveView({
  duration,
  image,
  description,
  time,
  profileimg,
  name,
  venue,
  date,
  title,
  directoryStatus,
  extra_data,
  item,
  sender,
}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [isOpenDescription, setIsOpenDescrition] = useState(false, item);

  return (
    <View
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
      <DirectoryDetails


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

      <View
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          paddingBottom: "2%",
          borderColor: isLight
            ? LNotifs.events.notifLiveView.borderColor
            : DNotifs.events.notifLiveView.borderColor,
          overflow: "hidden",
        }}
      >
        {/* Event Image */}
        {image && (
          <View style={{ position: "relative" }}>
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
              }}
              source={utils.GetImage(image)}
            />
            {/* Category Tag
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#7dd87d",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Sports
              </Text>
            </View> */}
          </View>
        )}

        {/* Event Title */}
        <View style={{ paddingHorizontal: "4%", paddingTop: "4%" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: isLight ? LGlobals.text : DGlobals.text,
              marginBottom: 10,
            }}
          >
            {extra_data.title}
          </Text>
        </View>

        {/* Event Details with Icons */}
        <View style={{ paddingHorizontal: "4%", paddingVertical: "2%" }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
              }}
            >
              {extra_data.date}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Ionicons
              name="time-outline"
              size={16}
              color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
              }}
            >
              {extra_data.duration}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Ionicons
              name="location-outline"
              size={16}
              color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
              }}
            >
              {extra_data.venue}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View
          style={{
            paddingHorizontal: "4%",
            paddingVertical: "2%",
          }}
        >
          <TouchableOpacity
            onPress={() => setIsOpenDescrition((value) => !value)}
            activeOpacity={0.6}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 14,
                lineHeight: 20,
              }}
              numberOfLines={isOpenDescription ? 99 : 3}
            >
              {description}
            </Text>
            {isOpenDescription && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-shield"
                  size={14}
                  color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                />
                <Text
                  style={{
                    color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  {sender}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default NotifLiveView;

const styles = StyleSheet.create({});
