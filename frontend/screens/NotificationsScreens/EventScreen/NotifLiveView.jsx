import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InforView from "./InforView";

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
import { TouchableOpacity } from "react-native";
import DirectoryDetails from "./DirectoryDetails";
import NotifLiveDetails from "./NotifLiveDetails";

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
  UpdateType,
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
        <DirectoryDetails
          profileimg={profileimg}
          name={name}
          directoryStatus={directoryStatus}
          UpdateType={UpdateType}
          item={item}
          time={time}
        />

        <NotifLiveDetails
          image={image}
          title={title}
          venue={venue}
          date={date}
          duration={duration}
        />

        <View
          id="BottomView"
          style={{
            paddingHorizontal: "2%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            paddingVertical: "1%",
            borderRadius: 7,
            borderColor: isLight
              ? LNotifs.events.notifLiveView.messageBorderColor
              : DNotifs.events.notifLiveView.messageBorderColor,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsOpenDescrition((value) => !value)}
            activeOpacity={0.6}
            style={{}}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
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
                  marginTop: 5,
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
                  }}
                >
                  {sender}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <InforView time={time} />
    </View>
  );
}

export default NotifLiveView;

const styles = StyleSheet.create({});
