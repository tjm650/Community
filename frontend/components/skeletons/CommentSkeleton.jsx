import useGlobal from "@/assets/core/useGlobal";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Comment-specific skeleton: small avatar, header line, and 1-2 short body lines
const CommentSkeleton = ({ rows = 6 }) => {
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
        <Animated.View key={i} style={[styles.rowWrap, { opacity }]}>
          <View style={[styles.avatar, { backgroundColor: background }]} />

          <View style={styles.content}>
            <View style={[styles.header, { backgroundColor: background }]} />
            <View style={[styles.bodyShort, { backgroundColor: highlight }]} />
            <View style={[styles.bodyTiny, { backgroundColor: background }]} />
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
  rowWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    width: "45%",
    height: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  bodyShort: {
    width: "85%",
    height: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  bodyTiny: {
    width: "60%",
    height: 8,
    borderRadius: 6,
  },
});

export default CommentSkeleton;
