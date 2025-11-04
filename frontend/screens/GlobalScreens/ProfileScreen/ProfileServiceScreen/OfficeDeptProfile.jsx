import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileDetails from "../ProfileDetails";
import ProfileMoreDetails from "../ProfileMoreDetails";

const OfficeDeptProfile = ({ ds1, Executives, offices, networkLink, code }) => {
  return (
    <View>
      <ProfileDetails inforStatus={"Service"} icon={"box"} details={ds1} />
      <ProfileDetails inforStatus={"Code"} icon={"lock"} details={code} />
      <ProfileMoreDetails
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
        inforStatus={"Other Related Offices"}
        Inicon={"o"}
        details={offices}
      />
    </View>
  );
};

export default OfficeDeptProfile;

const styles = StyleSheet.create({});
