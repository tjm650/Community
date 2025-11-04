import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNavScreens } from "@/constants/DarkColor/DNavScreens";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNavScreens } from "@/constants/LightColor/LNavScreens";

import RBSheet from "react-native-raw-bottom-sheet";
import TopDetails from "../DrawerScreens/TopDetails";
import DrawerOptions from "../DrawerScreens/DrawerOptions";
import DrawerSubOptions from "../DrawerScreens/DrawerSubOptions";
import TermsAndConditions from "../DrawerScreens/TermsAndConditions/TermsAndconditions";
import AppDescription from "../DrawerScreens/TermsAndConditions/AppDescription";
import DrawerProfileRB from "../DrawerScreens/DrawerProfileRB";
//======================================================================================

//<FontAwesome icon="fa-solid fa-user" size={20} color='black'/>
//<FontAwesomeIcon icon="fa-solid fa-circle-user" />
// <Ionicons name="person-circle-outline" size={40} color="#32312E" />

const ProfileImage = ({}) => {
  const navigation = useNavigation();

  const user = useGlobal((state) => state.user);
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const Sheet = useRef([]);

  const handleChannelPress = () => {
    Sheet.current.open();
  };

  return (
    <View>
        <TouchableOpacity
        // onPress={() => {
        //   // navigation.toggleDrawer("Drawer");
        //   ;
        // }}
        onPress={handleChannelPress}
        activeOpacity={0.6}
        style={{
          width: 35,
          height: 35,
          backgroundColor: isLight ? "#d0d0d0": isLight ? LGlobals.background : DGlobals.background,
          // overlayColor: "#d0d0d0",
          borderRadius: 50,
          // paddingTop: "15%",
          // borderColor: "#a5a5a5",
          borderWidth: 0,
          justifyContent: "center",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        {user.profile_image ? (
          <View>
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={utils.GetImage(user.profile_image)}
              // source={user.image}
            />
          </View>
        ) : (
          <View
          style={{
            paddingTop:"20%"
          }}
          >
            {/* <FontAwesomeIcon
            icon="fa-solid fa-circle-user"
            size={45}
            color="#d0d0d0"
          /> */}

            <Ionicons
              name="person"
              size={30}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </View>
        )}
      </TouchableOpacity>

      <RBSheet
        ref={Sheet}
        closeOnPressMask={true}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height:"100%",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            height: "60%",
            maxHeight: "100%",
            draggable: true,
            padding: "2%",
            width: "98%",
            alignSelf: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            borderWidth: 0.8,
            borderTopWidth: 1,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
            position: "absolute",
            bottom: 0,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap:20,
              alignItems: "center",
              paddingHorizontal: "5%",
              height: 50,
              // borderBottomWidth: 0.3,
              // borderBottomColor: isLight
              //   ? LGlobals.rbSheets.borderColor
              //   : DGlobals.rbSheets.borderColor,
            }}
          >
            <DrawerProfileRB />
            <View>
              <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                textTransform:"capitalize",
                lineHeight: 20,
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
              >
                {user.first_name} {user.last_name}
              </Text>
            </View>
          </View>

          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: "3%",
              marginTop: "2%",
              paddingBottom: "5%",
              gap: 20,
            }}
          >
            <Text
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                fontWeight: "700",
                fontSize: 17,
                color: isLight ? LGlobals.icon : DGlobals.icon,
                paddingHorizontal: "5%",
                height: 30,
              }}
            >
              Account
            </Text>
            <DrawerOptions />
            <DrawerSubOptions />
            <AppDescription />
          </ScrollView>

          <View style={{ height: 30 }} />
        </SafeAreaView>
      </RBSheet>
    </View>
  );
};

export default ProfileImage;

// const styles = StyleSheet.create({});
