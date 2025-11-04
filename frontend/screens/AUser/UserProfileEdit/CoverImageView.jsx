import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import utils from "@/assets/core/utils";
import { UserEditProfileDetails } from "./UserEditProfileDetails";

const CoverImageView = ({
  isLight,
  image,
  setImage,
  setImage1,
  height,
  coverImage,
  CIconHeight,
  bottom,
  top,
  right,
  left,
}) => {
  return (
    <View>
      {image ? (
        <TouchableOpacity
          onPress={() => UserEditProfileDetails.pickImage(setImage, setImage1)}
          activeOpacity={0.8}
          style={{
            height: height,
            backgroundColor: "#76767648",
            aspectRatio: !coverImage && 1,
            // borderWidth: 0.5,
            borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
            overflow: "hidden",
            borderRadius: !coverImage && 100,
            alignItems: !coverImage && "center",
            justifyContent: !coverImage && "center",

            width: !coverImage && "100%",
          }}
        >
          <Image
            style={{
              height: height,
              backgroundColor: "#76767648",
              resizeMode: "cover",
              aspectRatio: !coverImage && 1,
            }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
      ) : coverImage ? (
        <Image
          style={{
            width: "100%",
            height: height,
            //backgroundColor: "#76767648",
            zIndex: 0,
            resizeMode: "cover",
          }}
          source={utils.GetImage(coverImage)}
        />
      ) : (
        <TouchableOpacity
          onPress={() => UserEditProfileDetails.pickImage(setImage, setImage1)}
          activeOpacity={0.8}
          style={{
            height: Dimensions.get("window").height * 0.2,
            backgroundColor: "#76767648",
            aspectRatio: 1,
            overflow: "hidden",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon="mountain-sun"
            size={30}
            color={isLight ? LGlobals.text : DGlobals.text}
          />
        </TouchableOpacity>
      )}

      {coverImage && (
        <TouchableOpacity
          onPress={() => UserEditProfileDetails.pickImage(setImage, setImage1)}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            bottom: bottom,
            top: top,
            left: left,
            right: right,
            height: CIconHeight,
            backgroundColor: "#76767648",
            aspectRatio: 1,
            overflow: "hidden",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon="mountain-sun"
            size={CIconHeight / 2}
            color={isLight ? LGlobals.text : DGlobals.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CoverImageView;

const styles = StyleSheet.create({});
