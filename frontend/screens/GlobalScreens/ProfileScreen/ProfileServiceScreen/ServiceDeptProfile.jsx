import React from "react";
import { StyleSheet, View } from "react-native";
import ProfileDetails from "../ProfileDetails";

const ServiceDeptProfile = ({ ds1, email, bio, followers, code }) => {
  return (
    <View>
      {email && (
        <ProfileDetails inforStatus={"Email"} icon={"link"} details={email} />
      )}
      <ProfileDetails inforStatus={"Code"} icon={"link"} details={code} />
      {/* <ProfileDetails inforStatus={"Service"} icon={"industry"} details={ds1} /> */}
      <ProfileDetails inforStatus={"Bio"} icon={"info"} details={bio} />

      {/* <ProfileDetails
        inforStatus={"Followers"}
        icon={"user-group"}
        details={followers}
      /> */}
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
        inforStatus={"Other Related Services"}
        Inicon={"inbox"}
        details={offices}
      /> */}
    </View>
  );
};

export default ServiceDeptProfile;

const styles = StyleSheet.create({});
