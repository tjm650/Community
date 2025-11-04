import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const BottomNotif = ({ Auth, HandleOk }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const [openNotif, setOpenNotif] = useState(true);
  // const { height } = Dimensions.get("window");
  // const translateY = new Animated.Value(height);

  // if (Auth) {
  //   Animated.timing(translateY, {
  //     toValue: 20,
  //     duration: 300,
  //     easing: Easing.out(Easing.ease),
  //     useNativeDriver: true,
  //   }).start();
  // }
 
  return (
    <TouchableOpacity
      onPress={HandleOk}
      style={{
        position: "absolute",
        flex: 1,
        height: "100%",
        width: "100%",
        // backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignSelf: "center",
        zIndex: 99,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: "10%",
      }}
    >
      
      <BlurView
        intensity={100}
        tint="dark"
        reducedTransparencyFallbackColor="black"
        style={{
          maxWidth: Dimensions.get("window").width * 0.9,
          width: "auto",
          height: "auto",
          borderColor: "#808080",
          borderWidth: 0,
          backgroundColor: "rgba(3, 91, 101, 0.74)",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          overflow: "hidden",
          paddingVertical: "2%",
          paddingHorizontal: "3%",
          // transform: [{ translateY }],
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          {Auth}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
};

export default BottomNotif;

const styles = StyleSheet.create({});
