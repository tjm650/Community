import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
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
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/core/useGlobal";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import BottomNotif from "../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import MainHeader from "../../GlobalScreens/MainHeader";
import MoreInforSheet from "../../GlobalScreens/RBSheets/MoreInfoSheet";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";
import { CreateNotifPost } from "./CreateService";
import SelectedService from "./SelectedService";
import ServicesData from "./ServicesData";

const CreateServiceNotif = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showInfor, setShowIfor] = useState(true);
  const user = useGlobal((state) => state.user);
  const notifSend = useGlobal((state) => state.notifSend);
  const notificationList = useGlobal((state) => state.notificationList);

  const [service, setService] = useState("");
  const [updateType, setUpdateType] = useState("Update");

  const [created, setCreated] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isFailedError, setIsFailedError] = useState("");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [showSelectedService, setshowSelectedService] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  const [selectedUpdateType, setSelectedUpdateType] = useState([]);
  const [showSelectedUpdateType, setShowSelectedUpdateType] = useState(false);
  const update_types = [
    { id: 1, label: "Update", value: "Update", icon: "fa-solid fa-leaf" },
    { id: 2, label: "Event", value: "Event", icon: "fa-solid fa-calendar" },
    {
      id: 3,
      label: "Live Forumn",
      value: "Live Forumn",
      icon: "fa-solid fa-microphone-lines",
    },
  ];

  const handleSelectService = (item) => {
    setSelectedServices(item);
    setshowSelectedService((value) => (value = true));
  };

  const handleSelectUpdate = (item) => {
    setSelectedUpdateType(item);
    setShowSelectedUpdateType((val) => (val = true));
  };
  const handleOpenLiveForumn =  async () => {
    navigation.navigate("CreateLiveForum");
    setSelectedUpdateType(update_types[0]);
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
              Update
            </Text>
          }
        />
      ),
    });
  });

  const handleCreate = () => {
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
      image1
    );
  };

  const handleSend = () => {
    if (!showSelectedService) {
      setAuth(true);
      setRes("select a service from your services list");
    } else if (!image) {
      setAuth(true);
      setRes("select an image");
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


      <View
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
          justifyContent: "flex-end",
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

            <ServicesData
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

              <TouchableOpacity>
                <MoreInforSheet
                  height={"auto"}
                  activeOpacity={0.7}
                  GetIcon={
                    <FontAwesomeIcon
                      icon="fa-solid fa-calendar"
                      size={20}
                      color={isLight ? LGlobals.icon : DGlobals.icon}
                    />
                  }
                  GetView={
                    <View
                      style={{
                        paddingHorizontal: "5%",
                        paddingBottom: "10%",
                        paddingTop: "2%",
                        flexDirection: "column",
                        gap: 20,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: isLight ? LGlobals.text : DGlobals.text,
                            fontWeight: "900",
                            fontSize: 19,
                          }}
                        >
                          Update Type
                        </Text>
                      </View>

                      {update_types.map((item) => (
                        <TouchableOpacity
                          onPress={() => handleSelectUpdate(item)}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: isLight ? LGlobals.text : DGlobals.text,
                              fontWeight: "800",
                              fontSize: 16,
                            }}
                          >
                            {item.label}
                          </Text>
                          <FontAwesomeIcon
                            icon={item.icon}
                            size={20}
                            color={isLight ? LGlobals.icon : DGlobals.icon}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  }
                />
              </TouchableOpacity>

              <SendIcon onPress={handleSend} />

              {showSelectedUpdateType && (
                <TouchableOpacity
                  onPress={
                    selectedUpdateType.label == "Live Forumn" &&
                    handleOpenLiveForumn()
                  }
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
    </SafeAreaView>
  );
};

export default CreateServiceNotif;

const styles = StyleSheet.create({});
