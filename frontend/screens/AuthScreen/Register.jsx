import useGlobal from "@/assets/core/useGlobal";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    View
} from "react-native";
import BottomNotif from "../ApplicationServices/Notifications/BottomNotif/BottomNotif";
import AuthBottom from "./AuthBottom";
import AuthImage from "./AuthImage";
import AuthInput from "./AuthInput";
import AuthOptions from "./AuthOptions";

const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [passwordError1, setPasswordError1] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const [shortPassword1, setshortPassword1] = useState(false);

  const [res, setRes] = useState("");
  const [Auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(true);

  const navigation = useNavigation();

  const signup = useGlobal((state) => state.signUp);

  const handleRegister = async () => {
    setshortPassword1(false);
    //Check Userid
    const failUsername = !username;
    if (failUsername) {
      setUsernameError("username not provided");
    }

    const failEmail = !email;
    if (failEmail) {
      setUserEmailError("Email Not Provided");
    }

    const failFirstName = !FirstName;
    if (failFirstName) {
      setFirstNameError("first name not provided");
    }

    const failLastName = !LastName;
    if (failLastName) {
      setLastNameError("last name not provided");
    }

    //Check UserPassword
    const failPassword1 = !password1;
    if (failPassword1) {
      setPasswordError1("Enter Correct Credentials!");
    }

    const longUsername = username.length > 15;
    if (longUsername) {
      setAuth(true);
      setRes("username too long");
    }

    const shortPass = password1.length < 9;
    if (shortPass) {
      setAuth(true);
      setRes("password too short");
    }

    //Check If Passwords Match
    // const failPassword2 = password1 !== password2;
    // if (failPassword2) {
    //   setPasswordError2("Passwords Don't  Match!");
    // }
    
    //Show the Error, If it exists
    if (
      failUsername ||
      failEmail ||
      failFirstName ||
      failLastName ||
      shortPassword1 ||
      failPassword1 ||
      longUsername ||
      shortPass ||
      failPassword2
    ) {
      return;
    }
    console.log("Registration successful:");

    setIsLoading(true);
    setAuth(false);

    try {
      const result = await signup({
        username: username,
        email: email,
        password: password1,
        first_name: FirstName,
        last_name: LastName,
      });

      if (result.success) {
        // Registration successful, navigation will be handled by the store
        console.log("Registration successful:", result.user);
      } else {
        setIsLoading(false);
        setAuth(true);
        setRes(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
      style={{ flex: 1, backgroundColor: "#151718", alignItems: "center" }}
    >
      {Auth && (
        <BottomNotif Auth={res} isFailed={isFailed} HandleOk={HandleOk} />
      )}

      <KeyboardAvoidingView style={{ height: Dimensions.get("window").height }}>
        <AuthImage isMeteor={true} size={50} space={false} register={true} />
        <View style={{ marginTop: "45%" }}>
          <AuthInput
            icon={
              <FontAwesomeIcon
                icon="fa-regular fa-user"
                size={20}
                color={usernameError ? "#ff3636" : "#9BA1A6"}
                style={{ marginLeft: 8 }}
              />
            }
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (usernameError) {
                setUsernameError("");
              }
            }}
            placeholder={usernameError ? "username not provided" : "username"}
            placeholderTextColor={usernameError ? "#ff3636" : "#9BA1A6"}
            Space={true}
          />

          <AuthInput
            icon={
              <FontAwesomeIcon
                icon="fa-regular fa-envelope"
                size={20}
                color={userEmailError ? "#ff3636" : "#9BA1A6"}
                style={{ marginLeft: 8 }}
              />
            }
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (userEmailError) {
                setUserEmailError("");
              }
            }}
            placeholder={userEmailError ? "email not provided" : "email"}
            placeholderTextColor={userEmailError ? "#ff3636" : "#9BA1A6"}
            Space={true}
          />

          <AuthInput
            icon={
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={20}
                color={passwordError1 ? "#ff3636" : "#9BA1A6"}
              />
            }
            value={password1}
            onChangeText={(text) => {
              setPassword1(text);
              if (passwordError1) {
                setPasswordError1("");
              }
            }}
            placeholder={
              passwordError1 ? "Enter Correct Credentials !" : "Password"
            }
            placeholderTextColor={passwordError1 ? "#ff3636" : "#9BA1A6"}
            Space={true}
            secureTextEntry={true}
          />
        </View>
        <AuthOptions
          onPress={handleRegister}
          AuthText={"Register"}
          ChangeAuthScreen={"Login"}
          AccountExistance={"Already have an account ?"}
          onPressChangeScreen={() => navigation.navigate("Login")}
        />
        <AuthBottom />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
