import "@/assets/common/core/fontawesome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
//======================================================================================

//////////////////// Local Imports //////////////////
import useGlobal from "@/assets/common/core/useGlobal";

//////////////////// Authentication Screens //////////////////

//////////////////// Navigations //////////////////
import AuthenticationStack from "../StackScreens/AuthenticationStack";
import CheckSignUp from "../StackScreens/CheckSignUp";
import DrawerStack from "../StackScreens/DrawerStack";
import SplashStack from "../StackScreens/SplashStack";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  const { theme } = useGlobal();
  const initialized = useGlobal((state) => state.initialized);
  const authenticated = useGlobal((state) => state.isAuthenticated);
  const user = useGlobal((state) => state.user);
  const signUpComplete = useGlobal((state) => state.signUpComplete);
  const agreementChecked = useGlobal((state) => state.agreementChecked);
  const init = useGlobal((state) => state.init);
  let isLight = theme === "light";

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <StatusBar
        style={isLight ? "dark" : "light"}
        backgroundColor={isLight ? "#fff" : "#151718"}
      />
      {!initialized ? (
        <SplashStack />
      ) : !authenticated ? (
        <AuthenticationStack />
      ) : !signUpComplete ? (
        <CheckSignUp />
      ) : (
        <DrawerStack />
      )}
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
