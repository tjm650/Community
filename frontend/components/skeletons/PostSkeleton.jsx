import useGlobal from "@/assets/core/useGlobal";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

// Post-specific skeleton: avatar + title lines + media + action row
const PostSkeleton = ({ rows = 3 }) => {
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
        <Animated.View key={i} style={[styles.card, { opacity }]}>
          <View style={styles.headerRow}>
            <View style={[styles.avatar, { backgroundColor: background }]} />
            <View style={styles.headerText}>
              <View style={[styles.title, { backgroundColor: background }]} />
              <View style={[styles.subtitle, { backgroundColor: highlight }]} />
            </View>
          </View>

          <View style={[styles.media, { backgroundColor: background }]} />

          <View style={styles.actionRow}>
            <View style={[styles.actionIcon, { backgroundColor: background }]} />
            <View style={[styles.actionIcon, { backgroundColor: background }]} />
            <View style={[styles.actionIcon, { backgroundColor: background }]} />
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
  card: {
    marginBottom: 14,
    borderRadius: 8,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    width: "60%",
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  subtitle: {
    width: "40%",
    height: 10,
    borderRadius: 6,
  },
  media: {
    marginTop: 12,
    height: 160,
    borderRadius: 8,
  },
  actionRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  actionIcon: {
    width: 36,
    height: 12,
    borderRadius: 6,
  },
});

export default PostSkeleton;
