import {
  ActivityIndicator,
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

import React, { useLayoutEffect, useEffect, useState } from "react";

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import ActivityIndicate from "../../../GlobalScreens/ActivityIndicate";
import EmptyScreen from "../../../GlobalScreens/EmptyScreen";
import BlogView from "./BlogView";
import MainHeader from "@/screens/GlobalScreens/MainHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { trackPageVisit } from "@/assets/common/core/storeContext/amonetization/analytics";
import { formatNumber } from "@/assets/common/utils/numberFormat";

//////////////////////// Functions //////////////////////////////////////////////////////

const DailyBlog = ({
  onScroll,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  scrollEventThrottle,
  onScrollEndDrag,
  height,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const BlogList = useGlobal((state) => state.BlogList);
  const DailyBlogList = useGlobal((state) => state.DailyBlogList);
  // const DailyBlogList =[]
  const blogsNext = useGlobal((state) => state.blogsNext);

  const [loading, setloading] = useState(false);

  function OpenCreateBlog(params) {
    navigation.navigate("CreateBlog");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          getView={
            <Text
              children="Blogs"
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                backgroundColor: isLight
                  ? LGlobals.background
                  : DGlobals.background,

                fontSize: 20,
                fontWeight: 500,
              }}
            />
          }
          // header={
          //   <TouchableOpacity onPress={OpenCreateBlog}>
          //     <MaterialIcons
          //       name="add-home-work"
          //       size={20}
          //       color={isLight ? LGlobals.icon : "#fff"}
          //     />
          //   </TouchableOpacity>
          // }
        />
      ),
    });
  }, []);

  ////////////////////////////// Functions //////////////////////////////////////////

  // Track page visit when component mounts
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Only track if the function exists
        if (typeof trackPageVisit === 'function') {
          const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const userAgent = 'React Native App';
          await trackPageVisit('Blogs', sessionId, userAgent);
        }
      } catch (error) {
        console.error('Error tracking blogs visit:', error);
      }
    };
    trackVisit();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     BlogList();
  //   }, 1 * 60 * 1000);     // 1 minutes in milliseconds
  //   return () => clearInterval(interval); // Clean up the interval on unmount
  // }, [BlogList]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      {DailyBlogList === null ? (
        <ActivityIndicate
          size={45}
          color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
        />
      ) : DailyBlogList.length === 0 ? (
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
          text={"No udates from blogers you follow"}
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
            data={DailyBlogList}
            renderItem={({ item }) => <BlogView item={item} />}
            // onEndReached={() => {
            //   if (blogsNext) {
            //     BlogList(blogsNext);
            //     setloading(true);
            //   }
            // }}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator
                  size={"small"}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                />
              ) : null
            }
            refreshControl={
              <RefreshControl
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]} // Spinner colors
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                progressBackgroundColor={
                  isLight ? LGlobals.background : DGlobals.background
                }
                // // refreshing={loading}
                // onRefresh={BlogList}
              />
            }
            refreshing={loading}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default DailyBlog;

const styles = StyleSheet.create({});
