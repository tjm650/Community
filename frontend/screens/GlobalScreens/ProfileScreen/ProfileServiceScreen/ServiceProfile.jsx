import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
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

import ProfileScreenDetails from "../ProfileScreenDetails";
import ProfileScreenTopView from "../ProfileScreenTopView";
import TopView from "../TopView";
import ServicePosts from "./ServicePosts";
import { ServiceNotifications } from "./ServicePostsFunctions";

const ServiceInfor = ({ ds1, bio, code, followers, email }) => {
  return (
    <View
      id=""
      style={{
        width: Dimensions.get("window").width,
        paddingHorizontal: "1%",
      }}
      focusable={true}
    >
      <ProfileScreenDetails
        ds1={ds1}
        email={email}
        bio={bio}
        code={code}
        followers={followers}
      />
    </View>
  );
};

const ServiceProfile = ({
  directory_status1,
  id,
  name,
  profileimg,
  coverImage,
  bio,
  code,
  email,
  followers,
  verified,
  creator,
  followersNo
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [loading, setloading] = useState(false);

  const CommunityDirectoryList = useGlobal(
    (state) => state.CommunityDirectoryList
  );
  const directoryList = useGlobal((state) => state.directoryList);
  const user = useGlobal((state) => state.user);
  const notifList = useGlobal((state) => state.notifList);
  const notificationList = useGlobal((state) => state.notificationList);
  const notifNext = useGlobal((state) => state.notifNext);

  const BlogList = useGlobal((state) => state.BlogList);
  const DailyBlogList = useGlobal((state) => state.DailyBlogList);
  const blogsNext = useGlobal((state) => state.blogsNext);

  const directoryId = id;

  const ds1 = directory_status1;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenTopView />,
    });
  }, []);

  useEffect(() => {
    CommunityDirectoryList(directoryId, directory_status1);
  }, []);

  const serviceView = ServiceNotifications.getServiceView(directory_status1);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
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
            followers={followersNo}
            verified={verified}
          />
        }
       
        ListFooterComponent={
          <ScrollView
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            // horizontal={true}
          >
            <ServiceInfor
              ds1={ds1}
              email={email}
              bio={bio}
              code={code}
            />

            <ServicePosts
              directory_status1={directory_status1}
              serviceName={name}
              followers={followers}
              creator={creator}
              verified={verified}
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
            onRefresh={serviceView.dsS ? notificationList : BlogList}
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

export default ServiceProfile;

const styles = StyleSheet.create({});
