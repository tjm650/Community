import useGlobal from "@/assets/core/useGlobal";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Simple skeleton loader for feed-like lists. Uses a pulsing opacity animation
// instead of a true shimmer to avoid extra dependencies.
const FeedSkeleton = ({ rows = 5, compact = false }) => {
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

  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: rows }).map((_, i) => (
        <Animated.View key={i} style={[styles.card, { opacity }] }>
          <View style={[styles.row, { alignItems: "center" }]}>
            <View style={[styles.avatar, { backgroundColor: background }]} />
            <View style={styles.textBlock}>
              <View style={[styles.lineShort, { backgroundColor: background }]} />
              <View style={[styles.lineLong, { backgroundColor: highlight }]} />
            </View>
          </View>

          {!compact && <View style={[styles.media, { backgroundColor: background }]} />}
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
  card: {
    marginBottom: 14,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  textBlock: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  lineShort: {
    width: "40%",
    height: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  lineLong: {
    width: "80%",
    height: 10,
    borderRadius: 6,
  },
  media: {
    marginTop: 12,
    height: 140,
    borderRadius: 8,
  },
});

export default FeedSkeleton;
