import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import utils from "@/assets/core/utils";
import { UserEditProfileDetails } from "./UserEditProfileDetails";

const ProfileImageView = ({
  isLight,
  image2,
  image3,
  setImage2,
  setImage3,
  bottom,
  top,
  right,
  left,
  Ibottom,
  Itop,
  Iright,
  Ileft,
  height,
  profile_image,
  CIconHeight,
}) => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: isLight ? LGlobals.text : DGlobals.text,
        borderWidth: 0.5,
        borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
        borderRadius: 100,
        height: height,
        aspectRatio: 1,
        zIndex: 1,
        //   backgroundColor: "red",
        bottom: bottom,
        top: top,
        left: left,
        right: right,
      }}
    >
      {image2 ? (
        <TouchableOpacity
          onPress={() => UserEditProfileDetails.pickImage(setImage2, setImage3)}
          activeOpacity={0.8}
          style={{
            aspectRatio: 1,
            overflow: "hidden",
            borderWidth: 0.5,
            borderRadius: 100,
          }}
        >
          <Image
            style={{
              height: height,
              //backgroundColor: "#76767648",

              aspectRatio: 1,
              zIndex: 10,
              resizeMode: "cover",
            }}
            source={{ uri: image2 }}
          />
        </TouchableOpacity>
      ) : profile_image ? (
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: height,
              //backgroundColor: "#76767648",
              borderRadius: 100,

              zIndex: 0,
              resizeMode: "cover",
            }}
            source={utils.GetImage(profile_image)}
          />

          <TouchableOpacity
            onPress={() =>
              UserEditProfileDetails.pickImage(setImage2, setImage3)
            }
            activeOpacity={0.8}
            style={{
              aspectRatio: 1,
              bottom: Ibottom,
              top: Itop,
              left: Ileft,
              right: Iright,
              zIndex: 99,
              height: CIconHeight,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isLight
                ? DGlobals.lighttext
                : LGlobals.lighttext,
            }}
          >
            <FontAwesomeIcon
              icon="mountain-sun"
              size={CIconHeight / 2}
              color={isLight ? LGlobals.text : DGlobals.text}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => UserEditProfileDetails.pickImage(setImage2, setImage3)}
          activeOpacity={0.8}
          style={{
            aspectRatio: 1,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon="mountain-sun"
            size={20}
            color={isLight ? DGlobals.text : LGlobals.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImageView;

const styles = StyleSheet.create({});
