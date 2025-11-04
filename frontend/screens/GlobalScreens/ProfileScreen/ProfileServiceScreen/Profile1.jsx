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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import CheckClientType from "../../CheckClientType";
import ImageBackground from "../ImageBackground";

const Profile1 = ({
  ds1,
  profileimg,
  name,
  bio,
  email,
  directoryStatus,
  coverImage,
  verified,
  followers,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        height: Dimensions.get("window").width * 0.4,
      }}
    >
      <ImageBackground coverImage={coverImage} email={email} />
      <View
        style={{
          flexDirection: "row",
          //backgroundColor: "red",
          gap: 30,
          paddingVertical: "1%",
          justifyContent: "space-between",
          // alignItems:"center"
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            marginHorizontal: "2%",
            marginTop: 35,
            alignItems: "center",
            alignSelf: "center",
            width: Dimensions.get("window").width * 0.15,
            height: Dimensions.get("window").width * 0.15,
            backgroundColor: isLight
              ? LNotifs.events.notifLiveView.profileImgbackgroundColor
              : DNotifs.events.notifLiveView.profileImgbackgroundColor,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: "hidden",
            borderWidth: 0,
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
              icon="fa-solid fa-user-group"
              size={15}
              color="#d0d0d0"
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            width: Dimensions.get("window").width * 0.7,
            gap: 5,
            // backgroundColor:"red",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width * 0.55,
              marginTop: 35,
              justifyContent: "center",
            }}
          >
            <CheckClientType
              DirectoryView={
                <Text
                  numberOfLines={2}
                  style={{
                    textTransform: "capitalize",
                    color: DGlobals.text,
                    fontWeight: 700,
                    fontSize: 20,
                    lineHeight: 20,
                    textAlignVertical: "center",
                  }}
                >
                  {name}
                </Text>
              }
              directoryStatus={directoryStatus}
              verified={verified}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 10,
          marginRight: "5%",
          position:"absolute",
          bottom:"5%",
          right:"1%",
          // zIndex:99
        }}
      >
        <FontAwesomeIcon
          icon={"user-group"}
          color={isLight ? DGlobals.text : DGlobals.icon}
          size={20}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //  marginBottom: 3,
          }}
        >
          <Text
            style={{
              color: isLight ? DGlobals.text : DGlobals.text,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            {followers}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Profile1;

const styles = StyleSheet.create({});
