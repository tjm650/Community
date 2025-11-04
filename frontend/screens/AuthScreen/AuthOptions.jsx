import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const AuthOptions = ({
  AuthText,
  ChangeAuthScreen,
  AccountExistance,
  onPress,
  onPressChangeScreen,
  space = true,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
    style={{
        marginTop: space ? "5%" : "15%",
        alignItems:"center"
    }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          width: 150,
          backgroundColor: DGlobals.icon,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignSelf: "center",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {AuthText}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
          <Text
          style={{
            textAlign: "center",
            color: "rgba(248, 252, 254, 0.683)",

            // fontWeight: 600,
          }}
        >
          {AccountExistance}{" "}
        </Text>
        <Text
          style={{ color: isLight ? LGlobals.bluetext : DGlobals.bluetext }}
            onPress={onPressChangeScreen}
          >
            {ChangeAuthScreen}
        </Text>
      </View>
    </View>
  );
};

export default AuthOptions;

const styles = StyleSheet.create({});
