import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  View
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";

const GetStartedInput = ({
  value,
  onChangeText,
  placeholderTextColor,
  Space = true,
  secureTextEntry,
  readOnly,
  fontWeight,
  multipleline,
  height,
  textAlignVertical,
  isMultiline = false,
  label
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [isFocused, setIsFocused] = useState(false);
  const [val, setVal] = useState("");
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!val) {
      setIsFocused(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute",
    left: 10,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#000"],
    }),
  };

  return (
    <View
      style={{
        marginBottom: Space ? 20 : "5%",
        paddingHorizontal: isMultiline ? 0 : 15,
        borderBottomWidth: 1,
        borderBottomColor: isLight
          ? LGlobals.borderColor
          : DGlobals.borderColor,
        marginHorizontal: "2%",
      }}
    >
      <Animated.Text style={(labelStyle, { color: placeholderTextColor })}>
        {label}
      </Animated.Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderWidth: 0,
          borderColor: "#ffffffcb",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          width: "95%",
          alignSelf: "center",
          overflow: "hidden",
        }}
      >
        {/* <View>{icon}</View> */}
        <TextInput
          multiline={multipleline}
          readOnly={readOnly}
          numberOfLines={multipleline ? 10 : 1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          value={value}
          onChangeText={onChangeText}
          style={{
            color: "#fff",
            textAlignVertical: textAlignVertical,
            width: "100%",
            height: height,
            fontWeight: fontWeight,
          }}
        />
      </View>
    </View>
  );
};

export default GetStartedInput;

const styles = StyleSheet.create({});
