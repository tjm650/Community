import { View, Text } from "react-native";
import React from "react";

const BadgeNotif = ({backgroundColor, height, width, borderRadius }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: backgroundColor,
        zIndex: 99,
        height: height,
        width: width,
        borderRadius: borderRadius,
      }}
    ><Text>•</Text></View>
  );
};

export default BadgeNotif;
