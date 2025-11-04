import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DRBSheet } from "@/constants/DarkColor/DRBSheet";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LRBSheet } from "@/constants/LightColor/LRBSheet";

import useGlobal from "@/assets/common/core/useGlobal";
import BadgePlus from "../../GlobalScreens/BadgePlus";

function Icon({ IconType, icon, OnPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={OnPress}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </TouchableOpacity>

      <Text
        numberOfLines={2}
        style={{
          textAlign: "center",
          fontSize: 10,
          width: "100%",
          color: isLight ? LGlobals.text : DGlobals.text,
        }}
      >
        {IconType}
      </Text>
    </View>
  );
}

const CalendarTopIcons = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const refRBSheet = useRef([]);
  const navigation = useNavigation();
  const OpenIcons = (data) => {
    refRBSheet.current.open();
  };

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 100,
        bottom: Dimensions.get("window").height * 0.1,
        right: Dimensions.get("window").width * 0.05,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        id="OpenIcons"
        style={{
          height: 50,
          width: 50,
          backgroundColor: isLight
            ? LRBSheet.createPost.iconColor
            : DRBSheet.createPost.iconColor,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13,
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 0.3,
          borderColor: isLight
            ? LRBSheet.createPost.iconBorder
            : DRBSheet.createPost.iconBorder,
          paddingRight: "7%",
        }}
        onPress={() => OpenIcons(null)}
      >
        <View>
          <BadgePlus height={14} width={14} color="#fff" />
          <FontAwesomeIcon
            icon="fa-solid fa-file-invoice"
            size={25}
            color="#fff"
          />
        </View>
      </Pressable>

      <RBSheet
        ref={refRBSheet}
        customStyles={{
          container: {
            height: "auto",
            width: "100%",
            alignSelf: "center",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            borderWidth: 1,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <View
          style={{
            paddingHorizontal: "5%",
            paddingVertical: "5%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 30,
              justifyContent: "space-between",
            }}
          >
            <Icon
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file-image"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              }
              IconType={"Upload"}
            />
            <Icon
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file-pdf"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              }
              IconType={"Pdf"}
            />
            <Icon
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file-invoice"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              }
              IconType={"Power Point"}
            />
            <Icon
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              }
              IconType={"Document"}
            />
            <Icon
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-file-video"
                  size={25}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              }
              IconType={"Video"}
            />
          </View>
        </View>
        <Text
          style={{
            alignSelf: "center",
            borderColor: isLight
              ? LRBSheet.createPost.deskTextBackgroundColor
              : DRBSheet.createPost.deskTextBackgroundColor,
            borderWidth: 1,
            paddingVertical: 5,
            marginTop: 10,
            marginBottom: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            width: "95%",
            textAlign: "center",
            lineHeight: 25,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          Share resources and study materials
        </Text>
      </RBSheet>
    </View>
  );
};

export default CalendarTopIcons;

const styles = StyleSheet.create({});
