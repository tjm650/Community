import React from "react";
import { StyleSheet } from "react-native";
import ProfileTop from "./ProfileClientScreen/ProfileTop";
import Profile1 from "./ProfileServiceScreen/Profile1";

const TopView = ({
  ds1,
  name,
  bio,
  email,
  coverImage,
  profileimg,
  directoryStatus,
  editable,
  onPressEdit,
  followers
}) => {
  return ds1 === "Student" ? (
    <ProfileTop
      name={name}
      bio={bio}
      email={email}
      ds1={ds1}
      directoryStatus={directoryStatus}
      coverImage={coverImage}
      profileimg={profileimg}
      editable={editable}
      onPressEdit={onPressEdit}
    />
  ) : ds1 === "Staff" ? (
    <ProfileTop
      name={name}
      bio={bio}
      email={email}
      ds1={ds1}
      directoryStatus={ds1}
      coverImage={coverImage}
      profileimg={profileimg}
      editable={editable}
      onPressEdit={onPressEdit}
    />
  ) : ds1 === "Unverified" ? (
    <ProfileTop
      name={name}
      bio={bio}
      email={email}
      ds1={ds1}
      directoryStatus={ds1}
      coverImage={coverImage}
      profileimg={profileimg}
      editable={editable}
      onPressEdit={onPressEdit}
    />
  ) : (
    <Profile1
      name={name}
      directoryStatus={directoryStatus}
      profileimg={profileimg}
      bio={bio}
      email={email}
      coverImage={coverImage}
      ds1={ds1}
      followers={followers}
    />
  );
};

export default TopView;

const styles = StyleSheet.create({});
