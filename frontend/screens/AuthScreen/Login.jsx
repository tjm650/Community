import useGlobal from "@/assets/common/core/useGlobal";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AuthImage from "./AuthImage";
import AuthInput from "./AuthInput";
import AuthOptions from "./AuthOptions";

import BottomNotif from "../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import AuthBottom from "./AuthBottom";

const Login = () => {
  const [userid, setUserid] = useState("");
  const [useridError, setUseridError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(true);

  const [AuthFailed, setAuthFailed] = useState("");

  const navigation = useNavigation();
  const login = useGlobal((state) => state.signIn);
  const socketConnect = useGlobal((state) => state.socketConnect);

  //////////////////////////////////////////////// Functions ///////////////////////////////////////

  const handleLogin = async () => {

    //Check UserId
    const failUserid = !userid;
    if (failUserid) {
      setUseridError("User ID Not Provided");
    }

    //Check UserPassword
    const failPassword = !password;
    if (failPassword) {
      setPasswordError("Password Not Provided");
    }
    //Show the Error, If it exists
    if (failUserid || failPassword) {
      return;
    }

    setIsLoading(true);
    setAuth(false);

    try {
      const result = await login({
        username: userid,
        password: password,
      });

      if (result.success) {
        // Login successful, navigation will be handled by the store
        console.log("Login successful:", result.user);
      } else {
        setIsLoading(false);
        setAuth(true);
        setRes(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setAuth(true);
      setRes("Network error. Please try again.");
    }
  };

  function HandleOk(params) {
    setAuth((value) => (value = false));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#151718",
        alignItems: "center",
      }}
    >
      {Auth && (
        <BottomNotif
          isLoading={isLoading}
          Auth={res}
          isFailed={isFailed}
          HandleOk={HandleOk}
        />
      )}

      <KeyboardAvoidingView style={{ height: Dimensions.get("window").height }}>
        <TouchableWithoutFeedback onPress={() => {
          // Keyboard will be dismissed automatically when tapping outside inputs
        }}>
          <View style={{ flex: 1 }}>
            <AuthImage isMeteor={true} size={50} space={true} register={true} />
        <View id="InputCredientials" style={{ marginTop: "60%" }}>
          <AuthInput
            icon={
              <FontAwesomeIcon
                icon="fa-regular fa-user"
                size={20}
                color={useridError ? "#ff3636" : "#9BA1A6"}
                style={{ marginLeft: 8 }}
              />
            }
            value={userid}
            onChangeText={(text) => {
              setUserid(text);
              if (useridError) {
                setUseridError("");
              }
            }}
            placeholder={useridError ? "username not provided" : "username"}
            placeholderTextColor={useridError ? "#ff3636" : "#9BA1A6"}
            Space={true}
          />

          <AuthInput
            icon={
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={20}
                color={passwordError ? "#ff3636" : "#9BA1A6"}
              />
            }
            secureTextEntry={true}
            placeholder={passwordError ? "password not provided" : "password"}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) {
                setPasswordError("");
              }
            }}
            placeholderTextColor={passwordError ? "#ff3636" : "#9BA1A6"}
          />
        </View>
        <AuthOptions
          onPress={handleLogin}
          AuthText={"Login"}
          ChangeAuthScreen={"Register"}
          AccountExistance={"Don't have an account ?"}
          onPressChangeScreen={() => navigation.navigate("Register")}
        />
        <AuthBottom />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
