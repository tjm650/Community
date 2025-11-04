import React from "react";
import { StyleSheet, View } from "react-native";
import ProfileDetails from "../ProfileDetails";

const OrganizationProfile = ({ ds1, email, bio, followers, code }) => {
  return (
    <View>
      {/* <ProfileDetails inforStatus={"Service"} icon={"industry"} details={ds1} /> */}
      {email && (
        <ProfileDetails inforStatus={"Email"} icon={"link"} details={email} />
      )}

      <ProfileDetails inforStatus={"Code"} icon={"link"} details={code} />

      {/* <ProfileDetails
        inforStatus={"Followers"}
        icon={"user-group"}
        details={followers}
      /> */}

      <ProfileDetails inforStatus={"Bio"} icon={"info"} details={bio} />

      {/* <ProfileMoreDetails
        inforStatus={"Network Links"}
        link={true}
        icon={"link"}
        Inicon={"link"}
        details={networkLink}
      />

      <ProfileMoreDetails
        inforStatus={"Executives"}
        Inicon={"user"}
        details={Executives}
      />

      <ProfileMoreDetails
        inforStatus={"Offices"}
        Inicon={"inbox"}
        details={offices}
      /> */}
    </View>
  );
};

export default OrganizationProfile;

const styles = StyleSheet.create({});
