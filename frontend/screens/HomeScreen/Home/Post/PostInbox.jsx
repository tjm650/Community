import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import PostInboxHeader from "../../../TopViews/HomeHeaders/PostInboxHeader";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PostBottomView from "./PostBottomView";
import RenderComment from "./PostComments/RenderComment";
import PostDetailsView from "./PostDetailsView";
import PostTopView from "./PostTopView";

const PostInbox = ({ route }) => {
  const data = route.params.data;
  const navigation = useNavigation();

  const [loading, setloading] = useState(false);

  const user = useGlobal((state) => state.user);
  const fetchPostComments = useGlobal((state) => state.fetchPostComments);
  const PostCommentsList = useGlobal((state) => state.PostCommentsList);
  const PostsCommentsNext = useGlobal((state) => state.PostsCommentsNext);
  const commentInteraction = useGlobal((state) => state.commentInteraction);
  const postInteraction = useGlobal((state) => state.postInteraction);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  function OpenProfile(data) {
    navigation.navigate("ProfileScreen", data);
  }

  const userId = user.id;
  const postId = data.id;

  const openPost = (data) => {
    navigation.navigate("PostInbox", { data: data });
    fetchPostComments(data.id);

    if (data.comments) {
      postInteraction(postId, userId, "interaction");
    } else {
      commentInteraction(postId, userId, "interaction");
    }
  };

  const OpenCommentScreen = (data) => {
    navigation.navigate("PostCommentScreen", { data: data });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <PostInboxHeader />,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
      }}
    >
      <FlatList
        data={data.comments && PostCommentsList}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View>
            <PostTopView item={data} />
            <PostDetailsView item={data} InboxDesc={true} openPost={openPost} />
            <PostBottomView OpenCommentScreen={OpenCommentScreen} item={data} />

            {data.comments && data.comments_count === 0 ? (
              <View
                style={{
                  borderBottomWidth: 0,
                  marginHorizontal: "3%",
                  paddingTop: "5%",

                  borderRadius: 100,
                  borderBottomColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: isLight ? LGlobals.icon : DGlobals.icon,
                    fontWeight: "700",
                  }}
                >
                  No comments for this post
                </Text>

                <FontAwesomeIcon
                  icon="fa-solid fa-comment-slash"
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </View>
            ) : data.comments && data.comments_count >= 1 ? (
              <Text
                style={{
                  color: isLight ? LGlobals.icon : DGlobals.icon,
                  alignSelf: "center",
                  fontWeight: "700",
                  borderTopWidth: 0.3,
                  textAlign: "center",
                  width: "100%",
                  paddingTop: "2%",
                  marginTop: "2%",
                  marginHorizontal: "3%",
                  borderRadius: 100,
                  borderTopColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                }}
              >
                Comments{"   "}
                <Text
                  style={{ fontSize: 16, fontWeight: 600, color: "#0D99FF" }}
                >
                  ⁘
                </Text>
              </Text>
            ) : (
              <View
                style={{
                  borderBottomWidth: 0,
                  marginHorizontal: "3%",
                  paddingTop: "5%",

                  borderRadius: 100,
                  borderBottomColor: isLight
                    ? LGlobals.borderColor
                    : DGlobals.borderColor,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: isLight ? LGlobals.icon : DGlobals.icon,
                    fontWeight: "700",
                  }}
                >
                  No comments for this post
                </Text>

                <FontAwesomeIcon
                  icon="fa-solid fa-comment-slash"
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                />
              </View>
            )}
          </View>
        }
        ListFooterComponent={
          data.comments && data.comments_count === 0 ? (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "5%",
                paddingTop: "2%",
              }}
            >
              •
            </Text>
          ) : data.comments && PostCommentsList.length === 0 ? (
            <ActivityIndicator
              size={"small"}
              color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              style={{
                paddingBottom: "10%",
              }}
            />
          ) : data.comments && loading ? (
            <ActivityIndicator
              size={"small"}
              color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              style={{
                paddingVertical: "5%",
              }}
            />
          ) : (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "5%",
                paddingTop: "2%",
              }}
            >
              •
            </Text>
          )
        }
        renderItem={({ item }) => (
          <RenderComment
            isPostInbox={true}
            item={item}
            OpenCommentScreen={OpenCommentScreen}
          />
        )}
        style={{
          paddingVertical: "3%",
          flex: 1,
        }}
        onEndReached={() => {
          if (PostsCommentsNext) {
            fetchPostComments(postId, PostsCommentsNext);
            setloading(true);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default PostInbox;

const styles = StyleSheet.create({});
