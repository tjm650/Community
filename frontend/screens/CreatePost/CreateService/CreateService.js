import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";

async function pickImage(setImage, setImage1) {
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
}

const handleCreateNotifPost = (
  user,
  notifSend,
  notificationList,
  service,
  updateType,
  setService,
  selectedUpdateType,
  selectedServices,
  image,
  image1,
  eventData = null
) => {
  Keyboard.dismiss();


  // let getSelectedService = selectedServices.map((item) => item.id);
  let SelectedServ = selectedServices.id.toString();
  console.log("selected services-------------->>>>>>:::: ", SelectedServ);

  // Trim the message text spaces
  const cleaned = service.replace(/\s+/g, " ").trim();

  // Prepare the base details
  const details = {
    sender: user.id,
    service: SelectedServ,
    update_type: selectedUpdateType.value ? selectedUpdateType.value : "Update",
    image: image ? image1 : null,
    description: service,
  };

  // Add event-specific data if provided
  if (eventData) {
    details.extra_data = eventData;
  }

  if (cleaned.length === 0) return;
  notifSend(details);
  notificationList();
  setService("");
};

//////////////////////////////////////////// Functions ////////////////////////////////////////

export const CreateNotifPost = {
  handleCreateNotifPost,
  pickImage,
};
