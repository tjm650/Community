import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyScreen from "@/screens/GlobalScreens/EmptyScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function IconSearch({ isLight, LGlobals, DGlobals, focusTextInput }) {
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
        text={"Search your favourable content on Community app"}
        icon={
          <FontAwesomeIcon
            icon={"magnifying-glass-chart"}
            size={40}
            color={isLight ? LGlobals.lighttext : LGlobals.lighttext}
          />
        }
        btn={true}
        marginBottom={50}
        OnPressText={"Start"}
        onPress={focusTextInput}
        color={isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground}
      />
    </View>
  );
}
export default IconSearch;

const styles = StyleSheet.create({});
