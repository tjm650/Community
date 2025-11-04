import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

import utils from "@/assets/core/utils";
import BottomNotif from "@/screens/ApplicationServices/Notifications/BottomNotif/BottomNotif";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { Image, Platform, SafeAreaView } from "react-native";
import MainHeader from "../../GlobalScreens/MainHeader";
import SelectedService from "../CreateService/SelectedService";
import ServicesData from "../CreateService/ServicesData";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";
import { CreateForumnPost } from "./CreateForumn";

//======================================================================================
function MessageType({ messageType, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ flexDirection: "row", gap: 2 }}
    >
      <Text
        style={{
          color: DGlobals.text,
          fontSize: 12,
          borderBottomWidth: 0,
          borderColor: "#d0d0d0",
          borderRadius: 10,
          paddingHorizontal: "5%",
          paddingVertical: "1%",
          backgroundColor: isLight
            ? LGlobals.buttonBackground
            : DGlobals.buttonBackground,
          marginBottom: 10,
        }}
      >
        {messageType}
      </Text>
    </TouchableOpacity>
  );
}

const CreateLiveForum = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showInfor, setShowIfor] = useState(true);
  const [futureDate, setFutureDate] = useState(new Date());

  console.log("futureDate===>", futureDate);

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  const [showTopicInput, setShowTopicInput] = useState(true);
  const [showDescInput, setShowDescInput] = useState(false);
  const [service, setService] = useState("");
  const [topic, setTopic] = useState("");

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);

  const [showSelectedService, setshowSelectedService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePickerPreview, setShowDatePickerPreview] = useState(false);

  const notifSend = useGlobal((state) => state.notifSend);
  const notificationList = useGlobal((state) => state.notificationList);
  const user = useGlobal((state) => state.user);

  const pickDate = async () => {
    setShowTimePicker(false);
    setShowDatePicker(true);
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: futureDate,
        onChange: (event, selectedDate) => {
          if (event.type !== "dismissed") {
            setFutureDate(selectedDate);
          }
        },
        mode: "date",
      });
    } else {
      // iOS implementation
      // setShowIosPicker(true);
    }
  };

  const pickTime = async () => {
    setShowDatePicker(false);
    setShowTimePicker(true);
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: futureDate,
        onChange: (event, selectedDate) => {
          if (event.type !== "dismissed") {
            setFutureDate(selectedDate);
          }
        },
        mode: "time",
      });
    } else {
      // iOS implementation
      // setShowIosPicker(true);
    }
  };

  const handleDateChange = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowDatePickerPreview(true);

    if (selectedDate) {
      setFutureDate(selectedDate);
    }
  };

  const handleSelectService = (item) => {
    setSelectedServices(item);
    setshowSelectedService((value) => (value = true));
  };

  const [selectShow, setSelectShow] = useState(false);

  function onSend() {}

  function onType(val) {
    setService(val);
  }
  function onTypeTopic(val) {
    setTopic(val);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Live Forum
            </Text>
          }
        />
      ),
    });
  });

  const handleCreate = () => {
    CreateForumnPost.handleCreateForumnPost(
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
    );
  };

  const handleSend = () => {
    if (!futureDate) {
      setAuth(true);
      setRes("select duration for your forumn");
    } else if (service.length >= 150 && !user.verified) {
      setAuth(true);
      setRes(
        "reached max number of words, get verified for unlimited messages."
      );
    } else if (service.length == 0) {
      setAuth(true);
      setRes(
        "number of words should be greater than 0 for description. Hint: Press 'Description' to edit."
      );
    } else if (selectedServices.length == 0) {
      setAuth(true);
      setRes("select service.");
    } else if (topic.length == 0) {
      setAuth(true);
      setRes("number of words should be greater than 0 for topic.");
    } else {
      handleCreate();
    }
  };

  function HandleOk() {
    setAuth((value) => (value = false));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {Auth && <BottomNotif Auth={res} HandleOk={HandleOk} />}

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: "65%", flexDirection: "row" }}
      >
        <View>
          <UserDetailsView itemDesc={"User"} Desc={user.name} />
          <UserDetailsView itemDesc={"Email"} Desc={user.email} />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={futureDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date(2025, 12, 31)}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={futureDate}
          mode="time"
          display="clock"
          minimumDate={new Date()}
          maximumDate={new Date(2025, 12, 31)}
          onChange={handleDateChange}
        />
      )}

      <View
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
          justifyContent: "flex-end",
          gap: 50,
        }}
      >
        {showDatePickerPreview && (
          <View style={{ marginVertical: "1%" }}>
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
                paddingHorizontal: "5%",
                fontWeight: 500,
              }}
            >
              Forumn ends on:
            </Text>
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? "#172021" : "#7f7f7f50",
                paddingHorizontal: "5%",
                paddingVertical: "2%",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                width: "65%",
              }}
            >
              {utils.GetEndDateTime(futureDate)}
              {"  "}
              {utils.GetTime(futureDate)}
            </Text>
          </View>
        )}

        {showInfor && (
          <View
            style={{
              gap: 5,
              padding: 5,
            }}
          >
            <View
              style={{
                paddingHorizontal: 5,
              }}
            >
              {showSelectedService ? (
                <SelectedService selectedServices={selectedServices} />
              ) : null}
            </View>

            {image && (
              <View style={{ flexDirection: "row", gap: 5 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    CreateForumnPost.pickImage(setImage, setImage1)
                  }
                  style={{
                    width: "25%",
                    height: "auto",
                    overflow: "hidden",
                    backgroundColor: "black",
                    borderWidth: 1,
                    borderColor: "#d0d0d0",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      aspectRatio: 1, // imageSize.height
                    }}
                    source={{ uri: image }}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ gap: 5 }}>
              {showTopicInput && (
                <InputPost
                  postmessage={topic}
                  setPostMessage={onTypeTopic}
                  onSend={handleCreate}
                  maxHeight={"20%"}
                  textdescription={true}
                  height={"auto"}
                  MoreIcons={true}
                  post={false}
                  showAdd={showInfor ? false : true}
                  moreOptions={
                    () => "" // setShowIfor((value) => (value = true)) || Keyboard.dismiss()
                  }
                  backgroundColor={
                    isLight ? LGlobals.background : DGlobals.background
                  }
                />
              )}
              <MessageType
                onPress={() => setShowTopicInput((val) => !val)}
                messageType={"Subject Matter"}
              />
            </View>

            <View style={{ gap: 5, marginVertical: "5%" }}>
              {showDescInput && (
                <InputPost
                  postmessage={service}
                  setPostMessage={onType}
                  onSend={handleCreate}
                  maxHeight={"80%"}
                  textdescription={true}
                  height={"auto"}
                  MoreIcons={true}
                  post={false}
                  showAdd={showInfor ? false : true}
                  moreOptions={
                    () => "" // setShowIfor((value) => (value = true)) || Keyboard.dismiss()
                  }
                  backgroundColor={
                    isLight ? LGlobals.background : DGlobals.background
                  }
                />
              )}
              <MessageType
                onPress={() => setShowDescInput((val) => !val)}
                messageType={"Description"}
              />
            </View>

            <ServicesData
              SelectedServices={selectedServices}
              handleSelectService={handleSelectService}
            />

            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => CreateForumnPost.pickImage(setImage, setImage1)}
              >
                <FontAwesomeIcon
                  icon="mountain-sun"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-solid fa-user-group"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickTime}>
                <FontAwesomeIcon
                  icon="fa-regular fa-clock"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickDate}>
                <FontAwesomeIcon
                  icon="fa-regular fa-calendar"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>

              <SendIcon onPress={handleSend} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateLiveForum;

const styles = StyleSheet.create({});
