import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SendIcon from "../../../../CreatePost/PostMethods/SendIcon";
import { CreateNotifComment } from "./CreateNotifPostComment";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import BottomNotif from "../../../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import InputPost from "../../../../CreatePost/PostMethods/InputPost";
import UserDetailsView from "../../../../CreatePost/UserDetailsView";
import NotifPostOnCommenting from "./NotifPostOnCommenting";

const NotifPostCommentScreen = ({ route }) => {
  const navigation = useNavigation();

  const item = route.params.data;

  const notifPostCommentsList = useGlobal(
    (state) => state.notifPostCommentsList
  );
  const sendNotifPostComment = useGlobal((state) => state.sendNotifPostComment);
  const user = useGlobal((state) => state.user);

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  const [showInfor, setShowIfor] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  CreateNotifComment.isKeyboardDismissed(setShowIfor, translateY, opacity);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const postId = item.id;

  const handleSubmit = async () => {
    if (newComment.length === 0) {
      setAuth(true);
      setRes("Enter your comment to send.");
    } else if (newComment.length >= 150 && !user.verified) {
      setAuth(true);
      setRes(
        "reached maximum number of words, get verified for unlimited messages."
      );
    } else {
      const nav = navigation.goBack() 
      CreateNotifComment.handleCreateComment(
        nav,
        postId,
        user,
        newComment,
        setNewComment,
        notifPostCommentsList,
        image,
        image1,
        setImage,
        setImage1,
        sendNotifPostComment
      );
    }
  };

  function onType(value) {
    setNewComment(value);
  }

  function HandleOk(data) {
    setAuth((value) => (value = false));
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "2%",
        paddingTop: "2%",
        backgroundColor: isLight
          ? "rgba(151, 208, 215, 0.54)"
          : "rgba(2, 28, 32, 0.81)",
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

      {showInfor && newComment ? (
        <View
          style={{
            marginTop: "2%",
            opacity: 0.3,
          }}
        >
          <NotifPostOnCommenting item={item} />
        </View>
      ) : (
        showInfor && (
          <View
            style={{
              //   minHeight: "20%",
              marginTop: "2%",
            }}
          >
            <NotifPostOnCommenting item={item} />
          </View>
        )
      )}

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
              onPress={() => CreateNotifComment.pickImage(setImage, setImage1)}
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
            flex: newComment && 1,
            gap: 10,
            flexDirection: "column",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            justifyContent: newComment && "flex-end",
          }}
        >
          <View
            style={{
              marginVertical: "5%",
              marginHorizontal: "3%",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 12,
                borderBottomWidth: 0,
                borderColor: "#d0d0d0",
                borderRadius: 10,
                paddingHorizontal: "5%",
                paddingVertical: "1%",
                backgroundColor: isLight
                  ? LGlobals.buttonBackground
                  : DGlobals.buttonBackground,
                width: 90,
              }}
            >
              Comment
            </Text>

            <Text
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: 600,
              }}
            >
              @ {item.service.username}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: isLight
                ? LGlobals.rbSheets.background
                : DGlobals.rbSheets.background,
              paddingHorizontal: "1%",
              paddingVertical: "1%",
              borderTopLeftRadius: 13,
              borderTopRightRadius: 13,
              borderBottomLeftRadius: 13,
              borderBottomRightRadius: 13,
              borderWidth: 0.3,
              borderColor: isLight
                ? LGlobals.rbSheets.borderColor
                : DGlobals.rbSheets.borderColor,
              maxHeight: newComment && "65%",
            }}
          >
            <InputPost
              height={"auto"}
              textdescription={true}
              MoreIcons={true}
              post={false}
              showAdd={false}
              borderRadius={0}
              postmessage={newComment}
              setPostMessage={onType}
              onSubmitEditing={handleSubmit}
              //   onPressIn={CreateComment.hideView(setShowIfor, translateY, opacity)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
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
              <TouchableOpacity
                onPress={() =>
                  CreateNotifComment.pickImage(setImage, setImage1)
                }
              >
                <FontAwesomeIcon
                  icon="mountain-sun"
                  size={20}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <FontAwesomeIcon
                  icon="fa-solid fa-paperclip"
                  size={19}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </TouchableOpacity>
            </View>

            <SendIcon
              // disabled={!newComment.trim()}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotifPostCommentScreen;

const styles = StyleSheet.create({});
