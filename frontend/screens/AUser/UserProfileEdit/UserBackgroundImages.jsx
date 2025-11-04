import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

import { LGlobals } from "@/constants/LightColor/LGlobals";
// =========================================//

import useGlobal from "@/assets/core/useGlobal";
import FocusableRBSheet from "@/screens/GlobalScreens/RBSheets/FocusableRBSheet";
import CoverImageView from "./CoverImageView";
import ProfileImageView from "./ProfileImageView";
import { UserEditProfileDetails } from "./UserEditProfileDetails";

const SaveUserMedia = ({ handleCreate, isLight }) => {
  return (
    <View
      style={{
        paddingHorizontal: "5%",
        paddingVertical: "5%",
      }}
    >
      <TouchableOpacity activeOpacity={0.8}>
        <Text
          onPress={handleCreate}
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            color: isLight ? LGlobals.text : DGlobals.text,
            borderColor: isLight ? DGlobals.background : LGlobals.background,
            borderWidth: 1,
            width: "auto",
            paddingHorizontal: "30%",
            paddingVertical: "3%",
            borderRadius: 30,
            fontWeight: "600",
            alignSelf: "center",
          }}
          children={"save changes"}
        />
      </TouchableOpacity>
    </View>
  );
};

const UserBackgroundImages = ({ coverImage, profile_image }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const Sheet = useRef([]);

  const user = useGlobal((state) => state.user);
  const modifyProfile = useGlobal((state) => state.modifyProfile);

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const HandleUploadProfileMedia = () => UserEditProfileDetails.handleUploadUserImage(
    user,
    modifyProfile,
    image,
    image1,
    image2,
    image3,
    setImage,
    setImage1,
    setImage2,
    setImage3
  );

  useEffect(() => {
    if (image || image3) {
      Sheet.current.open();
    }
  }, [image, image3]);

  return coverImage ? (
    <View>
      {image ? (
        <FocusableRBSheet
          CommmentSheet={Sheet}
          GetView={
            <SaveUserMedia
              handleCreate={HandleUploadProfileMedia}
              isLight={isLight}
            />
          }
        />
      ) : image && image3 ? (
        <FocusableRBSheet
          CommmentSheet={Sheet}
          GetView={
            <SaveUserMedia
              handleCreate={HandleUploadProfileMedia}
              isLight={isLight}
            />
          }
        />
      ) : (
        image3 && (
          <FocusableRBSheet
            CommmentSheet={Sheet}
            GetView={
              <SaveUserMedia
                handleCreate={HandleUploadProfileMedia}
                isLight={isLight}
              />
            }
          />
        )
      )}

      <CoverImageView
        isLight={isLight}
        bottom={10}
        right={5}
        image={image}
        setImage={setImage}
        setImage1={setImage1}
        height={Dimensions.get("window").height * 0.2}
        CIconHeight={Dimensions.get("window").height * 0.05}
        coverImage={coverImage}
      />

      <ProfileImageView
        isLight={isLight}
        image2={image2}
        image3={image3}
        setImage2={setImage2}
        setImage3={setImage3}
        height={Dimensions.get("window").height * 0.1}
        CIconHeight={Dimensions.get("window").height * 0.045}
        bottom={20}
        profile_image={profile_image}
        Ibottom={30}
        Iright={-50}
      />
    </View>
  ) : (
    <View
      style={{
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <CoverImageView
        isLight={isLight}
        image={image}
        setImage={setImage}
        setImage1={setImage1}
        height={Dimensions.get("window").height * 0.2}
        CIconHeight={Dimensions.get("window").height * 0.05}
      />

      <ProfileImageView
        isLight={isLight}
        image2={image2}
        image3={image3}
        right={-10}
        bottom={5}
        setImage2={setImage2}
        setImage3={setImage3}
        height={Dimensions.get("window").height * 0.06}
        CIconHeight={Dimensions.get("window").height * 0.045}
      />
    </View>
  );
};

export default UserBackgroundImages;

const styles = StyleSheet.create({});
