import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import BottomNotif from "../../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import MainHeader from "../../../GlobalScreens/MainHeader";
import BackgroundImages from "../BackgroundImages";
import GetStartedInput from "../GetStartedInput";
import { CreateComm } from "./CreateCommunityPage";

const CreateCommunityPages = () => {
  const navigation = useNavigation();
  const [more, setMore] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [created, setCreated] = useState(false);
  const [createdSuccessful, setCreatedSuccessful] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isFailedError, setIsFailedError] = useState("");

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [bio, setBio] = useState("");
  const [bioError, setBioError] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageError1, setImageError1] = useState("");

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const CommunityDirectoryCreate = useGlobal(
    (state) => state.CommunityDirectoryCreate
  );
  const CommunityDirectoryList = useGlobal(
    (state) => state.CommunityDirectoryList
  );

  const directoryList = useGlobal((state) => state.directoryList);

  const user = useGlobal((state) => state.user);

  const handleCreate = () => {
    const trimName = name.replace(/\s+/g, " ").trim();
    const findDirectory = directoryList.find((val) => val === trimName);
    if (name.length >= 20) {
      setIsFailed(true);
      setIsFailedError("community name too long");
    } else if (
      directoryList.some(
        (name) =>
          name.username.replace(/\s+/g, " ").trim().toLowerCase() ===
          trimName.toLowerCase()
      )
    ) {
      setIsFailed(true);
      setIsFailedError("found Community with the same name");
    } else if (name.length <= 5) {
      setIsFailed(true);
      setIsFailedError("Community name too short");
    } else if (link.length <= 2) {
      setIsFailed(true);
      setIsFailedError("Link code too short");
    } else if (more && email.length <= 5) {
      setIsFailed(true);
      setIsFailedError("provide valid email");
    } else if (more && bio.length <= 1) {
      setIsFailed(true);
      setIsFailedError("Bio too short");
    } else if (more && !image) {
      setIsFailed(true);
      setIsFailedError("Provide your community profile image");
    } else if (more && !image2) {
      setIsFailed(true);
      setIsFailedError("Provide your community cover image");
    } else {
      CreateComm.handleCreateComm(
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
        setImageError1,
        setCreated
      );
      navigation.goBack();
      setShowNotif(true);
      setCreated(true);
      setCreatedSuccessful("Community Created successfully");
    }
  };

  const handleOk = () => {
    setIsFailed(false);
  };

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
                marginBottom: "1%",
              }}
            >
              Create Community
            </Text>
          }
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        paddingHorizontal: "2%",
      }}
    >
      {isFailed && <BottomNotif HandleOk={handleOk} Auth={isFailedError} />}
      {created && <BottomNotif HandleOk={handleOk} Auth={createdSuccessful} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <BackgroundImages
            image={image}
            image2={image2}
            onPressImage={() => CreateComm.pickImage(setImage, setImage1)}
            onPressImage2={() => CreateComm.pickImage(setImage2, setImage3)}
          />
          <View
            style={{
              marginVertical: "5%",
            }}
          >
            <GetStartedInput
              label={"name"}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-flag"
                  size={15}
                  color={
                    nameError
                      ? isLight
                        ? LGlobals.bellNotifIcon
                        : DGlobals.bellNotifIcon
                      : isLight
                      ? LGlobals.icon
                      : DGlobals.icon
                  }
                />
              }
              placeholderTextColor={
                nameError
                  ? isLight
                    ? LGlobals.bellNotifIcon
                    : DGlobals.bellNotifIcon
                  : isLight
                  ? LGlobals.lighttext
                  : DGlobals.lighttext
              }
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameError) {
                  setNameError("Enter bloger name");
                }
              }}
            />

            <GetStartedInput
              label={"linking code"}
              icon={
                <FontAwesomeIcon
                  icon="fa-solid fa-flag"
                  size={15}
                  color={
                    linkError
                      ? isLight
                        ? LGlobals.bellNotifIcon
                        : DGlobals.bellNotifIcon
                      : isLight
                      ? LGlobals.icon
                      : DGlobals.icon
                  }
                />
              }
              placeholderTextColor={
                linkError
                  ? isLight
                    ? LGlobals.bellNotifIcon
                    : DGlobals.bellNotifIcon
                  : isLight
                  ? LGlobals.lighttext
                  : DGlobals.lighttext
              }
              value={link}
              onChangeText={(text) => {
                setLink(text);
                if (linkError) {
                  setLinkError("Enter bloger linking code");
                }
              }}
            />

            {more && (
              <View>
                <GetStartedInput
                  label={"email"}
                  icon={
                    <FontAwesomeIcon
                      icon="fa-solid fa-flag"
                      size={15}
                      color={
                        emailError
                          ? isLight
                            ? LGlobals.bellNotifIcon
                            : DGlobals.bellNotifIcon
                          : isLight
                          ? LGlobals.icon
                          : DGlobals.icon
                      }
                    />
                  }
                  placeholderTextColor={
                    emailError
                      ? isLight
                        ? LGlobals.bellNotifIcon
                        : DGlobals.bellNotifIcon
                      : isLight
                      ? LGlobals.lighttext
                      : DGlobals.lighttext
                  }
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) {
                      setEmailError("Enter bloger email");
                    }
                  }}
                />

                <GetStartedInput
                  label={"bio"}
                  textAlignVertical={"top"}
                  height={150}
                  multipleline={true}
                  isMultiline={true}
                  placeholderTextColor={
                    bioError
                      ? isLight
                        ? LGlobals.bellNotifIcon
                        : DGlobals.bellNotifIcon
                      : isLight
                      ? LGlobals.lighttext
                      : DGlobals.lighttext
                  }
                  value={bio}
                  onChangeText={(text) => {
                    setBio(text);
                    if (bioError) {
                      setBioError("Enter bloger bio");
                    }
                  }}
                />
              </View>
            )}

            <View
              style={{
                justifyContent: "space-between",
                paddingHorizontal: "5%",
                gap: 20,
              }}
            >
              <Text
                onPress={() => setMore((val) => !val)}
                style={{
                  textAlign: "left",
                  textAlignVertical: "center",
                  paddingVertical: "1%",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight
                    ? DGlobals.background
                    : LGlobals.background,
                  borderWidth: 1,
                  paddingHorizontal: "5%",
                  borderRadius: 30,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
                children={more ? "Hide" : "show more"}
              />

              <Text
                onPress={handleCreate}
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  color: isLight ? LGlobals.text : DGlobals.text,
                  borderColor: isLight
                    ? DGlobals.background
                    : LGlobals.background,
                  borderWidth: 1,
                  width: "auto",
                  paddingHorizontal: "30%",
                  paddingVertical: "3%",
                  borderRadius: 30,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
                children={"create"}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateCommunityPages;

const styles = StyleSheet.create({});
