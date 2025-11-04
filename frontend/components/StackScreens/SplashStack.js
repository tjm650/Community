// import { Stack } from 'expo-router';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

//////////////////// Local Imports //////////////////
import useGlobal from "@/assets/common/core/useGlobal";
import Splash from "@/screens/AuthScreen/Splash";

const SplashStack = () => {
  const Stack = createNativeStackNavigator();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          height: "20%", // Set header height here
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: "#151718",
          statusBarStyle: isLight ? "dark" : "light",
        }}
      />
    </Stack.Navigator>
  );
};

export default SplashStack;

const styles = StyleSheet.create({});
