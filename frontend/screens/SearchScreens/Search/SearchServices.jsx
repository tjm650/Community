import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import useGlobal from "@/assets/common/core/useGlobal";
import FeedSkeleton from "@/components/FeedSkeleton";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import NotifLiveView from "@/screens/NotificationsScreens/EventScreen/NotifLiveView";
import NotifPostView from "@/screens/NotificationsScreens/EventScreen/NotifPost/NotifPostView";
import LiveForum from "@/screens/NotificationsScreens/LiveForumScreen/LiveForum";
import { useNavigation } from "@react-navigation/native";

const RenderItemPost = ({ user, item }) => {
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
};

const SearchServices = ({ appSearchNotif, isLoading }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  console.log("Searched data:-->", appSearchNotif);

  const user = useGlobal((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {appSearchNotif === null && isLoading && <FeedSkeleton rows={4} />}

      <Animated.FlatList
        contentContainerStyle={{
          marginTop: "5%",
          paddingBottom: "30%",
        }}
        showsVerticalScrollIndicator={false}
        data={appSearchNotif}
        renderItem={({ item }) => <RenderItemPost user={user} item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !isLoading && (
            <Text
              style={{
                color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
              }}
            >
              No results for service posts found
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

export default SearchServices;

const styles = StyleSheet.create({});
