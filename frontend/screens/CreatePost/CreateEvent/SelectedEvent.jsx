import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================
import useGlobal from "@/assets/common/core/useGlobal";

function EventView({ item }) {
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
          {item.eventName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const SelectedEvent = ({ selectedEvents }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
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
        Event
      </Text>

      <FlatList
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        data={selectedEvents}
        renderItem={({ item }) => <EventView item={item} />}
      />
    </View>
  );
};

export default SelectedEvent;

const styles = StyleSheet.create({});
