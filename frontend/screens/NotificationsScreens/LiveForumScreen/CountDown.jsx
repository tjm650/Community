import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
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
// ===================================================================//
import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function CountDown({ startTimer, endTimer }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const selectedHours = 60 * 60 * 24;
  const selectedMin = 60 * 60;
  const selectedSeconds = 60;
  const [count, setCount] = useState(selectedHours); // initial countdown value
  const [countMin, setCountMin] = useState(selectedMin); // initial countdown value
  const [countSec, setCountSec] = useState(selectedSeconds); // initial countdown value
  const [active, setActive] = useState(false); // is countdown active?

  //setActive(true);

  function CountDownTiming(s, x, y) {
    const minutes = Math.floor((x / selectedMin) * 60);
    //In Seconds
    if (s < 60) {
      return `${count}seconds`;
    }

    // Minutes
    if (s < 60 * 60) {
      const m = Math.floor(s / 60);
      return `${m}minutes`;
    }

    // Hours
    if (s < 60 * 60 * 24) {
      const h = Math.floor(s / (60 * 60));

      return `${h}hrs`;
    }

    // Days
    if (s < 60 * 60 * 24 * 7) {
      const d = Math.floor(s / (60 * 60 * 24));
      return `${d}day`;
    } else { return null }
  }

  function StartCount(params) {
    setActive(true);
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setActive(false);
    }, countMin * 1000);
  }

  function TimeIcon({ offset }) {
    const y = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const total = 1000;
      const bumb = 200;

      const animation = Animated.loop(
        Animated.sequence([
          Animated.delay(bumb * offset),
          Animated.timing(y, {
            toValue: 5,
            duration: bumb,
            easing: Easing.circle,
            useNativeDriver: true,
          }),
          Animated.timing(y, {
            toValue: 0,
            duration: bumb,
            easing: Easing.circle,
            useNativeDriver: true,
          }),
          Animated.delay(total - bumb * offset),
        ])
      );
      animation.start();
      return () => {
        animation.stop();
      };
    }, []);

    const translateY = y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2],
    });
    return (
      <View
        style={{
          alignItems: "center",
          //transform: [{ translateY }],
        }}
      >
        <FontAwesomeIcon
          icon="fa-regular fa-clock"
          size={15}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
      </View>
    );  
  }

  return (
    <Pressable
      onPress={StartCount}
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          width: "auto",
        }}
      >
        {CountDownTiming(count, countMin, countSec)}
      </Text>
      <TimeIcon />
    </Pressable>
  );
}

export default CountDown;

const styles = StyleSheet.create({});
