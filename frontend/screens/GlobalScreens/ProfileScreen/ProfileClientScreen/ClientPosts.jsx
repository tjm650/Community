import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
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
import utils from "@/assets/core/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PostView from "../../../HomeScreen/Home/Post/PostView";
import ActivityIndicate from "../../ActivityIndicate";
import { ClientUserPosts } from "./ClientPostsFunctions";

const ClientPosts = ({
  directory_status1,
  clientName,
  verified,
  market_agreement,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);
  const [seePostList, setsSetPostList] = useState(false);

  const PostList = useGlobal((state) => state.PostList);
  const postsList = useGlobal((state) => state.postsList);
  const PostsNext = useGlobal((state) => state.PostsNext);
  // const seePostList = useGlobal((state) => state.PostsNext);

  const user = useGlobal((state) => state.user);
  const ConnectList = useGlobal((state) => state.ConnectList);
  const searchlist = useGlobal((state) => state.searchlist);
  const searchUsers = useGlobal((state) => state.searchUsers);
  const requestConnect = useGlobal((state) => state.requestConnect);

  const findConnect = ConnectList.find(
    (val) => val.connect.username === clientName
  );
  const findSearchedConnect =
    searchlist && searchlist.find((val) => val.username === clientName);
  const findSearchedConnectStatus =
    findSearchedConnect && findSearchedConnect.status;
  // const findConnect = ConnectList.some(
  //       (name) =>
  //         name.username.replace(/\s+/g, " ").trim().toLowerCase() ===
  //         clientName.toLowerCase()
  //     )

  const emptyPosts = [];
  const posts = ClientUserPosts.getClientPosts(PostList, clientName);

  const onEndReached = ClientUserPosts.onEndReached(
    setloading,
    PostsNext,
    postsList
  );

  const handleSeePosts = async () => {
    await postsList();
    await setloading(true);
    await setsSetPostList(true);
  };

  const handleRequestConnect = async () => {
    await requestConnect(clientName);
    await searchUsers(clientName);
    await ConnectList;
  };

  useEffect(() => {
    // console.log(
    //   "findSearchedConnectStatus-------->",
    //   findSearchedConnect && findSearchedConnectStatus
    // );
    const timeOut = setTimeout(() => {
      // console.log("searchUsers-------->", searchlist && searchlist);
      setloading(false);
      searchUsers(clientName);
    }, 1 * 60 * 200); // 0.2 minutes in milliseconds
    const interval = setInterval(() => {
      ConnectList;
      // searchUsers(clientName);
      // console.log("searchUsers-------->", searchlist && searchlist);
      setloading(false);
    }, 1 * 60 * 200); // 0.2 minutes in milliseconds
    return () => clearInterval(timeOut, interval); // Clean up the interval on unmount
  }, [loading, searchUsers, ConnectList]);

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
          showsVerticalScrollIndicator={false}
            data={seePostList ? posts.posts : emptyPosts}
            renderItem={({ item }) => <PostView item={item} />}
            refreshControl={
              <RefreshControl
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} // Spinner colors
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                progressBackgroundColor={
                  isLight ? LGlobals.background : DGlobals.background
                }
                refreshing={loading}
                onRefresh={postsList}
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
                    width:
                      Dimensions.get("window").width *
                      (user.username === clientName && market_agreement ? 0.4 : 0.6),
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

                  {searchlist &&
                  user.username !== clientName &&
                  findSearchedConnect &&
                  findSearchedConnectStatus == "pending_them" ? (
                    <UserOptions
                      disabled={true}
                      icon={"fa-solid fa-user-lock"}
                      optionDesc={"pending connect"}
                      color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  ) : (
                    user.username !== clientName &&
                    !findConnect && (
                      <UserOptions
                        onPress={handleRequestConnect}
                        icon={"fa-regular fa-user"}
                        color={
                          isLight ? LGlobals.lighttext : DGlobals.lighttext
                        }
                        optionDesc={"connect"}
                        textColor={isLight ? LGlobals.text : DGlobals.text}
                      />
                    )
                  )}

                  {user.username !== clientName && findConnect && (
                    <UserOptions
                      onPress={() =>
                        navigation.navigate("MesssageInbox", findConnect)
                      }
                      defaultIconSize={
                        !findConnect.connect.profile_image ? true : false
                      }
                      defaultIcon={true}
                      getView={
                        findConnect.connect.profile_image && (
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
                                findConnect.connect.profile_image
                              )}
                            />
                          </View>
                        )
                      }
                      color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
                      optionDesc={"message"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  )}

                  {user.username !== clientName && (
                    <UserOptions
                      icon={"fa-solid fa-user-shield"}
                      color={isLight ? LGlobals.icon : DGlobals.icon}
                      optionDesc={verified ? "verified" : "unverified"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  )}

                  {user.username === clientName && market_agreement && (
                    <UserOptions
                      icon={"fa-solid fa-store"}
                      color={isLight ? LGlobals.icon : DGlobals.icon}
                      optionDesc={"Business"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
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
                  {user.username !== clientName && market_agreement && (
                    <UserOptions
                      icon={"fa-solid fa-store"}
                      color={isLight ? LGlobals.icon : DGlobals.icon}
                      optionDesc={"Business"}
                      textColor={isLight ? LGlobals.text : DGlobals.text}
                    />
                  )}

                  {user.username !== clientName && (
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
              </ScrollView>
            }
            onEndReached={() => onEndReached}
            refreshing={loading}
            keyExtractor={(item) => item.id.toString()}
            style={{}}
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
                  style={{
                    marginVertical: "5%",
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
          />
        </View>
      )}
    </View>
  );
};

export default ClientPosts;

const styles = StyleSheet.create({});
