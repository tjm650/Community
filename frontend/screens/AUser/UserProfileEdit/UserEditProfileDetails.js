import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";

async function pickImage(setImage, setImage1, setImage2, setImage3) {
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
    setImage2(result.assets[0].uri);
    setImage3(result.assets[0]);

    // UploadImage(file);
  }
}

const handleEditDetails = async (
  user,
  modifyProfile,
  value,
  value2,
  action,
  setValue,
  setValue2
) => {
  Keyboard.dismiss();

  const cleaned = value.replace(/\s+/g, " ").trim();
  const profile = {
    userId: user.id,
    action: action,
    val: value,
    val2: value2 && value2,
  };

  if (cleaned.length === 0) return;
  await modifyProfile(profile);
   awaitsetValue("")
   await value2 && setValue2("")
};

const handleUploadUserImage = async (
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
) => {
  Keyboard.dismiss();

  const profile = {
    userId: user.id,
    profile_image: image ? image1 : null,
    cover_image: image2 ? image3 : null,
  };

  await modifyProfile(profile);
  await setImage(null);
  await setImage1(null);
  await setImage2(null);
  await setImage3(null);
};

//////////////////////////////////////////// Functions ////////////////////////////////////////

////////////////// onType //////////////////

export const UserEditProfileDetails = {
  handleEditDetails,
  handleUploadUserImage,
  pickImage,
};
