import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import MainHeader from "../../GlobalScreens/MainHeader";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";
import DepartmentsTagsData from "./DepartmentsTagsData";
import SelectedDepartment from "./SelectedDepartment";
import SelectedTags from "./SelectedTags";
import BottomNotif from "@/screens/ApplicationServices/Notifications/BottomNotif/BottomNotif";
import useGlobal from "@/assets/common/core/useGlobal";

const CreateBlog = () => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  // No permissions request is necessary for launching the image library

  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [showInfor, setShowIfor] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedtags, setSelectedtags] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [showSelected1, setShowSelected1] = useState(false);
  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  async function pickImage() {
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

  const handleSelectDepartments = (item) => {
    setSelectedDepartments(item);
    setShowSelected((value) => (value = true));
  };

  const handleSelecttags = (item) => {
    setSelectedtags((prevItems) => [...prevItems, item]);
    setShowSelected1((value) => (value = true));
  };

  const [longPressing, setLongPressing] = useState(false);

  function HandleRemoveImage(params) {
    setLongPressing((value) => (value = true));
  }

  const user = useGlobal((state) => state.user);
  const blogSend = useGlobal((state) => state.blogSend);
  const BlogList = useGlobal((state) => state.BlogList);

  //////////////////////////////////////////// Functions ////////////////////////////////////////
  function onSend() {
    ////////////////// get selected department ///////////////////////////////
    // let getSelectedDpt = selectedDepartments.map((item) => item.id);
    let SelectedDpt = selectedDepartments.id.toString();
    console.log("commudire_id", SelectedDpt);

    ////////////////// get selected tags ///////////////////////////////
    let getSelectedTags = selectedtags.map((item) => item.connect.id);
    let SelectedTags = getSelectedTags.toString((item) => item.connect.id);

    console.log("selected tages", SelectedTags)

    // Trim the message text spaces
    const cleaned = blog.replace(/\s+/g, " ").trim();

    const details = {
      UserId: user.id,
      image: image ? image1 : null,
      directoryId: SelectedDpt,
      tags:SelectedTags.length > 0 ? SelectedTags : null ,
      description: blog,
    };

    if (cleaned.length === 0) return;
    blogSend(details);
    BlogList();
    setBlog("");
    navigation.goBack();
  }

  const handleSend = () => {
    if (!showSelected) {
      setAuth(true);
      setRes("select a bloger from your blogers list");
    } else if (!image) {
      setAuth(true);
      setRes("select an image");
    } else if (blog.length >= 150 && !user.verified) {
      setAuth(true);
      setRes(
        "reached maximum number of words, get verified for unlimited messages."
      );
    } else {
      onSend();
    }
  };

  ////////////////// onType //////////////////
  function onType(value) {
    setBlog(value);
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
              Blog
            </Text>
          }
        />
      ),
    });
  });

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

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: "65%", flexDirection: "row" }}
      >
        <View>
          <UserDetailsView itemDesc={"User"} Desc={user.name} />
          <UserDetailsView itemDesc={"Email"} Desc={user.email} />
        </View>
      </TouchableOpacity>

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
              {showSelected ? (
                <SelectedDepartment selectedDepartments={selectedDepartments} />
              ) : null}

              {showSelected1 ? (
                <SelectedTags selectedtags={selectedtags} />
              ) : null}
            </View>

            {image && (
              <View style={{ flexDirection: "row", gap: 5 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={pickImage}
                  onLongPress={HandleRemoveImage}
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
                    backgroundColor: "red",
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      aspectRatio: 1, // imageSize.height
                    }}
                    source={{ uri: image }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#5b5b5b86",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {longPressing ? (
                      <FontAwesomeIcon icon="remove" size={15} color="#fff" />
                    ) : (
                      <FontAwesomeIcon icon="pencil" size={15} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <InputPost
              //  onPressIn={() => setShowIfor((value) => (value = false))}
              postmessage={blog}
              setPostMessage={onType}
              onSend={onSend}
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
            <DepartmentsTagsData
              Selectedtags={selectedtags}
              SelectedDepartments={selectedDepartments}
              handleSelecttags={handleSelecttags}
              handleSelectDpts={handleSelectDepartments}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 0,
                alignItems: "center",
              }}
            >
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
                <TouchableOpacity onPress={pickImage}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-paperclip"
                    size={19}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                  />
                </TouchableOpacity>
              </View>
              <SendIcon onPress={handleSend} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({});
