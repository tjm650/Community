import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const MoreOpts = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const navigation = useNavigation();
  const translateX = new Animated.Value(0);
  const duration = 800;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 20,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <Animated.View
      style={{
        transform: [{ translateX }],
        marginVertical: "3%",
        marginBottom: "7%",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "700",
          fontSize: 21,
          marginBottom: "3%",
          color: isLight ? LGlobals.text : DGlobals.text,
        }}
      >
        Quick Navigator{"  "}
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 17,
          }}
        ></Text>
      </Text>
    </Animated.View>
  ) : null;
};

export default MoreOpts;

const styles = StyleSheet.create({});
