import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const AuthInput = ({
  placeholder,
  value,
  onChangeText,
  placeholderTextColor,
  Forgot_Password,
  Space = true,
  icon,
  secureTextEntry,
  onPress,
  readOnly,  
  fontWeight
}) => {
  return (
    <View
      style={{
        marginBottom: Space ? 0 : "5%",
      }}
    >

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#3838389a",
          paddingHorizontal:10,
          paddingVertical:3,
          borderWidth:0,
          borderColor:"#ffffffcb",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: "85%",
          alignSelf: "center",
          overflow:"hidden",
        }}
      >
        <View>{icon}</View>
        <TextInput
        readOnly={readOnly}
        secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          style={{
            color: "#fff",
            marginVertical: 5,
            width: "100%",
            marginLeft: "2%",
            fontWeight:fontWeight
          }}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: "5%",
        }}
      >
        <Text
        onPress={onPress}
          style={{
            color: "#82cdffdd",
            fontWeight: "500",
            marginLeft: "5%",
            marginTop: "2%",
          }}
        >
          {Forgot_Password}
        </Text>
      </View>
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({});
