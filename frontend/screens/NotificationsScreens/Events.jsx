import { Animated, RefreshControl, StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import FeedSkeleton from "@/components/FeedSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import EmptyScreen from "../GlobalScreens/EmptyScreen";

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import NotifLiveView from "./EventScreen/NotifLive/NotifLiveView";
import PollLiveView from "./EventScreen/NotifLive/PollLiveView";
import NotifPostView from "./EventScreen/NotifPost/NotifPostView";
import LiveForum from "./LiveForumScreen/LiveForum";

function NotifView({ item, user, isExplore }) {
  const navigation = useNavigation();


  return item.update_type == "Event" ? (
    <NotifLiveView
      duration={item.duration}
      description={item.description}
      time={item.time}
      venue={item.venue}
      date={item.date}
      title={item.title}
      name={item.name}
      profileimg={item.profileimg}
      image={item.image}
      directoryStatus={item.directoryStatus}
      UpdateType={item.update_type}
      item={item}
      sender={item.sender}
      extra_data = {item.extra_data}
    />
  ) : item.update_type == "Update" ? (
    <NotifPostView item={item} />
  ) : item.update_type == "LiveForum" ? (
    <LiveForum
      item={item}
    />
  ) : item.update_type == "Poll" ? (
    <PollLiveView
      image={item.image}
      description={item.description}
      time={item.time}
      profileimg={item.profileimg}
      name={item.name}
      directoryStatus={item.directoryStatus}
      extra_data={item.extra_data}
      item={item}
      sender={item.sender}
    />
  ) : null
}

const Events = ({
  onScroll,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  scrollEventThrottle,
  onScrollEndDrag,
  height,
  isExplore = true,
}) => {
  const [loading, setloading] = useState(false);
  const { theme } = useGlobal();
  let isLight = theme === "light";
  // const notifList = []
  // const PostList = []
  const notifList = useGlobal((state) => state.notifList);
  const PostList = useGlobal((state) => state.PostList);

  const Posts = PostList.map((post) => ({ ...post, date: post.created }));
  const ServicePosts = notifList.map((service) => ({
    ...service,
    date: service.created,
  }));

  const Data = [...Posts, ...ServicePosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const notificationList = useGlobal((state) => state.notificationList);
  const notifNext = useGlobal((state) => state.notifNext);
  const user = useGlobal((state) => state.user);

  const uniqueData = Array.from(new Set(notifList.map((item) => item.id))).map(
    (id) => notifList.find((item) => item.id === id)
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     notificationList();
  //   }, 2 * 60 * 1000); // 2 minutes in milliseconds
  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [notificationList]);

  return (
    <View style={{ flex: 1, paddingTop: "0%" }}>
      {notifList === null ? (
        <FeedSkeleton rows={6} />
      ) : notifList.length === 0 ? (
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-house-circle-exclamation"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          text={"No notifications from any of services you follow"}
          btn={true}
          marginBottom={50}
          OnPressText={"Refresh"}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <Animated.FlatList
            contentContainerStyle={{
              marginTop: height,
              paddingBottom: "50%",
            }}
            onScroll={onScroll}
            showsVerticalScrollIndicator={false}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={scrollEventThrottle}
            data={notifList}
            renderItem={({ item }) => (
              <NotifView  user={user} item={item} />
            )}
            refreshControl={
              <RefreshControl
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} // Spinner colors
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                progressBackgroundColor={
                  isLight ? LGlobals.background : DGlobals.background
                }
                refreshing={loading}
                onRefresh={notificationList}
              />
            }
            // onEndReached={() => {
            //   if (notifNext) {
            //     notificationList(notifNext);
            //     setloading(true);
            //   }
            // }}
            refreshing={loading}
            keyExtractor={(item) => item.UpdateType + item.id.toString()}
            // keyExtractor={(item) => `${item.UpdateType}_${item.id}`}
            style={{}}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
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
          />
        </View>
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
