import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

import { LGlobals } from "@/constants/LightColor/LGlobals";
// =========================================//

import useGlobal from "@/assets/core/useGlobal";

import { useNavigation } from "@react-navigation/native";
import { UserEditProfileDetails } from "./UserEditProfileDetails";
import UserProfileInput from "./UserProfileInput";

const ProfileEditView = ({
  label,
  label2,
  iconType,
  value,
  setValue,
  placeholder,
  height,
  value2,
  setValue2,
  placeholder2,
  action,
  SecondModView = false,
  setIsFailed,
  setIsFailedError,
  keyboardType,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const user = useGlobal((state) => state.user);
  const modifyProfile = useGlobal((state) => state.modifyProfile);

  const handleCreate = () => {
    if (value.length <= 5) {
      setIsFailed(true);
      setIsFailedError(`${label} too short`);
    } else if (value.length >= 20) {
      setIsFailed(true);
      setIsFailedError(`${label} too long`);
    } else if (SecondModView == true && value2.length <= 5) {
      setIsFailed(true);
      setIsFailedError(`${label2} too short`);
    } else if (SecondModView == true && value2.length >= 20) {
      setIsFailed(true);
      setIsFailedError(`${label} too long`);
    } else {
      UserEditProfileDetails.handleEditDetails(
        user,
        modifyProfile,
        value,
        value2,
        action,
        setValue,
        setValue2
      );
      setIsFailed(true);
      setIsFailedError(`Profile Updated`);
    }
  };

  return (
    <View
      style={{
        marginVertical: "5%",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <UserProfileInput
          label={label}
          keyboardType={keyboardType}
          // placeholder={placeholder}
          placeholderTextColor={
            isLight ? LGlobals.lighttext : DGlobals.lighttext
          }
          value={value}
          height={height && height}
          onChangeText={(text) => {
            setValue(text);
          }}
        />

        {SecondModView && (
          <UserProfileInput
            label={label2}
            //   placeholder={placeholder2}
            keyboardType={keyboardType}
            placeholderTextColor={
              isLight ? LGlobals.lighttext : DGlobals.lighttext
            }
            value={value2}
            height={height && height}
            onChangeText={(text) => {
              setValue2(text);
            }}
          />
        )}

        <View
          style={{
            paddingHorizontal: "5%",
          }}
        >
          <Text
            onPress={handleCreate}
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: isLight ? LGlobals.text : DGlobals.text,
              borderColor: isLight ? DGlobals.background : LGlobals.background,
              borderWidth: 1,
              width: "auto",
              paddingHorizontal: "30%",
              paddingVertical: "3%",
              borderRadius: 30,
              fontWeight: "600",
              alignSelf: "center",
            }}
            children={"save changes"}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileEditView;

const styles = StyleSheet.create({});
