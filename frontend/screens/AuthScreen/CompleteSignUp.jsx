import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CompleteSignUpTopView from "../TopViews/CompleteSignUpTopView";
import AuthInput from "./AuthInput";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";

import api from "@/assets/core/api";
import PickerView from "./PickerView";

const CompleteSignUp = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [statusError, setStatusError] = useState("");

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const logout = useGlobal((state) => state.logout);
  const completeSignUpDetails = useGlobal(
    (state) => state.completeSignUpDetails
  );

  console.log(user.username);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: "Student", value: "Student" },
    { label: "Staff", value: "Staff" },
  ]);

  const handleComplete = (params) => {
    const failFirstName = !firstName;
    if (failFirstName) {
      setFirstNameError("first name Not Provided");
    }

    const failLastName = !lastName;
    if (failLastName) {
      setLastNameError("last name Not Provided");
    }
    // Check email
    const failStatus = !value;
    setStatus(value);
    if (failStatus) {
      setStatusError("select status");
    }
    if (failFirstName || failLastName || failStatus) {
      return;
    }

    ///////////// Handle Requests /////////////////////////
    api({
      method: "POST",
      url: "/api/completedetails",
      data: {
        username: user.username,
        first_name: firstName,
        last_name: lastName,
        directory_status1: value,
      },
    })
      .then((response) => {
        completeSignUpDetails(user, completedDetails),
          console.log(`user ${user.username}  completed signup details`);
        const completedDetails = {
          username: user.username,
          first_name: firstName,
          last_name: lastName,
          directory_status1: value,
        };
        console.log("completedDetails", completedDetails);
      })
      .catch((error) => {
        console.log(
          `user ${user.username}   failed to complete signup details`
        );
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CompleteSignUpTopView user={user} />,
    });
  }, []);

  useEffect(() => {
    user;
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#151718",
        paddingTop: "20%",
      }}
    >
      <Text
        style={{
          marginVertical: "2%",
          color: "rgba(159, 159, 159, 0.68)",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        
      </Text>
      <Text
        style={{
          marginBottom: "5%",
          marginHorizontal:"10%",
          color: "rgba(159, 159, 159, 0.68)",
          fontWeight: "600",
          textAlign: "left",
        }}
      >
        Hie {user.username}, welcome to the community, Enter correct details 
      </Text>

      <View style={{ marginTop: "10%", marginBottom: "5%" }}>
      <AuthInput
        icon={
          <FontAwesomeIcon
            style={{ marginLeft: 8 }}
              icon="fa-solid fa-user"
              size={20}
              color={FirstNameError ? "#ff3636" : "#9BA1A6"}
            />
          }
          value={firstName}
        onChangeText={(text) => {
            setFirstName(text);
            if (FirstNameError) {
              setFirstNameError("");
          }
        }}
          placeholder={
            FirstNameError ? "first name not provided" : "first name"
          }
          placeholderTextColor={FirstNameError ? "#ff3636" : "#9BA1A6"}
          Space={true}
        />

        <AuthInput
        icon={
          <FontAwesomeIcon
              icon="fa-solid fa-user"
              size={20}
              color={LastNameError ? "#ff3636" : "#9BA1A6"}
            style={{ marginLeft: 8 }}
          />
        }
          value={lastName}
        onChangeText={(text) => {
            setLastName(text);
            if (LastNameError) {
              setLastNameError("");
          }
        }}
          placeholder={LastNameError ? "last name not provided" : "last name"}
          placeholderTextColor={LastNameError ? "#ff3636" : "#9BA1A6"}
          Space={true}
          />

        <PickerView
          open={open}
          value={value}
          items={statusItems}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setStatusItems}
        onChangeText={(text) => {
            setValue(text);
            if (statusError) {
              setStatusError("");
          }
        }}
          Space={false}
        icon={
          <FontAwesomeIcon
              icon="fa-solid fa-school"
              size={20}
              color={statusError ? "#ff3636" : "#9BA1A6"}
            style={{ marginLeft: 8 }}
          />
        }
          placeholder={statusError ? "select status" : "select status"}
          placeholderTextColor={statusError ? "#ff3636" : "#9BA1A6"}
          arrowColor={statusError ? "#ff3636" : "#9BA1A6"}
          onPress={logout}
          Forgot_Password={"logout"}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleComplete}
        style={{
          width: "90%",
          backgroundColor: DGlobals.icon,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignSelf: "center",
          paddingVertical: 15,
          marginVertical: "15%",
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompleteSignUp;

const styles = StyleSheet.create({});
