import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileDetails from "../ProfileDetails";
import ProfileMoreDetails from "../ProfileMoreDetails";

const AcademicDeptProfile = ({
  ds1,
  Executives,
  programs,
  faculty,
  code,
  networkLink,
  departments,
}) => {
  return (
    <View>
      <ProfileDetails inforStatus={"Service"} icon={"a"} details={ds1} />
      <ProfileDetails inforStatus={"Code"} icon={"e"} details={code} />
      {faculty && (
        <ProfileDetails inforStatus={"Faculty"} icon={"f"} details={faculty} />
      )}
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
        inforStatus={"Programs"}
        Inicon={"p"}
        details={programs}
      />

      <ProfileMoreDetails
        inforStatus={"Other Related Departments"}
        Inicon={"p"}
        details={departments}
      />
    </View>
  );
};

export default AcademicDeptProfile;

const styles = StyleSheet.create({});
