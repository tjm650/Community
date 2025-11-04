import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const UserEditDetails = ({ DGlobals, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d0d0d0",
        paddingHorizontal: "5%",
        paddingVertical: "1%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        zIndex:99
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: DGlobals.text, //isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "500",
          lineHeight: 20,
          fontSize: 16,
        }}
      >
        edit
      </Text>
      <FontAwesomeIcon icon="pencil" size={10} color={DGlobals.text} />
    </TouchableOpacity>
  );
};

export default UserEditDetails;

const styles = StyleSheet.create({});
