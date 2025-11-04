import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
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
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import utils from "@/assets/core/utils";
import FeedSkeleton from "@/components/FeedSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native";
import NotifPostRenderComment from "../EventScreen/NotifPost/NotifPostComment/NotifPostRenderComment";
import ForumNavigation from "./ForumNavigation";
import HosterDetails from "./HosterDetails";
import LiveForumPageHeader from "./LiveForumPageHeader";
//======================================================================================

const LiveForumPage = ({ route }) => {
  const navigation = useNavigation();
  const name = route.params.extra_data.name;
  const contesterFullName = route.params.extra_data.sender_name;
  const contesterUsername = route.params.extra_data.sender_username;
  const profileimg = route.params.extra_data.sender_profile_image;
  const image = route.params.image;
  const description = route.params.description;
  const item = route.params;
  const data = item;
  const Topic = route.params.extra_data.topic;
  let futureDate = route.params.extra_data
    ? route.params.extra_data.end_date
    : 0;

  //console.log("user: ",user)
  //console.log("host: ",contester)

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [countdown2, setCountdown2] = useState("0");

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

  useEffect(() => {
    let interval2;
    if (futureDate) {
      interval2 = setInterval(
        () => utils.Countdown2(futureDate, setCountdown2),
        1000
      );
    }

    return () => clearInterval(interval2); // Cleanup on unmount
  }, [futureDate]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setloading(false);
    }, 1 * 60 * 200); // 0.5 minutes in milliseconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [loading]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <LiveForumPageHeader
          count_down2={countdown2}
          profileimg={profileimg}
          name={name}
          contester={contesterFullName}
          item={item}
          directoryStatus={
            item.service
              ? item.service.directory_status1
              : item.sender.directory_status1
          }
          verified={item.service ? item.service.verified : item.sender.verified}
        />
      ),
    });
  }, [countdown2]);

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
              borderBottomWidth: 0,
              borderBottomColor: isLight
                ? LGlobals.borderColor
                : DGlobals.borderColor,
            }}
          >
            <HosterDetails
              item={item}
              count_down2={countdown2}
              sender_name={contesterFullName}
              sender_username={contesterUsername}
              description={description}
              subject={Topic}
              image={image}
              // countdown2={countdown2}
            />
            <ForumNavigation
              count_down={countdown2}
              item={item}
              NotifPostCommentScreen={NotifPostCommentScreen}
              showMarkSuccefull={true}
              showCountDown={countdown2 && countdown2 != 0 && true}
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
          <NotifPostRenderComment
            isPostInbox={true}
            item={item}
            NotifPostCommentScreen={NotifPostCommentScreen}
          />
        )}
        style={{
          paddingBottom: "3%",
          flex: 1,
          paddingHorizontal: "2%",
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

export default LiveForumPage;

const styles = StyleSheet.create({});
