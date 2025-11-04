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
import Login from "@/screens/AuthScreen/Login";
import Register from "@/screens/AuthScreen/Register";

const AuthenticationStack = () => {
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
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: "#151718",
          statusBarStyle: "light",
          animation: "slide_from_left",
          animationTypeForReplace: "push",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          statusBarHidden: false,
          statusBarBackgroundColor: "#151718",
          statusBarStyle: "light",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;

const styles = StyleSheet.create({});
