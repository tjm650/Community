import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

function MoreOptions({ text, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: "#0292a5",
        borderColor: "#606060",
        borderWidth: 1,
        paddingHorizontal: "2%",
        paddingVertical: "1%",
      }}
    >
      <Text style={{ fontWeight: "500", color: "#fff" }}>{text}</Text>
    </TouchableOpacity>
  );
}

export default MoreOptions;
