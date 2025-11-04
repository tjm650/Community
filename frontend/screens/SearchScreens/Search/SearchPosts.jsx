import useGlobal from "@/assets/core/useGlobal";
import FeedSkeleton from "@/components/skeletons/FeedSkeleton";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

import PostView from "@/screens/HomeScreen/Home/Post/PostView";

//import { Globals } from "../..//DarkColor";

// const RenderItemPost = ({ item }) => {
//   return item.update_type && item.update_type == "Event" ? (
//     <NotifLiveView
//       duration={item.duration}
//       description={item.description}
//       time={item.time}
//       venue={item.venue}
//       date={item.date}
//       title={item.title}
//       name={item.name}
//       profileimg={item.profileimg}
//       image={item.image}
//       directoryStatus={item.directoryStatus}
//       UpdateType={item.UpdateType}
//       item={item}
//       sender={item.sender}
//     />
//   ) : item.update_type && item.update_type == "Update" ? (
//     <NotifPostView item={item} />
//   ) : item.update_type && item.update_type == "LiveForum" ? (
//     <LiveForum
//       user={user}
//       onPress={OpenLiveForumPage}
//       Topic={item.Topic}
//       contester={item.contester}
//       duration={item.duration}
//       description={item.description}
//       time={item.time}
//       name={item.name}
//       profileimg={item.profileimg}
//       image={item.image}
//       directoryStatus={item.directoryStatus}
//       UpdateType={item.UpdateType}
//     />
//   ) : item.tags ? (

//   ) : (

//   );
// };

const SearchPosts = ({ appSearchList, isLoading }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  console.log("Searched data:-->", appSearchList);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {appSearchList === null && isLoading && <FeedSkeleton rows={5} />}

      <Animated.FlatList
        contentContainerStyle={{
          marginTop: "5%",
          paddingBottom: "30%",
        }}
        showsVerticalScrollIndicator={false}
        data={appSearchList}
        renderItem={({ item }) =>     <PostView item={item} />}
       
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !isLoading && (
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              No results for posts found
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

export default SearchPosts;

const styles = StyleSheet.create({});
