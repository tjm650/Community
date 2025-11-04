import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
   Animated,
   Dimensions,
   Easing,
   Image,
   SafeAreaView,
   StyleSheet,
   Text,
   View
 } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";


// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const Splash = () => {
  const navigation = useNavigation();

  const { theme } = useGlobal();
  let isLight = theme === "light";

  // Create animated values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Expand the letter "T"
    Animated.timing(scaleValue, {
      toValue: 2,
      duration: 500, 
      useNativeDriver: true,
    }).start(() => {
      // After expanding, spin the letter
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        // 3. Finally, bounce for 1 second
        Animated.sequence([
          Animated.spring(bounceValue, {
            toValue: 1,
            speed: 12,
            bounciness: 8,
            useNativeDriver: true,
          }),
          Animated.spring(bounceValue, {
            toValue: 0,
            speed: 12,
            useNativeDriver: true,
          }),
        ]).start();
      });
    });
  }, []);

  // Create interpolated values
  const animatedScale = scaleValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 2],
  });

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const bounceInterpolation = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5], // Moves up by 20px when bouncing
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        // paddingVertical: "80%",
        backgroundColor: "#151718",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          height: "90%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Image
           source={require('@/assets/logo.png')}
           style={{
             width: 200,
             height: 200,
            //  tintColor: isLight ? LGlobals.text : DGlobals.text,
             // transform: [
             //   { scale: animatedScale }, // Use the interpolated value here
             //   // { rotateY: rotateInterpolation },
             //   // { translateY: bounceInterpolation },
             // ],
           }}
         />
      </View>
      <View style={{}}>
        {/* <FontAwesomeIcon
            icon="fa-solid fa-meteor"
           // size={50}
            color={"white"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "auto",
             
            }}
          /> */}
      </View>

      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: Dimensions.get("window").height * 0.1,
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            textAlign: "center",
            fontWeight: 800,
            fontSize: 25,
            textAlignVertical: "center",
          }}
        >
          Community
        </Text>
        {/* <Image
           source={require('@/assets/logo.png')}
           style={{
             width: 45,
             height: 45,
            //  tintColor: isLight ? LGlobals.text : DGlobals.text,
           }}
         /> */}
        {/* <FontAwesomeIcon icon="fa-solid fa-meteor" color="#ECEDEE" size={25} /> */}
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
