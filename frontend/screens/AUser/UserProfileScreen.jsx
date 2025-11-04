import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import ClientPosts from "../GlobalScreens/ProfileScreen/ProfileClientScreen/ClientPosts";
import ProfileScreenDetails from "../GlobalScreens/ProfileScreen/ProfileScreenDetails";
import ProfileScreenTopView from "../GlobalScreens/ProfileScreen/ProfileScreenTopView";
import TopView from "../GlobalScreens/ProfileScreen/TopView";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const PostList = useGlobal((state) => state.PostList);
  const postsList = useGlobal((state) => state.postsList);
  const PostsNext = useGlobal((state) => state.PostsNext);
  const user = useGlobal((state) => state.user);

  const [loading, setloading] = useState(false);

  const ds1 = user.directory_status1;

  // const user = useGlobal((state) => state.user);



  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenTopView ds1={ds1} />,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "1%",
        paddingBottom: user.email ? "5%" : "1%",
      }}
    >
      <FlatList
        ListHeaderComponent={
          <TopView
            name={user.name}
            bio={user.bio}
            email={user.email}
            ds1={ds1}
            coverImage={user.coverImage}
            profileimg={user.profile_image}
            directoryStatus={ds1} 
            verified={user.verified}
            editable={true}
            onPressEdit={() => OpenEditProfile}
          />
        }
        ListFooterComponent={
          <ScrollView
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            // horizontal={true}
          >
            <ProfileScreenDetails
              ds1={ds1}
              profession={user.profession}
              profInitials={user.prof_initial}
              serviceName={user.service_name}
              email={user.email}
              cellDetails={user.cell}
              bio={user.bio}
              code={user.code}
              program={user.program}
              username={user.username}
            />

            <ClientPosts
              directory_status1={user.directory_status1}
              clientName={user.username}
            />
          </ScrollView>
        }
        refreshControl={
          <RefreshControl
            colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]}
            tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
            progressBackgroundColor={
              isLight ? LGlobals.background : DGlobals.background
            }
            refreshing={loading}
            onRefresh={postsList}
          />
        }
        style={{
          flex: 1,
          paddingHorizontal: "1%",
        }}
      />
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({});
