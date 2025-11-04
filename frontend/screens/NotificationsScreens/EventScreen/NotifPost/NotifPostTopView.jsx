import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DirectoryDetails from "../DirectoryDetails";

const NotifPostTopView = ({
  time,
  profileimg,
  name,
  directoryStatus,
  item,
  verified,
}) => {
  return (
    <DirectoryDetails
      profileimg={profileimg}
      name={name}
      directoryStatus={directoryStatus}
      item={item}
      time={time}
      verified={verified}
      item={item}
    />
  );
};

export default NotifPostTopView;

const styles = StyleSheet.create({});
