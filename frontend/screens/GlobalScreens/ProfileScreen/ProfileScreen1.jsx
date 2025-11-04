import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
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
import ClientProfileScreen from "./ProfileClientScreen/ClientProfileScreen";
import ProfileScreenTopView from "./ProfileScreenTopView";

const ProfileScreen1 = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const CommunityDirectoryList = useGlobal(
    (state) => state.CommunityDirectoryList 
  );
  const directoryList = useGlobal((state) => state.directoryList);
  ///// Top View Data

  const directoryId = route.params.id;
  // const directory_status1 = route.params.service.directory_status1;
  // const directory_status = route.params.sender.directory_status1;

  // console.log("DS1:->"), ds1;
  // const ds1 = directory_status1;
  // const name = route.params.service.username;
  // const profileimg = route.params.service.profile_image;
  // const coverImage = route.params.service.cover_image;
  // const bio = route.params.service.bio;
  // const code = route.params.service.code;
  // const email = route.params.service.email;

  //  if (route.params.sender.directory_status1) {
  //     const directoryId = route.params.id;
  //     const directory_status1 = route.params.sender.directory_status1;

  //     console.log("DS1:->"), ds1;
  //     const ds1 = directory_status1;
  //     const name = route.params.sender.username;
  //     const profileimg = route.params.sender.profile_image;
  //     const coverImage = route.params.sender.cover_image;
  //     const bio = route.params.sender.bio;
  //     const code = route.params.sender.code;
  //     const email = route.params.sender.email;
  //     const profession = route.params.sender.profession;
  //     const profInitials = route.params.sender.profInitials;
  //     const cellDetails = route.params.sender.cellDetails;
  //     const serviceName = route.params.sender.serviceName;
  //   }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileScreenTopView />,
    });
  }, []);

  useEffect(() => {
    CommunityDirectoryList(directoryId, route.params.sender.directory_status1);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "1%",
        // paddingBottom: email ? "5%" : "1%",
      }}
    >
      <ClientProfileScreen
        directory_status1={route.params.sender.directory_status1}
        id={route.params.id}
        name={route.params.sender.name}
        username={route.params.sender.username}
        profileimg={route.params.sender.profile_image}
        coverImage={route.params.sender.coverImage}
        bio={route.params.sender.bio}
        code={route.params.sender.code}
        email={route.params.sender.email}
        profession={route.params.sender.profession}
        profInitials={route.params.sender.prof_initial}
        cellDetails={route.params.sender.cell}
        serviceName={route.params.sender.service_name}
        program={route.params.sender.program}
        verified={route.params.sender.verified}
        market_agreement={route.params.sender.market_agreement}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen1;

const styles = StyleSheet.create({});
