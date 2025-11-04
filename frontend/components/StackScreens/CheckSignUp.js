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
import useGlobal from "@/assets/core/useGlobal";

import Agreement from "@/screens/AuthScreen/Agreement";
import CompleteSignUp from "@/screens/AuthScreen/CompleteSignUp";


const CheckSignUp = () => {
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
        name="Agreement"
        component={Agreement}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: "#151718",
          statusBarStyle: "light",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="CompleteSignUp"
        component={CompleteSignUp}
        options={{
          headerShown: true,
          statusBarHidden: false,
          statusBarBackgroundColor: "#151718",
          statusBarStyle: "light",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default CheckSignUp;

const styles = StyleSheet.create({});
