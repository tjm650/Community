import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import useGlobal from '@/assets/common/core/useGlobal';

const TypingIndicator = ({ isVisible, message = "thinking..." }) => {
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      const startAnimation = (dot, delay) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const anim1 = startAnimation(dot1Opacity, 0);
      const anim2 = startAnimation(dot2Opacity, 200);
      const anim3 = startAnimation(dot3Opacity, 400);

      anim1.start();
      anim2.start();
      anim3.start();

      return () => {
        anim1.stop();
        anim2.stop();
        anim3.stop();
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.loadingContainer}>
      <View style={[
        styles.loadingBubble,
        { backgroundColor: isLight ? 'rgba(143, 193, 211, 0.2)' : 'rgba(29, 38, 42, 0.9)' }
      ]}>
        <Text style={[
          styles.loadingText,
          { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }
        ]}>
          {message}
        </Text>
        <View style={styles.dotsContainer}>
          <Animated.View style={[
            styles.dot,
            { opacity: dot1Opacity },
            { backgroundColor: isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground }
          ]} />
          <Animated.View style={[
            styles.dot,
            { opacity: dot2Opacity },
            { backgroundColor: isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground }
          ]} />
          <Animated.View style={[
            styles.dot,
            { opacity: dot3Opacity },
            { backgroundColor: isLight ? LGlobals.buttonBackground : DGlobals.buttonBackground }
          ]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  loadingText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default TypingIndicator;