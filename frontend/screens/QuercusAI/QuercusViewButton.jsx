import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import useGlobal from '@/assets/common/core/useGlobal';

const QuercusViewButton = () => {
  const navigation = useNavigation(); 
  const { theme } = useGlobal();
  const isLight = theme === 'light';
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);

  const descriptions = [
    "Intelligent campus companion to support you throughout your academic journey",
    "Get instant answers to your complex questions with Quercus",
    "Personalized learning recommendations based on your study patterns and goals",
    "Gemini powered AI!",
  ];

  // Auto-scroll animation for descriptions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) =>
        prevIndex === descriptions.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change description every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentDescriptionIndex]);

  return (
    <Pressable
      onPress={() => navigation.navigate("QuercusHome")}
      style={{
        // marginBottom: "7%",
        height: Dimensions.get("window").width * 0.3,
         borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
        // borderWidth: 1,
        borderColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
        // backgroundColor: isLight ? LGlobals.background : DGlobals.background,

        

        // Additional border styling
        // borderTopWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 2,
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: "100%",
          height: Dimensions.get("window").width * 0.3,
          zIndex: 0,
          resizeMode: "cover",
          borderRadius: 15,
        //   opacity: 0.1,
        }}
        source={require("@/assets/images/general.jpg")}
      />

      <View style={{
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: "4%",
        paddingVertical: "2%"
      }}>

        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "700",
            fontSize: 28,
            // textAlign: 'center',
            textShadowColor: isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Quercus
        </Text>

     
        <View style={{
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:5,
        }}>
          <Animated.Text
            style={{
              opacity: fadeAnim,
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "500",
              fontSize: 14,
            //   textAlign: 'center',
              lineHeight: 18,
            }}
          >
            {descriptions[currentDescriptionIndex]}
          </Animated.Text>
        </View>

        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: "500",
            fontSize: 20,
            marginTop: 8,
            // textAlign: 'center',
            textShadowColor: isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}
        >
          Try Quercus. Now Available !
        </Text>

        {/* Decorative dots indicator */}
        {/* <View style={{
          flexDirection: 'row',
          marginTop: 6,
          gap: 4,
        }}>
          {descriptions.map((_, index) => (
            <View
              key={index}
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: index === currentDescriptionIndex
                  ? (isLight ? LGlobals.bluetext : DGlobals.bluetext)
                  : (isLight ? LGlobals.lighttext : DGlobals.lighttext),
                opacity: index === currentDescriptionIndex ? 1 : 0.4,
              }}
            />
          ))}
        </View> */}
      </View>
    </Pressable>
  );
};
export default QuercusViewButton

const styles = StyleSheet.create({})