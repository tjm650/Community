import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { useNavigation } from "@react-navigation/native";
import ActivityIndicate from "../../ActivityIndicate";

import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import BlogView from "../../../HomeScreen/Home/DailyBlog/BlogView";
import NotifLiveView from "../../../NotificationsScreens/EventScreen/NotifLive/NotifLiveView";
import NotifPostView from "../../../NotificationsScreens/EventScreen/NotifPost/NotifPostView";
import LiveForum from "../../../NotificationsScreens/LiveForumScreen/LiveForum";
import { ServiceNotifications } from "./ServicePostsFunctions";

function NotifView({ item, user }) {
  const navigation = useNavigation();

  function OpenLiveForumPage(params) {
    navigation.navigate("LiveForumPage", item);
  }

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
      UpdateType={item.UpdateType}
      item={item}
      sender={item.sender}
    />
  ) : item.update_type == "Update" ? (
    <NotifPostView item={item} />
  ) : item.update_type == "LiveForum" ? (
    <LiveForum
      user={user}
      onPress={OpenLiveForumPage}
      Topic={item.Topic}
      contester={item.contester}
      duration={item.duration}
      description={item.description}
      time={item.time}
      name={item.name}
      profileimg={item.profileimg}
      image={item.image}
      directoryStatus={item.directoryStatus}
      UpdateType={item.UpdateType}
    />
  ) : null;
}

const ServicePosts = ({
  serviceName,
  directory_status1,
  verified,
  creator,
  followers,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);
  const [seePostList, setsSetPostList] = useState(false);

  const notifList = useGlobal((state) => state.notifList);
  const notificationList = useGlobal((state) => state.notificationList);
  const notifNext = useGlobal((state) => state.notifNext);

  const BlogList = useGlobal((state) => state.BlogList);
  const DailyBlogList = useGlobal((state) => state.DailyBlogList);
  const blogsNext = useGlobal((state) => state.blogsNext);

  const user = useGlobal((state) => state.user);

  const emptyPosts = [];
  const posts = ServiceNotifications.getServicePosts(
    directory_status1,
    notifList,
    DailyBlogList,
    serviceName
  );

  const serviceView = ServiceNotifications.getServiceView(directory_status1);

  const onEndReached = ServiceNotifications.onEndReached(
    setloading,
    notifNext,
    notificationList,
    blogsNext,
    BlogList,
    directory_status1
  );

  const directoryList = useGlobal((state) => state.directoryList);
  const searchUsers = useGlobal((state) => state.searchUsers);

  const findService = directoryList.find((val) => val.username === serviceName);

  const findCreator = creator && creator === user.username;

  const findFollower =
    followers && followers.find((val) => val.username === user.username);
  const isFollower = findFollower && findFollower.username === user.username;
  console.log("isFollower------>", isFollower);

  const handleSeePosts = async () => {
    await notificationList();
    await setloading(true);
    await setsSetPostList(true);
  };

  const handleRequestFollow = async () => {
    await directoryList;
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setloading(false);
    }, 1 * 60 * 200); // 0.2 minutes in milliseconds

    const interval = setInterval(() => {
      directoryList;
      // setloading(false);
    }, 1 * 60 * 200); // 0.2 minutes in milliseconds
    return () => clearInterval(timeOut, interval); // Clean up the interval on unmount
  }, [loading, searchUsers, directoryList]);

  //   directoryList.some(
  //   (name) =>
  //     name.username.replace(/\s+/g, " ").trim().toLowerCase() ===
  //     trimName.toLowerCase()
  // )

  const UserOptions = ({
    icon,
    color,
    textColor,
    optionDesc,
    disabled,
    onPress,
    getView,
    defaultIconSize = true,
    defaultIcon = false,
  }) => {
    return (
      <View
        style={{
          alignItems: "center",
          width: 54,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.5}
          disabled={disabled}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2%",
            marginBottom: "5%",
            paddingBottom: "2%",
            paddingHorizontal: "3%",
            width: 50,
            aspectRatio: 1,
            borderRadius: "50%",
            // borderTopRightRadius: 10,
            // borderTopLeftRadius: 10,
            // borderBottomRightRadius: 10,
            // borderBottomLeftRadius: 10,
            // backgroundColor: color,
            borderWidth: 1,
            borderColor: isLight ? LGlobals.icon : DGlobals.icon,
          }}
        >
          <FontAwesomeIcon
            icon={defaultIcon ? "user" : icon}
            size={defaultIconSize ? 25 : 0.001}
            color={color}
          />
          {getView}
        </TouchableOpacity>

        <Text
          style={{
            color: textColor,
            fontWeight: 600,
            fontSize: 12,
            lineHeight: 17,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {optionDesc}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        paddingHorizontal: "1%",
      }}
    >
      {posts.length === null ? (
        <ActivityIndicate
          marginTop={"0%"}
          size={60}
          color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={seePostList ? posts.posts : emptyPosts}
            renderItem={
              serviceView.dsS
                ? ({ item }) => <NotifView user={user} item={item} />
                : serviceView.dsB && (({ item }) => <BlogView item={item} />)
            }
            refreshControl={
              <RefreshControl
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} // Spinner colors
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                progressBackgroundColor={
                  isLight ? LGlobals.background : DGlobals.background
                }
                refreshing={loading}
                onRefresh={serviceView.dsS ? notificationList : BlogList}
              />
            }
            ListHeaderComponent={
              <ScrollView
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                // pagingEnabled
                horizontal
                style={{
                  flex: 1,
                  marginVertical: "5%",
                  rowGap: 50,
                  maxwidth: Dimensions.get("window").width * 0.6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: Dimensions.get("window").width * 0.6,
                    justifyContent: "space-between",
                    // marginRight: "15%",
                    marginRight: Dimensions.get("window").width / 10,
                  }}
                >
                  <UserOptions
                    onPress={handleSeePosts}
                    icon={"fa-regular fa-comments"}
                    color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                    optionDesc={"Posts"}
                    textColor={isLight ? LGlobals.text : DGlobals.text}
                  />

                  {!findCreator && !isFollower && (
                    <UserOptions
                      // onPress={handleRequestConnect}
                      icon={"fa-solid fa-industry"}
                      color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                      optionDesc={"follow"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  )}

                  {!findCreator && isFollower && (
                    <UserOptions
                      disabled={true}
                      defaultIconSize={
                        !findFollower.profile_image ? true : false
                      }
                      defaultIcon={true}
                      getView={
                        isFollower &&
                        findFollower.profile_image && (
                          <View
                            style={{
                              width: 50,
                              aspectRatio: 1,
                              borderRadius: 50,
                              borderColor: "#d0d0d0",
                              alignItems: "center",
                              justifyContent: "center",
                              // backgroundColor: "#d0d0d0",
                              backgroundColor: "#5a5a5b",
                              overflow: "hidden",
                              borderWidth: 1,
                              borderColor: isLight
                                ? LGlobals.icon
                                : DGlobals.icon,
                            }}
                          >
                            <Image
                              style={{
                                height: 50,
                                width: 50,
                                resizeMode: "cover",
                                // marginTop:500
                              }}
                              source={utils.GetImage(
                                findFollower.profile_image
                              )}
                            />
                          </View>
                        )
                      }
                      color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                      optionDesc={"following"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  )}

                  {!findCreator && (
                    <UserOptions
                      icon={"fa-regular fa-bell"}
                      color={
                        isLight
                          ? LGlobals.bellNotifIcon
                          : DGlobals.bellNotifIcon
                      }
                      optionDesc={"Report"}
                      textColor={
                        isLight
                          ? LGlobals.bellNotifIcon
                          : DGlobals.bellNotifIcon
                      }
                    />
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    width: Dimensions.get("window").width * 0.4,
                    justifyContent: "space-between",
                    marginRight: Dimensions.get("window").width / 10,
                  }}
                >
                  <UserOptions
                    icon={"fa-solid fa-circle-info"}
                    color={isLight ? LGlobals.icon : DGlobals.icon}
                    optionDesc={"infor"}
                    textColor={isLight ? LGlobals.text : DGlobals.text}
                  />
                </View>
              </ScrollView>
            }
            onEndReached={() => onEndReached}
            refreshing={loading}
            keyExtractor={(item) => item.id.toString()}
            style={{ paddingHorizontal: "2%" }}
            ListFooterComponent={
              posts.posts === null ? (
                <ActivityIndicator
                  size={"small"}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                />
              ) : loading ? (
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

export default ServicePosts;

const styles = StyleSheet.create({});
