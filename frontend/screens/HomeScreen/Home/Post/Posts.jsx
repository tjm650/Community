import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EmptyScreen from "../../../GlobalScreens/EmptyScreen";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import ActivityIndicate from "../../../GlobalScreens/ActivityIndicate";
import PostView from "./PostView";

////////////////////////////// Functions /////////////////////////////////
const Posts = ({
  onScroll,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  scrollEventThrottle,
  onScrollEndDrag,
  height,
  // PostList,
}) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";
  // const PostList = []
  const PostList = useGlobal((state) => state.PostList);
  const postsList = useGlobal((state) => state.postsList);
  const PostsNext = useGlobal((state) => state.PostsNext);
  const user = useGlobal((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     postsList();
  //   }, 1 * 60 * 1000); // 1 minutes in milliseconds
  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [postsList]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setloading(false);
    }, 1 * 60 * 200); // 0.5 minutes in milliseconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [loading]);

  return (
    <View style={{ flex: 1 }}>
      {PostList === null ? (
        <ActivityIndicate
          size={45}
          color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
        />
      ) : PostList.length === 0 ? (
        <EmptyScreen
          icon={
            <FontAwesomeIcon
              icon="fa-solid fa-house-circle-exclamation"
              size={50}
              color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
            />
          }
          btn={true}
          marginBottom={50}
          OnPressText={"Refresh"}
          color={
            isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground
          }
          text={"No Posts from any of your followers"}
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
            onMomentumScrollBegin={onMomentumScrollBegin}
            onMomentumScrollEnd={onMomentumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={scrollEventThrottle}
            data={PostList}
            onEndReached={() => {
              if (PostsNext) {
                postsList(PostsNext);
                setloading(true);
              }
            }}
            refreshControl={
              <RefreshControl
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} // Spinner colors
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                progressBackgroundColor={
                  isLight ? LGlobals.background : DGlobals.background
                }
                // refreshing={loading}
                onRefresh={postsList}
              />
            }
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
            renderItem={({ item }) => <PostView item={item} />}
            //    onRefresh={ loading ? () => LoadPosts() : null}
            //  refreshing={loading}
            keyExtractor={(item) => item.id}
            style={{}}
          />
        </View>
      )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({});
