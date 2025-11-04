import useGlobal from "@/assets/core/useGlobal";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Notification-specific skeleton: small compact card with icon and text
const NotifPostSkeleton = ({ rows = 4 }) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const background = isLight ? "#e6e9ee" : "#2a2a2a";
  const highlight = isLight ? "#f3f6fa" : "#333";
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: rows }).map((_, i) => (
        <Animated.View key={i} style={[styles.row, { opacity }]}>
          <View style={[styles.icon, { backgroundColor: background }]} />
          <View style={styles.textBlock}>
            <View style={[styles.lineShort, { backgroundColor: background }]} />
            <View style={[styles.lineLong, { backgroundColor: highlight }]} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  textBlock: {
    flex: 1,
    marginLeft: 12,
  },
  lineShort: {
    width: "50%",
    height: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  lineLong: {
    width: "85%",
    height: 10,
    borderRadius: 6,
  },
});

export default NotifPostSkeleton;
