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

const handleCreateForumnPost = (
      user,
      notifSend,
      notificationList,
      service,
      topic,
      selectedServices,
      setTopic,
      setService,
      futureDate,
      image,
      image1
) => {
  Keyboard.dismiss();

  const start_date = new Date();
  const end_date = futureDate;
  console.log("end_date--->", end_date);

  // let getSelectedService = selectedServices.map((item) => item.id);
  let SelectedServ = selectedServices.id.toString();
  console.log("selected services-------------->>>>>>:::: ", SelectedServ);

  // ////////////////// get selected tags ///////////////////////////////
  // let getSelectedTags = selectedtags.map((item) => item.connect.id);
  // let SelectedTags = getSelectedTags.toString((item) => item.connect.id);

  // console.log("selected tages", SelectedTags);

  // Trim the message text spaces
  const cleaned = service.replace(/\s+/g, " ").trim();
  const details = {
    sender: user.id,
    service: SelectedServ,
    update_type: "LiveForumn",
    image: image ? image1 : null,
    description: service,
    extra_data: {
      name: "Forumn",
      topic: topic,
      start_date: start_date,
      end_date: end_date,
    },
  };
  if (cleaned.length === 0) return;
  notifSend(details);
  notificationList();
  setTopic("");
  setService("");
};

//////////////////////////////////////////// Functions ////////////////////////////////////////

export const CreateForumnPost = {
  handleCreateForumnPost,
  pickImage,
};
