import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//====================================================================================

import useGlobal from "@/assets/core/useGlobal";
import CheckClientType from "../../GlobalScreens/CheckClientType";

const ServiceView = ({ item, SelectedServices, handleSelect }) => {
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
      <CheckClientType
        DirectoryView={
          <View
            id="TopView"
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: isLight ? LGlobals.text : DGlobals.text,
                fontWeight: "600",
              }}
            >
              {item.username}{" "}
            </Text>
          </View>
        }
        directoryStatus={item.directory_status1}
        verified={item.verified}
      />

      {item.directory_status1 && (
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "600",
            width: "90%",
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          }}
        >
          {item.directory_status1}
        </Text>
      )}

      <View>
        <Text
          numberOfLines={3}
          style={{
            width: "95%",
            color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          }}
        >
          {item.bio}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceView;

const styles = StyleSheet.create({});
