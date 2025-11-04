import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomNotif from "../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import MainHeader from "../../GlobalScreens/MainHeader";
import InputPost from "../PostMethods/InputPost";
import SendIcon from "../PostMethods/SendIcon";
import UserDetailsView from "../UserDetailsView";

//======================================================================================
const CreatePost = () => {
  const navigation = useNavigation();
  const user = useGlobal((state) => state.user);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [post, setPost] = useState("");
  const [showInfor, setShowIfor] = useState(true);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [longPressing, setLongPressing] = useState(false);

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);

  const postSend = useGlobal((state) => state.postSend);
  const postsList = useGlobal((state) => state.postsList);

  //////////////////////////////////////////// Functions /////////////////////////////////////////
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

  function HandleRemoveImage(params) {
    setLongPressing((value) => (value = true));
  }

  function onSend() {
    // Trim the message text spaces
    const cleaned = post.replace(/\s+/g, " ").trim();
    const details = {
      userId: user.id,
      image: image ? image1 : null,
      description: post,
    };
    if (cleaned.length === 0) return;
    postSend(details);
    postsList();
    setPost("");
    navigation.goBack();
  }

  const handleSend = () => {
    if (post.length >= 10 && !user.verified) {
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
    setPost(value);
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
              Post
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


      <View
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
          justifyContent: "flex-end",
        }}
      >
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
          postmessage={post}
          setPostMessage={onType}
          onSend={handleSend}
          textdescription={true}
          height={"auto"}
          MoreIcons={true}
          post={false}
          showAdd={showInfor ? false : true}
          moreOptions={
            () => "" // setShowIfor((value) => (value = true)) || Keyboard.dismiss()
          }
          backgroundColor={isLight ? LGlobals.background : DGlobals.background}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
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
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
