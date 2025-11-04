import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const ActivityIndicate = ({ size, color, flex= true, marginTop}) => {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        marginTop: marginTop
      }}
    >
      <ActivityIndicator
        size={size}
        color={color}
        style={{ flex: flex ? 1 : 0, alignSelf: "center"}}
      />
    </View>
  );
};

export default ActivityIndicate;

const styles = StyleSheet.create({});
