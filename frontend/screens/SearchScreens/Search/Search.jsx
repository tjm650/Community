import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";

import SearchBlogs from "./SearchBlogs";
import SearchMarketing from "./SearchMarketing";
import SearchPeople from "./SearchPeople";
import SearchPosts from "./SearchPosts";
import SearchServices from "./SearchServices";
import SearchTopNav from "./SearchTopNav";

const Search = ({ val, focusTextInput, isLoading }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const screenWidth = Dimensions.get("window").width;
  const scrollX = useRef(new Animated.Value(0)).current;

  //   const searchlist = [];
  const searchlist = [{ k: "ryy" }];

  const appSearchUserList = useGlobal((state) => state.appSearchUserList);
  const appSearchBlogList = useGlobal((state) => state.appSearchBlogList);
  const appSearchNotif = useGlobal((state) => state.appSearchNotif);
  const appSearchPostList = useGlobal((state) => state.appSearchPostList);
  // const isLoading = useGlobal((state) => state.isLoading);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/* {val.length > 2 && <SearchTopNav />} */}
      <SearchTopNav
        DBFontSize={14}
        DBFontWeight={"500"}
        scrollX={scrollX}
        screenWidth={screenWidth}
      />

      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{
          // paddingHorizontal: "2%",
          paddingTop: "3%",
        }}
      >
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "0.5%",
          }}
          focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <SearchPosts
            isLoading={isLoading}
            appSearchList={appSearchPostList}
          />
        </View>

        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "0.5%",
          }}
          focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <SearchServices
            isLoading={isLoading}
            appSearchNotif={appSearchNotif}
          />
        </View>

        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "0.5%",
          }}
          focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <SearchBlogs
            isLoading={isLoading}
            appSearchBlogList={appSearchBlogList}
          />
        </View>

        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "0.5%",
          }}
          focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <SearchPeople
            isLoading={isLoading}
            appSearchUserList={appSearchUserList}
          />
        </View>

        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "0.5%",
          }}
          focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <SearchMarketing />
        </View>
      </ScrollView>

      {/* { appSearchList.length === 0 ? (
        <IconError LGlobals={LGlobals} DGlobals={DGlobals} isLight={isLight} />
      ) : (
       
      )} */}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
