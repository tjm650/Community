import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
// =========================================//

import { useNavigation } from "@react-navigation/core";
import MainHeader from "../GlobalScreens/MainHeader";

import { ScrollView } from "react-native";
import BottomNotif from "../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import ProfileDetailsView from "./UserProfileEdit/ProfileDetailsView";
import UserBackgroundImages from "./UserProfileEdit/UserBackgroundImages";

function ProfileView({ CreateViewName, Description, onPress }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        borderBottomWidth: 0,
        borderColor: isLight ? LGlobals.bluetext : DGlobals.bluetext,
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: "2%",
        marginVertical: 10,
        borderRadius: 7,
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "700",
          textTransform: "capitalize",
          fontSize: 17,
        }}
      >
        {CreateViewName}
      </Text>
    </TouchableOpacity>
  );
}

const UserProfile = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [isFailed, setIsFailed] = useState(false);
  const [isFailedError, setIsFailedError] = useState("");

  const directoryList = useGlobal((state) => state.directoryList);

  const user = useGlobal((state) => state.user);

  const servicesList = directoryList.filter(
    (item) => item.creator.username === user.username
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
        position={"absolute"}
        positionBool={true}
          header={
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontSize: 20,
                fontWeight: "700",
                marginBottom: "1%",
              }}
            >
              Profile
            </Text>
          }
          // getView={
          //   <FontAwesomeIcon
          //     icon="earth"
          //     size={25}
          //     color={isLight ? LGlobals.text : DGlobals.text}
          //   />
          // }
        />
      ),
    });
  });

  const handleOk = () => {
    setIsFailed(false);
  };

  useEffect(() => {
    user;
  });

  return (
    <View
      style={{
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        flex: 1,
        paddingHorizontal: "2%",
      }}
    >
      {isFailed && (
        <BottomNotif
          isFailed={isFailed}
          HandleOk={handleOk}
          Auth={isFailedError}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView

        >
          <UserBackgroundImages
            coverImage={user.coverImage}
            profile_image={user.profile_image}
          />

          <ProfileDetailsView
            ds1={user.directory_status1}
            profession={user.profession}
            profInitials={user.profInitials}
            serviceName={user.serviceName}
            email={user.email}
            cellDetails={user.cellDetails}
            bio={user.bio}
            code={user.code}
            program={user.program}
            username={user.username}
            name={user.name}
            setIsFailed={setIsFailed}
            setIsFailedError={setIsFailedError}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
