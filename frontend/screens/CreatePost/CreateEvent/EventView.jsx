import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//=====================================================================================

const EventView = ({ item, SelectedEvents, handleSelect }) => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const handlePress = (item) => {
    handleSelect(item);
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      activeOpacity={0.5}
      style={{
        marginBottom: "2%",
        paddingVertical: "2%",
        paddingHorizontal: "2%",
        borderBottomWidth: 0,
        borderColor: "#d0d0d0",
      }}
    >
      <View
        id="TopView"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "2%",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {item.eventName}{" "}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {item.category} • {item.date}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "600",
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
              fontSize: 12,
            }}
          >
            {item.duration}
          </Text>
        </View>
      </View>
      <View>
        <Text
          numberOfLines={3}
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {item.bio}
        </Text>
      </View>
      <View style={{ marginTop: 4 }}>
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            fontSize: 12,
          }}
        >
          📍 {item.venue}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventView;

const styles = StyleSheet.create({});
