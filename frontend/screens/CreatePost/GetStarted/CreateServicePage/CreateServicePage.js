import { useNavigation } from "@react-navigation/native";
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

const handleCreateService = (
  user,
  CommunityDirectoryCreate,
  CommunityDirectoryList,
  name,
  setName,
  nameError,
  setNameError,
  link,
  setLinkError,
  email,
  setEmail,
  emailError,
  setEmailError,
  bio,
  setBio,
  bioError,
  setBioError,
  more,
  image,
  image1,
  image2,
  image3,
  imageError,
  imageError1,
  setImageError,
  setImageError1
) => {
  Keyboard.dismiss();

  //Check UserId

  if (!more) {
    const failname = !name;
    if (failname) {
      setNameError("Enter service Name");
    }

    //Check UserPassword
    const faillink = !link;
    if (faillink) {
      setLinkError("Enter service linking code");
    }

    if (failname || faillink) {
      return;
    }
  } else {
    const failname = !name;
    if (failname) {
      setNameError("Enter service Name");
    }

    //Check UserPassword
    const faillink = !link;
    if (faillink) {
      setLinkError("Enter service linking code");
    }

    const failemail = !email;
    if (failemail) {
      setEmailError("Enter your service email");
    }

    const failbio = !bio;
    if (failbio) {
      setBioError("Enter your service bio");
    }

    const failimage = !image;
    if (failimage) {
      setImageError("Select your Image");
    }
    const failimage1 = !image1;
    if (failimage1) {
      setImageError1("Select your Image");
    }

    if (
      failname ||
      faillink ||
      failemail ||
      failbio ||
      failimage ||
      failimage1
    ) {
      return;
    }
  }

  const cleaned =
    name.replace(/\s+/g, " ").trim() &&
    link.replace(/\s+/g, " ").trim() &&
    more &&
    bio.replace(/\s+/g, " ").trim();
  const details = {
    userId: user.id,
    username: name,
    directory_status1: "Service",
    directory_status2: "",
    directory_status3: "",
    followers: "",
    code: link,
    email: email ? email : "",
    bio: bio ? bio : "This is a service page",
    profile_image: image ? image1 : null,
    cover_image: image2 ? image3 : null,
  };

  if (cleaned.length === 0) return;
  CommunityDirectoryCreate(details);
  CommunityDirectoryList();
};

//////////////////////////////////////////// Functions ////////////////////////////////////////

////////////////// onType //////////////////
function onType(value) {
  setBlog(value);
}

export const CreateServ = {
    handleCreateService,
  pickImage,
  onType,
};
