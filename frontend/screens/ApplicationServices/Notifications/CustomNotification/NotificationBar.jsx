import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const NotificationBar = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current; // Start off-screen (above)

  const { theme } = useGlobal();
  let isLight = theme === "light";

  useEffect(() => {
    if (message) {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Slide down to 0 (top of screen)
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after `duration`
      const timer = setTimeout(() => {
        hideNotification();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const hideNotification = () => {
    Animated.timing(slideAnim, {
      toValue: -100, // Slide back up
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          backgroundColor: isLight
            ? LGlobals.notificationBar.background
            : DGlobals.notificationBar.background,
          borderColor: isLight
            ? LGlobals.notificationBar.borderColor
            : DGlobals.notificationBar.borderColor,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 999,
          marginHorizontal: "2%",
        },
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
      <TouchableOpacity onPress={hideNotification} style={styles.closeButton}>
        <FontAwesomeIcon icon={faTimes} size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    color: "white",
    fontSize: 20,
  },
});

export default NotificationBar;
