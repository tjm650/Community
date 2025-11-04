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

import ProfileScreenDetails from "../ProfileScreenDetails";
import ProfileScreenTopView from "../ProfileScreenTopView";
import TopView from "../TopView";

import ClientPosts from "./ClientPosts";

const ClientProfileScreen = ({
  directory_status1,
  id,
  name,
  username,
  profileimg,
  coverImage,
  bio,
  code,
  email,
  profession,
  profInitials,
  serviceName,
  cellDetails,
  program,
  verified,
  market_agreement
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const CommunityDirectoryList = useGlobal(
    (state) => state.CommunityDirectoryList
  );

  const PostList = useGlobal((state) => state.PostList);
  const postsList = useGlobal((state) => state.postsList);
  const PostsNext = useGlobal((state) => state.PostsNext);
  const user = useGlobal((state) => state.user);

  const [loading, setloading] = useState(false);

  ///// Top View Data
  const directoryId = id;

  const ds1 = directory_status1; 
  console.log("DS1:->", ds1);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenTopView />,
    });
  }, []);


  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "1%",
        paddingBottom: email ? "5%" : "1%",
      }}
    >
      <FlatList
        ListHeaderComponent={
          <TopView
            name={name}
            bio={bio}
            email={email}
            ds1={ds1}
            coverImage={coverImage}
            profileimg={profileimg}
            directoryStatus={ds1}
            verified={verified}
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
              profession={profession}
              profInitials={profInitials}
              serviceName={serviceName}
              email={email}
              cellDetails={cellDetails}
              bio={bio}
              code={code}
              program={program}
              username={username}
            />

            <ClientPosts
            directory_status1={directory_status1}
            clientName={username}
            verified={verified}
            market_agreement={market_agreement}
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

export default ClientProfileScreen;

const styles = StyleSheet.create({});
