import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/core/useGlobal";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import BottomNotif from "../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import MainHeader from "../../GlobalScreens/MainHeader";
import { CreateNotifPost } from "../CreateService/CreateService";
import SelectedService from "../CreateService/SelectedService";
import ServicesData from "../CreateService/ServicesData";
import EventsData from "./EventsData";
import SelectedEvent from "./SelectedEvent";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";

//======================================================================================

const CreateEvent = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showInfor, setShowIfor] = useState(true);
  const user = useGlobal((state) => state.user);
  const notifSend = useGlobal((state) => state.notifSend);
  const notificationList = useGlobal((state) => state.notificationList);

  const [service, setService] = useState("");
  const [updateType, setUpdateType] = useState("Event");

  const [created, setCreated] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isFailedError, setIsFailedError] = useState("");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [showSelectedService, setshowSelectedService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showSelectedEvent, setShowSelectedEvent] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  const [selectedUpdateType, setSelectedUpdateType] = useState([]);
  const [showSelectedUpdateType, setShowSelectedUpdateType] = useState(false);

  // Event-specific state variables
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [eventVenue, setEventVenue] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("General");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSelectService = (item) => {
    setSelectedServices(item);
    setshowSelectedService((value) => (value = true));
  };

  const handleSelectEvent = (item) => {
    setSelectedEvents(item);
    setShowSelectedEvent((value) => (value = true));
  };

  const handleSelectUpdate = (item) => {
    setSelectedUpdateType(item);
    setShowSelectedUpdateType((val) => (val = true));
  };

  function onType(val) {
    setService(val);
  }

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
              Event
            </Text>
          }
        />
      ),
    });
  });

  const handleCreate = () => {
    // Prepare event-specific data
    const eventData = {
      title: eventTitle,
      date: eventDate.toISOString().split('T')[0], // YYYY-MM-DD format
      time: eventTime.toTimeString().split(' ')[0], // HH:MM:SS format
      venue: eventVenue,
      duration: eventDuration,
      description: eventDescription,
      category: eventCategory,
      start_date: eventDate.toISOString(),
      end_date: eventTime.toISOString(),
    };

    CreateNotifPost.handleCreateNotifPost(
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
      eventData // Pass event data
    );
  };

  const handleSend = () => {
    if (!showSelectedService) {
      setAuth(true);
      setRes("select a service from your services list");
    } else if (!image) {
      setAuth(true);
      setRes("select an image");
    } else if (!eventTitle.trim()) {
      setAuth(true);
      setRes("please enter event title");
    } else if (!eventVenue.trim()) {
      setAuth(true);
      setRes("please enter event venue");
    } else if (!eventDuration.trim()) {
      setAuth(true);
      setRes("please enter event duration");
    } else if (!eventDescription.trim()) {
      setAuth(true);
      setRes("please enter event description");
    } else if (service.length >= 150 && !user.verified) {
      setAuth(true);
      setRes(
        "reached max number of words, get verified for unlimited messages."
      );
    } else {
      handleCreate();
    }
  };

  function HandleOk(params) {
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

     

      {/* Event-specific input fields */}
      <ScrollView
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 15, padding: 5 }}>
          {/* Event Title */}
          <View>
            <Text style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8
            }}>
              Event Title *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                fontSize: 16,
              }}
              placeholder="Enter event title"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
          </View>

          {/* Event Date and Time */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{
                color: eventDate ? (isLight ? LGlobals.text : DGlobals.text) : (isLight ? LGlobals.lighttext : DGlobals.lighttext),
                fontSize: 16,
              }}>
                {eventDate.toLocaleDateString()}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{
                color: eventTime ? (isLight ? LGlobals.text : DGlobals.text) : (isLight ? LGlobals.lighttext : DGlobals.lighttext),
                fontSize: 16,
              }}>
                {eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Ionicons
                name="time-outline"
                size={20}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Event Venue */}
          <View>
            <Text style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8
            }}>
              Venue *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                fontSize: 16,
              }}
              placeholder="Enter event venue/location"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              value={eventVenue}
              onChangeText={setEventVenue}
            />
          </View>

          {/* Event Duration */}
          <View>
            <Text style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8
            }}>
              Duration *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                fontSize: 16,
              }}
              placeholder="e.g., 2 hours, 1 day, 30 minutes"
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              value={eventDuration}
              onChangeText={setEventDuration}
            />
          </View>

          {/* Event Description */}
          <View>
            <Text style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8
            }}>
              Description *
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: isLight ? "#d0d0d0" : "#404040",
                borderRadius: 8,
                padding: 12,
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight ? "#f9f9f9" : "#1a1a1a",
                fontSize: 16,
                height: 100,
                textAlignVertical: "top",
              }}
              placeholder="Describe your event..."
              placeholderTextColor={isLight ? LGlobals.lighttext : DGlobals.lighttext}
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
            />
          </View>

          {/* Event Category */}
          <View>
            <Text style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8
            }}>
              Category
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["General", "Academic", "Sports", "Entertainment", "Workshop", "Meeting"].map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setEventCategory(category)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: eventCategory === category
                      ? (isLight ? LGlobals.bluetext : DGlobals.bluetext)
                      : (isLight ? "#d0d0d0" : "#404040"),
                    backgroundColor: eventCategory === category
                      ? (isLight ? "#e3f2fd" : "#1a365d")
                      : "transparent",
                  }}
                >
                  <Text style={{
                    color: eventCategory === category
                      ? (isLight ? LGlobals.bluetext : DGlobals.bluetext)
                      : (isLight ? LGlobals.text : DGlobals.text),
                    fontSize: 14,
                    fontWeight: "500",
                  }}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>

        <View
          style={{
            gap: 5,
            padding: 5,
          }}
        >
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
                  onPress={() => CreateNotifPost.pickImage(setImage, setImage1)}
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

            <InputPost
              postmessage={service}
              setPostMessage={onType}
              onSend={handleCreate}
              textdescription={true}
              height={"auto"}
              maxHeight={"80%"}
              MoreIcons={true}
              post={false}
              showAdd={showInfor ? false : true}
              backgroundColor={
                isLight ? LGlobals.background : DGlobals.background
              }
            />

            <EventsData
              SelectedEvents={selectedEvents}
              handleSelectEvent={handleSelectEvent}
              SelectedServices={selectedServices}
              handleSelectService={handleSelectService}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 25,
                paddingHorizontal: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => CreateNotifPost.pickImage(setImage, setImage1)}
              >
                <FontAwesomeIcon
                  icon="mountain-sun"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>


              <SendIcon onPress={handleSend} />

              {showSelectedUpdateType && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    // backgroundColor: isLight ? "#172021" : "#7f7f7f50",
                    paddingHorizontal: "3%",
                    paddingVertical: "0.5%",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderWidth: 0,
                    borderColor: "#6e9aa05a",
                  }}
                >
                  <Text
                    style={{
                      color: isLight ? LGlobals.text : DGlobals.icon,
                      // fontWeight: "700",
                    }}
                  >
                    {selectedUpdateType.label}
                  </Text>
                  <FontAwesomeIcon
                    icon={selectedUpdateType.icon}
                    size={15}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        </View>
      </ScrollView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setEventDate(selectedDate);
            }
          }}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={eventTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setEventTime(selectedTime);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
