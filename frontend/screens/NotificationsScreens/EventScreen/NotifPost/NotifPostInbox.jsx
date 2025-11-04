import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import FeedSkeleton from "@/components/FeedSkeleton";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import NotifPostInboxHeader from "../../../TopViews/NotifsHeaders/NotifPostInboxHeader";
import NotifPostInteractions from "../NotifPostInteractions";
import NotifPostRenderComment from "./NotifPostComment/NotifPostRenderComment";
import NotifPostDetails from "./NotifPostDetails";
import NotifPostTopView from "./NotifPostTopView";

const NotifPostInbox = ({ route }) => {
  const data = route.params.data;
  // // const duration = props.route.params.duration;
  // const image = props.route.params.image;
  // const description = props.route.params.time;
  // const profileimg = props.route.params.profileimg;
  // const name = props.route.params.name;
  // const directoryStatus = props.route.params.directoryStatus;
  // const sender = props.route.params.sender;
  // const UpdateType = props.route.params.UpdateType;
  // const verified = props.route.params.verified;
  // const time = props.route.params.time;

  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);
  const user = useGlobal((state) => state.user);

  const fetchNotifPostComments = useGlobal(
    (state) => state.fetchNotifPostComments
  );
  const notifPostCommentsList = useGlobal(
    (state) => state.notifPostCommentsList
  );
  const notifPostsCommentsNext = useGlobal(
    (state) => state.notifPostsCommentsNext
  );

  const userId = user.id;
  const postId = data.id;

  const NotifPostCommentScreen = (data) => {
    navigation.navigate("NotifPostCommentScreen", { data: data });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <NotifPostInboxHeader />,
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
        data={data.comments && notifPostCommentsList}
        ListEmptyComponent={
          data.comments && notifPostCommentsList === null ? (
            <FeedSkeleton rows={4} compact />
          ) : null
        }
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View
          style={{ 
            paddingHorizontal:"3%"
          }}
          >
           <NotifPostTopView
          time={utils.CalendarPostTime(data.created)}
          name={data.service ? data.service.username : data.sender.username}
          profileimg={
            data.service
              ? data.service.profile_image
              : data.sender.profile_image
          }
          directoryStatus={
            data.service
              ? data.service.directory_status1
              : data.sender.directory_status1
          }
          item={data}
          verified={data.service ? data.service.verified : data.sender.verified}
        />

            <NotifPostDetails
            isInbox={true}
              image={data.image}
              item={data}
              description={data.description}
              sender={data.sender.username}
            />
            <NotifPostInteractions
              NotifPostCommentScreen={NotifPostCommentScreen}
              item={data}
            />

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
          ) : data.comments && notifPostCommentsList.length === 0 ? (
            <Text
              style={{
                color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
                textAlign: "center",
                width: "100%",
                paddingBottom: "10%",
              }}
            >
              •
            </Text>
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
          <NotifPostRenderComment
            isPostInbox={true}
            item={item}
            NotifPostCommentScreen={NotifPostCommentScreen}
          />
        )}
        style={{
          paddingVertical: "3%",
          flex: 1,
        }}
        onEndReached={() => { 
          if (notifPostsCommentsNext) {
            fetchNotifPostComments(postId, notifPostsCommentsNext);
            setloading(true);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default NotifPostInbox;

const styles = StyleSheet.create({});
