  import { Dimensions, StyleSheet, Text, View } from "react-native";
  import React from "react";

  function AuthView({
    isLoading,
    isFailed,
    AuthFailed1,
    AuthFailed3,
    AuthFailed,
    HandleOk,
  }) {
    return (
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          width: Dimensions.get("window").width * 0.85,
          minHeight: isLoading ? 50 : "auto",
          height: "auto",
          borderColor: "#808080",
          borderWidth:1 ,
          backgroundColor: "#454545",
          top: Dimensions.get("window").height * 0.35,
          zIndex: 99,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          overflow: "hidden",
          padding: "5%",
        }}
      >
        {isLoading ? (
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#e0e0e0",
              }}
            >
              Authenticating...
            </Text>
            <ActivityIndicate size={45} color={"#82cdffdd"} />
          </View>
        ) : isFailed ? (
          <View>
            <Text
              style={{
                fontWeight: "800",
                color: "#e0e0e0",
              }}
            >
              {AuthFailed}
            </Text>
            <Text
              style={{
                //fontWeight: "600",
                color: "#d0d0d0",
                height: 40,
              }}
            >
              {AuthFailed1}
            </Text>
          </View>
        ) : ( 
          <View
            style={{
              gap: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#e0e0e0",
              }}
            >
              Authenticating...
            </Text>
            <ActivityIndicate size={60} color={"#82cdffdd"} />
          </View>
        )}

        {isLoading ? null : (
          <View
            style={{
              width: "100%",
              height: "auto",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: "10%",
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                color: "#82cdffdd",
              }}
            >
              Forgot password
            </Text>

            <Text
              onPress={HandleOk}
              style={{
                fontWeight: "800",
                color: "#82cdffdd",
              }}
            >
              Ok
            </Text>
          </View>
        )}
      </View>
    );
  }

  export default AuthView;

  const styles = StyleSheet.create({});
