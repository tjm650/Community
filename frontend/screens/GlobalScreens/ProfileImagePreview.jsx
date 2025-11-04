import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import * as ImagePicker from "expo-image-picker";

///////////////////////////// Functions ////////////////////////////////////
function ProfileImagePreviewHeader(params) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    ></View>
  );
}

const ProfileImagePreview = () => {
  const user = useGlobal((state) => state.user);
  const uploadImage = useGlobal((state) => state.uploadImage);

  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  ////////////////////////// Functions ////////////////////////////////////
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const file = result.assets[0];
      uploadImage(file);
      setImage(result.assets[0].uri);
    }
  };

  async function pickImage1(params) {
    await launchImageLibrary(
      {
        includeBase64: true,
      },
      (resp) => {
        if (resp.didCancel) return;
        const file = resp.assets[0];
        uploadImage(file);
        setImage(resp.assets[0].uri);

        resp.errorCode == "others";
      }
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ProfileImagePreviewHeader />,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height:Dimensions.get("window").height*0.7,
          position:"absolute",
          alignItems:"center",
          justifyContent:"center",
          zIndex: 1,
        }}
      >
        {user.image ? (
          <Pressable style={{}}>
            <Image
              style={{
                resizeMode: "contain",
                width: "100%",
                height: "100%",
              }}
              source={{ uri: image } && utils.GetImage(user.image)}
            />
          </Pressable>
        ) : (
          <FontAwesomeIcon
            icon="fa-solid fa-image"
            size={70}
            color="#555"
            style={{ alignSelf: "center", justifyContent: "center" }}
          />
        )}
      </View>

      <View
        style={{
          position:"absolute",
          bottom: Dimensions.get("window").height*0.2,
          left: 5,
          right: 5,
          zIndex: 99,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
          activeOpacity={0.5}
          onPress={pickImage}
        >
          <FontAwesomeIcon icon="image" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
          }}
          activeOpacity={0.5}
        >
          <FontAwesomeIcon icon="remove" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileImagePreview;

const styles = StyleSheet.create({});
