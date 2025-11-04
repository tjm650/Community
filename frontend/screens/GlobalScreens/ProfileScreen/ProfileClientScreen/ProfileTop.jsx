import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LNotifs } from "@/constants/LightColor/LNotifs";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import UserEditDetails from "@/screens/AUser/UserEditDetails";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import CheckClientType from "../../CheckClientType";
import ImageBackground from "../ImageBackground";

const ProfileTop = ({
  profileimg,
  name,
  bio,
  email = true,
  directoryStatus,
  ds1,
  coverImage,
  verified,
  editable = false,
  onPressEdit,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);

  function OpenEditProfile(params) {
    navigation.navigate("UserProfile");
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        height: email
          ? Dimensions.get("window").width * 0.4
          : Dimensions.get("window").width * 0.3,
        //  backgroundColor: "green",
      }}
    >
      <ImageBackground coverImage={coverImage} email={email} />

      {editable && (
        <UserEditDetails onPress={OpenEditProfile} DGlobals={DGlobals} />
      )}

      <View
        style={{
          flexDirection: "row",
          //backgroundColor: "red",
          gap: 30,
          paddingVertical: "1%",
          flex: 1,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            marginHorizontal: "2%",
            marginTop: 15,
            alignItems: "center",
            alignSelf: "center",
            width: Dimensions.get("window").width * 0.15,
            height: Dimensions.get("window").width * 0.15,
            backgroundColor: isLight
              ? LNotifs.events.notifLiveView.profileImgbackgroundColor
              : DNotifs.events.notifLiveView.profileImgbackgroundColor,
            borderRadius: 100,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#d0d0d0",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          {profileimg ? (
            <Image
              style={{
                resizeMode: "cover",
                justifyContent: "center",
                alignSelf: "center",
                width: Dimensions.get("window").width * 0.15,
                height: Dimensions.get("window").width * 0.15,
              }}
              source={utils.GetImage(profileimg)}
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              size={15}
              color="#d0d0d0"
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            width: Dimensions.get("window").width * 0.7,
            gap: 5,
            //backgroundColor:"red",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width * 0.35,
            }}
          >
            <CheckClientType
              DirectoryView={
                <Text
                  numberOfLines={3}
                  style={{
                    // textTransform: "capitalize",
                    color: DGlobals.text, //isLight ? LGlobals.text : DGlobals.text,
                    fontWeight: "500",
                    lineHeight: 20,
                  }}
                >
                  {name}
                </Text>
              }
              directoryStatus={directoryStatus}
              verified={verified}
            />
          </View>

          <Text
            numberOfLines={3}
            style={{
              textTransform: "capitalize",
              color: DGlobals.bluetext, //isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            {ds1}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({});
