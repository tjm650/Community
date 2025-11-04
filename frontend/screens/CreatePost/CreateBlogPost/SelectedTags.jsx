import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";

function TagView({ item }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isLight ? "#172021" : "#283638",
        margin: 2,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        marginBottom: "1%",
        borderWidth: 1,
        borderColor: "#6e9aa05a",
      }}
    >
      <View style={{}}>
        <Text
          key={(item) => item.id}
          style={{
            color: "#fff",
            fontWeight: "600",
            paddingHorizontal: 10,
            paddingVertical: 7,
            textTransform: "capitalize",
          }}
        >
          {item.connect.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const SelectedTags = ({ selectedtags }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      id="selectTags"
      style={{
        paddingVertical: "2%",
        gap: 5,
      }}
    >
      <Text
        style={{
          color: "#404040",
          fontWeight: "600",
        }}
      >
        Taged
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        
        {selectedtags.map((item) => (
          <TagView key={item.connect.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default SelectedTags;

const styles = StyleSheet.create({});
