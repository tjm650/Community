import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";

// ============= Light ============================//

//import { Globals } from "../..//Light";
//====================================================================================
import useGlobal from "@/assets/core/useGlobal";
import CheckClientType from "../../GlobalScreens/CheckClientType";

function ServiceView({ item }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <CheckClientType
        DirectoryView={
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              paddingHorizontal: 10,
              paddingVertical: 7,
              textTransform: "capitalize",
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
            {item.username}
          </Text>
        }
        directoryStatus={item.directory_status1}
        verified={item.verified}
      />
    </TouchableOpacity>
  );
}

const SelectedService = ({ selectedServices }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      id="SelectDepartment"
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
        from
      </Text>

      <ServiceView item={selectedServices} />
      {/* <FlatList
        horizontal
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        data={selectedServices}
        renderItem={({ item }) => <ServiceView item={item} />}
      /> */}
    </View>
  );
};

export default SelectedService;

const styles = StyleSheet.create({});
