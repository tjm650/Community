import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Firstletter = ({ user }) => {

  if (!user) {
    return <View></View>;
  }
  return (
    <View style={{}}>
      <Text
        style={{
          fontWeight: "700",
          fontSize: 17,
          textAlign: "center",
          color: "#d1d1d6a4",
        }}
      >
        {user.charAt(0)}
      </Text>
    </View>
  );
};

export default Firstletter;

const styles = StyleSheet.create({});
