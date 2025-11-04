import React from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DRBSheet } from "@/constants/DarkColor/DRBSheet";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LRBSheet } from "@/constants/LightColor/LRBSheet";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import NotifTopIcons from "./NotifTopIcons";
import { EvilIcons } from "@expo/vector-icons";

///////////////////////////////// Functions ////////////////////////////////////
function Icon({ IconType, icon, OnPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={OnPress}
        style={{
          height: 56,
          width: 56,
          borderRadius: 28,
          backgroundColor: isLight
            ? 'rgba(0,0,0,0.05)'
            : 'rgba(255,255,255,0.1)',
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 8,
          transform: [{ scale: 1 }],
        }}
        accessibilityLabel={`${IconType} option`}
        accessibilityRole="button"
        accessibilityHint={`Tap to create a ${IconType.toLowerCase()}`}
      >
        {icon}
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        style={{
          fontWeight: "500",
          fontSize: 13,
          color: isLight ? LGlobals.text : DGlobals.text,
          textAlign: "center",
          maxWidth: 70,
        }}
      >
        {IconType}
      </Text>
    </View>
  );
}

const IconsSheet = () => {
  const IconsrefRBSheet = useRef([]);
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const OpenIcons = () => {
    IconsrefRBSheet.current.open();
  };

  // Responsive positioning helpers
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenWidth < 380;
  const isTablet = screenWidth > 768;

  // Calculate responsive positioning
  const fabBottomPosition = isTablet ? screenHeight * 0.15 : screenHeight * 0.18;
  const fabRightPosition = isSmallScreen ? 12 : screenWidth * 0.04;
  const fabSize = isSmallScreen ? 48 : 52;

  // Navigation handlers - keeping original app functionality
  const navigationHandlers = {
    OpenCreateBlog: () => {
      navigation.navigate("CreateBlog");
      IconsrefRBSheet.current.close();
    },
    OpenCreatePost: () => {
      navigation.navigate("CreatePost");
      IconsrefRBSheet.current.close();
    },
    OpenCreateLiveService: () => {
      navigation.navigate("CreateServiceNotif");
      IconsrefRBSheet.current.close();
    }
  };


  return (
    <View
      style={{
        position: "absolute",
        zIndex: 100,
        bottom: fabBottomPosition,
        right: fabRightPosition,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        id="OpenIcons"
        style={{
          height: fabSize,
          width: fabSize,
          backgroundColor: isLight
            ? LRBSheet.createPost.iconColor
            : DRBSheet.createPost.iconColor,
          borderRadius: fabSize / 2,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
          shadowColor: isLight
            ? LRBSheet.createPost.iconColor
            : DRBSheet.createPost.iconColor,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          ...Platform.select({
            ios: {
              shadowColor: isLight
                ? LRBSheet.createPost.iconColor
                : DRBSheet.createPost.iconColor,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.4,
              shadowRadius: 6,
            },
          }),
        }}
        onPress={() => OpenIcons()}
        accessibilityLabel="Compose new post"
        accessibilityHint="Opens menu to create posts, updates, or live services"
        accessibilityRole="button"
      >
        <FontAwesomeIcon icon="fa-plus" size={fabSize * 0.45} color="#fff" />
      </Pressable>

      <RBSheet
        ref={IconsrefRBSheet}
        dragOnContent={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        enableOverDrag={false}
        customStyles={{
          container: {
            height: "auto",
            width: "100%",
            maxWidth: isTablet ? 400 : undefined,
            alignSelf: 'center',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            elevation: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            paddingBottom: Platform.OS === 'ios' ? 34 : 20,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: -4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              },
            }),
          },
        }}
        animationType="slide"
        duration={250}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
          presentationStyle: "overFullScreen",
        }}
        customAvoidingViewProps={{
          enabled: true,
          behavior: 'padding',
        }}
      >
        <View
          style={{
            marginHorizontal: "3%",
            paddingHorizontal: 16,
            paddingTop: 20,
            flexDirection: "column-reverse",
          }}
        >
          {/* Visual handle for the bottom sheet */}
          <View
            style={{
              alignSelf: "center",
              width: 36,
              height: 4,
              borderRadius: 2,
              backgroundColor: isLight
                ? 'rgba(0,0,0,0.2)'
                : 'rgba(255,255,255,0.3)',
              marginBottom: 12,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              backgroundColor: isLight
                ? LRBSheet.createPost.deskTextBackgroundColor
                : DRBSheet.createPost.deskTextBackgroundColor,
              paddingVertical: 12,
              paddingHorizontal: 20,
              marginTop: 8,
              marginBottom: 24,
              borderRadius: 24,
              width: "85%",
              textAlign: "center",
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 17,
              fontWeight: "700",
            }}
          >
            Create a post
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom: isSmallScreen ? 16 : 20,
              paddingHorizontal: isSmallScreen ? 8 : 12,
            }}
          >

            <NotifTopIcons/>

            



           {/* <Icon
             OnPress={navigationHandlers.OpenCreateLiveService}
             IconType={"Quercus"}
             icon={
               <FontAwesomeIcon
                 icon={"fa-brain"}
                 size={22}
                 color={isLight ? LGlobals.icon : "#fff"}
               />
             }
           /> */}

           <Icon
             OnPress={navigationHandlers.OpenCreateLiveService}
             IconType={"Update"}
             icon={
               <FontAwesomeIcon
                 icon={"fa-envelopes-bulk"}
                 size={22}
                 color={isLight ? LGlobals.icon : "#fff"}
               />
             }
           />

           <Icon
             IconType={"Post"}
             icon={
               <FontAwesomeIcon
                 icon={"fa-leaf"}
                 size={20}
                 color={isLight ? LGlobals.icon : "#fff"}
               />
             }
             OnPress={navigationHandlers.OpenCreatePost}
           />

           
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default IconsSheet;
