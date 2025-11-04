import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import useGlobal from "@/assets/core/useGlobal";
import FeedSkeleton from "@/components/skeletons/FeedSkeleton";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import BlogView from "@/screens/HomeScreen/Home/DailyBlog/BlogView";
import Animated from "react-native-reanimated";

const SearchBlogs = ({ appSearchBlogList, isLoading }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  console.log("Searched data:-->", appSearchBlogList);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {appSearchBlogList === null && isLoading && <FeedSkeleton rows={4} />}

      <Animated.FlatList
        contentContainerStyle={{
          marginTop: "5%",
          paddingBottom: "30%",
        }}
        showsVerticalScrollIndicator={false}
        data={appSearchBlogList}
        renderItem={({ item }) =>     <BlogView item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !isLoading && (
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              No results for blogs found
            </Text>
          )
        }
      />

      {/* {appSearchList.map((item, index) => (
        <RenderItemPost key={index} item={item} />
      ))} */}
    </View>
  );
};

export default SearchBlogs;

const styles = StyleSheet.create({});
