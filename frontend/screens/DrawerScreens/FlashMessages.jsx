import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FlashMessage from "react-native-flash-message";

const FlashMessages = () => {
  return (
    <View>
      <FlashMessage position="top" />
    </View>
  );
};

export default FlashMessages;

const styles = StyleSheet.create({});
