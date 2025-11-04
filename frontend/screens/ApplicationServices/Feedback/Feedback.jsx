import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNotif from "../Notifications/BottomNotif/BottomNotif";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import InputPost from "../../CreatePost/PostMethods/InputPost";
import SendIcon from "../../CreatePost/PostMethods/SendIcon";
import MainHeader from "../../GlobalScreens/MainHeader";
import RBOptionsSheet from "../../GlobalScreens/RBSheets/RBOptionsSheet";
import { CreateFeedback } from "./CreateFeedback";

function CreateView({}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const moreInfo = useRef([]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        borderBottomWidth: 0,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: "2%",
        marginVertical: 5,
        borderRadius: 7,
      }}
    >
      <RBOptionsSheet
        CommmentSheet={moreInfo}
        GetIcon={
          <Text
            style={{
              textAlign: "left",
              textAlignVertical: "center",
              color: isLight ? LGlobals.lighttext : LGlobals.lighttext,
              lineHeight: 40,
              fontSize: 25,
              fontWeight: 800,
            }}
          >
            Feedbacks help to modify, optimise, correct features of this app to
            function efficiently.
          </Text>
        }
        GetView={
          <View
            style={{
              paddingHorizontal: "2%",
              paddingVertical: "3%",
            }}
          >
            <Text
              style={{
                lineHeight: 20,
                color: isLight ? LGlobals.greyText : DGlobals.greyText,
                fontWeight: "500",
              }}
            >
              Feedbacks help to modify, optimise, correct features of this app
              to function efficiently.
            </Text>
          </View>
        }
        height={"auto"}
      />
    </TouchableOpacity>
  );
}

const Feedback = () => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const appFeedback = useGlobal((state) => state.appFeedback);
  const appNotif = useGlobal((state) => state.appNotif);

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");

  const [showInfor, setShowIfor] = useState(true);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  CreateFeedback.isKeyboardDismissed(setShowIfor, translateY, opacity);

  const handleSubmit = async () => {
    if (newFeedback.length === 0) {
      setAuth(true);
      setRes("Enter your feedback message.");
    } else {
      CreateFeedback.handleCreateFeedback(
        user,
        newFeedback,
        setNewFeedback,
        image,
        image1,
        setImage,
        setImage1,
        appFeedback
      );
      await appNotif();
    }
  };

  function onType(value) {
    setNewFeedback(value);
  }

  function HandleOk(params) {
    setAuth((value) => (value = false));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          header={
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "700",
                textTransform: "capitalize",
              }}
            >
              Feedback
            </Text>
          }
        />
      ),
    });
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        paddingTop: "2%",
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {Auth && <BottomNotif Auth={res} HandleOk={HandleOk} />}

      {showInfor && newFeedback ? (
        <View
          style={{
            marginTop: "2%",
            opacity: 0,
            height:0,
          }}
        >
          <CreateView />
        </View>
      ) : showInfor ? (
        <View
          style={{
            //   minHeight: "20%",
            marginTop: "2%",
          }}
        >
          <CreateView />
        </View>
      ) : (
        <View
          style={{
            opacity: 0,
            marginTop: "2%",
            height:0
          }}
        >
          <CreateView />
        </View>
      )}

      <View
        style={{
          flex: 1,
          paddingBottom: Dimensions.get("window").height * 0.03,
          justifyContent: "flex-end",
        }}
      >
        {image && (
          <View style={{ flexDirection: "row", gap: 5, marginVertical: "5%" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => CreateFeedback.pickImage(setImage, setImage1)}
              style={{
                width: "20%",
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

        <View
          style={{
            flex: newFeedback && 1,
            gap: 10,
            flexDirection: "column",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            justifyContent: newFeedback && "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
              paddingHorizontal: "1%",
              paddingVertical: "1%",
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              borderBottomLeftRadius: 13,
              borderBottomRightRadius: 13,
              borderWidth: 0,
              borderColor: isLight
                ? LGlobals.rbSheets.borderColor
                : DGlobals.rbSheets.borderColor,
              //   maxHeight: newFeedback && "65%",
            }}
          >
            <InputPost
              height={"auto"}
              minHeight={"30%"}
              textdescription={true}
              MoreIcons={true}
              post={false}
              borderRadius={0}
              postmessage={newFeedback}
              setPostMessage={onType}
              onSubmitEditing={handleSubmit}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 25,
                paddingHorizontal: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => CreateFeedback.pickImage(setImage, setImage1)}
              >
                <FontAwesomeIcon
                  icon="mountain-sun"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
            </View>

            <SendIcon onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({});
