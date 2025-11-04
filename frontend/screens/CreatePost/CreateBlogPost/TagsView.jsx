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

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";

function TagsView({ item, Selectedtags, handleSelect }) {
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
          //justifyContent: "space-between",
          marginBottom: "2%",
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "600",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            {item.connect.name} {""}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            {" "}
            <Text
              style={{
                fontWeight: "400",
                color: isLight ? LGlobals.bluetext : DGlobals.lighttext,
              }}
            >
              | {item.connect.directory_status1}
              {item.connect.directory_status2 &&
                "| " + item.connect.directory_status2}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "600",
            color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
          }}
        >
          {item.connect.email}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default TagsView;

const styles = StyleSheet.create({});
