import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";

const ActivityIndicator2 = ({ color, size }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateY = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Full rotation on Y-axis
  });

  useEffect(() => {
    // Start the rotation animation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateValue]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View style={[, { transform: [{ rotateY }] }]}>
        <Text
          style={{
            fontSize: size,
            fontWeight: 800,
            color: color,
          }}
        >
          ©
        </Text>
      </Animated.View>
    </View>
  );
};

export default ActivityIndicator2;

const styles = StyleSheet.create({});
