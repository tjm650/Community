import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//====================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const FilePicker = ({ setImage, setImage1 }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const pickImage = async (file) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType:
        ImagePicker.CameraType.front || ImagePicker.PermissionStatus.GRANTED,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      file = result.assets[0];
      //uploadImage(file);
      setImage(result.assets[0].uri);
      setImage1(result.assets[0]);

      // UploadImage(file);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 25,
        paddingHorizontal: "5%",
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        <FontAwesomeIcon
          icon="mountain-sun"
          size={20}
          color={isLight ? LGlobals.icon : DGlobals.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon
          icon="fa-solid fa-paperclip"
          size={19}
          color={isLight ? LGlobals.icon : DGlobals.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({});
