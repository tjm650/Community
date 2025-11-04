import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyScreen from "@/screens/GlobalScreens/EmptyScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function IconError({isLight, LGlobals, DGlobals}) {
  return (
    <View
      style={{
        height: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EmptyScreen
        text={"No data found"}
        icon={
          <FontAwesomeIcon
            icon="magnifying-glass-chart"
            size={70}
            color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
          />
        }
      />
    </View>
  );
}

export default IconError;

const styles = StyleSheet.create({});
