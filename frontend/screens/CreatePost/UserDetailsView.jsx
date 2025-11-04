import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//====================================================================================
import useGlobal from "@/assets/core/useGlobal";

function UserDetailsView({ itemDesc, Desc }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        paddingVertical: "2%",
        paddingHorizontal: "2%",       
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#7f7f7f50",
          justifyContent: "flex-start",
          paddingHorizontal: "3%",
          paddingVertical: "1%",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <View style={{}}>
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
            numberOfLines={1}
          >
            {itemDesc}:{" "}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: "5%",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
            numberOfLines={1}
          >
            {Desc}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default UserDetailsView;

const styles = StyleSheet.create({});
