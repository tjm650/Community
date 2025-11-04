import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import Firstletter from "../GlobalScreens/Firstletter";

const DrawerProfileRB = () => {
  const refRBSheet = useRef([]);
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [image, setImage] = useState(null);

  ////////////////// Local States //////////////////
  const logout = useGlobal((state) => state.logout);
  const user = useGlobal((state) => state.user);
  const Cuser = useGlobal((state) => state.user);

  const ShowAuthOptions = () => {
    refRBSheet.current.open();
  };

  function UserOptionsView({ icon, useroption, onPress }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: isLight
            ? LGlobals.rbSheets.iconBorderColor
            : DGlobals.rbSheets.iconBorderColor,
          width: "95%",
          borderRadius: 25,
          paddingHorizontal: "5%",
          paddingVertical: "1%",
          paddingRight: "5%",
          alignItems: "center",
          marginBottom: "5%",
        }}
      >
        <Text
          style={{
            width: "90%",
            textAlign: "center",
            fontWeight: "700",
            color: isLight ? LGlobals.rbSheets.text : DGlobals.rbSheets.text,
          }}
        >
          {useroption}
        </Text>
        {icon}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        // onPress={ShowAuthOptions}
        activeOpacity={0.5}
        style={{
          width: 35,
          height: 35,
          borderRadius: 50,
          borderColor: "transparent",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: isLight ? "#d0d0d0": "#606060",
          // backgroundColor:  isLight
          //     ? LGlobals.background
          //     : DGlobals.background
        }}
      >
        {image || user.profile_image ? (
          <View>
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
                overlayColor: "#d0d0d0",
              }}
              source={utils.GetImage(user.profile_image)}
              // source={user.image}
            />
          </View>
        ) : (
          <View
          style={{
         
          paddingTop: "15%",
         
        }}
          >
            {/* <Firstletter user={Cuser.name} /> */}
            <Ionicons
              name="person"
              size={30}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </View>
        )}
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        dragOnContent={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            height: "auto",
            width: "100%",
            paddingVertical: "2%",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            borderWidth: 1,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
            alignItems: "center",
          },
          draggableIcon: {
            backgroundColor: "#606060",
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
        <View>
          <UserOptionsView
            icon={
              <MaterialCommunityIcons
                name="account-outline"
                size={30}
                color={
                  isLight ? LGlobals.rbSheets.icon : DGlobals.rbSheets.icon
                }
              />
            }
            useroption={"Add Account"}
          />

          <UserOptionsView
            onPress={logout}
            icon={
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={
                  isLight ? LGlobals.rbSheets.icon : DGlobals.rbSheets.icon
                }
              />
            }
            useroption={"Logout"}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default DrawerProfileRB;

const styles = StyleSheet.create({});
