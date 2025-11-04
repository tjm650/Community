import React from "react";
import { Pressable, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CommunityBadgeIcon({ backgroundColor }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <Pressable
      style={{
        height: 17,
        width: 17,
        backgroundColor: "transparent",
        borderRadius: 4,
        borderWidth: 0,
        /*borderColor: isLight
          ? LGlobals.badge.borderColor
          : DGlobals.badge.borderColor,*/
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name="check-decagram"
        size={15}
        color={backgroundColor}
      />
    </Pressable>
  );
}

function ClientBadgeIcon(params) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return "";
}

export default function CheckClientType({
  clientType,
  directoryStatus,
  DirectoryView,
  width,
  verified,
}) {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  function GetStatus({ directoryStatus }) {
    return (
      <View>
        {directoryStatus === "Community" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={
              isLight
                ? LGlobals.badge.badgeColor.community
                : DGlobals.badge.badgeColor.community
            }
          />
        ) : directoryStatus === "Service" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={   
              isLight
                ? LGlobals.badge.badgeColor.service
                : DGlobals.badge.badgeColor.service
            }
          />
        ) : directoryStatus === "Organization" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={
              isLight
                ? LGlobals.badge.badgeColor.organization
                : DGlobals.badge.badgeColor.organization
            }
          />
        ) : directoryStatus === "Bloger" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={
              isLight
                ? LGlobals.badge.badgeColor.blog
                : DGlobals.badge.badgeColor.blog
            }
          />
        ) : directoryStatus === "Staff" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={
              isLight
                ? LGlobals.badge.badgeColor.staff
                : DGlobals.badge.badgeColor.staff
            }
          />
        ) : directoryStatus === "Student" && verified ? (
          <CommunityBadgeIcon
            backgroundColor={
              isLight
                ? LGlobals.badge.badgeColor.student
                : DGlobals.badge.badgeColor.student
            }
          />
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        width: width,
      }}
    >
      {DirectoryView}

      <GetStatus directoryStatus={directoryStatus} />
    </View>
  );
}
