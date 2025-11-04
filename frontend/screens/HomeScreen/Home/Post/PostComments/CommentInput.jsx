import React, { useState } from "react";
import {
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
import { LGlobals } from "@/constants/LightColor/LGlobals";

//====================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomNotif from "../../../../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import InputPost from "../../../../CreatePost/PostMethods/InputPost";
import SendIcon from "../../../../CreatePost/PostMethods/SendIcon";
import UserDetailsView from "../../../../CreatePost/UserDetailsView";
import { CreateComment } from "./CreatePostComment";

const CommentInput = ({
  minHeight,
  item,
  closeCommenting,
  setCloseCommenting,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const fetchPostComments = useGlobal((state) => state.fetchPostComments);
  const PostCommentsList = useGlobal((state) => state.PostCommentsList);

  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  //   const [newComment, setNewComment] = useState("");

  const sendPostComment = useGlobal((state) => state.sendPostComment);
  const user = useGlobal((state) => state.user);

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
      CreateComment.handleCreateComment(
        postId,
        user,
        newComment,
        setNewComment,
        PostCommentsList,
        image,
        image1,
        setImage,
        setImage1,
        sendPostComment,
        closeCommenting,
        setCloseCommenting,
      );
    }
  };

  function onType(value) {
    setNewComment(value);
  }

  function HandleOk(params) {
    setAuth((value) => (value = false));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: "1%",
        // backgroundColor: "red",
        // maxHeight: Dimensions.get("window").height * 0.8,
        // justifyContent: "space-between",
        // flexDirection:"column"
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
          //   paddingBottom: Dimensions.get("window").height * 0.01,
          justifyContent: "flex-end",
        }}
      >
        {image && (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => CreateComment.pickImage(setImage, setImage1)}
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
            marginVertical: "5%",
            marginHorizontal: "5%",
            flexDirection: "row",
            gap: 10,
          }}
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
              width: 90,
            }}
          >
            Comment
          </Text>
          <Text
            style={{
              color: DGlobals.text,
              fontWeight: 800,
              width: 90,
            }}
          >
            @{item.sender.name}
          </Text>
        </View>

        <View
          style={{
            gap: 10,
            flexDirection: "column",
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,
            paddingVertical: "5%",
          }}
        >
          <InputPost
            height={minHeight}
            textdescription={true}
            MoreIcons={true}
            post={false}
            showAdd={false}
            borderRadius={0}
            postmessage={newComment}
            setPostMessage={onType}
            onSubmitEditing={handleSubmit}
          />

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
                onPress={() => CreateComment.pickImage(setImage, setImage1)}
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

            <SendIcon disabled={!newComment.trim()} onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentInput;

const styles = StyleSheet.create({});
