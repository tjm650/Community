import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Accommodation from "../Community/Accommodation/Accommodation";
import Marketing from "../Community/Marketing/Marketing";
import HomeCommunityTopView from "../TopViews/HomeCommunityTopView";

const HomeCommunity = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(true);

  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [scrollPosition, setScrollPosition] = useState(0);

  const CONTAINER_HEIGHT = 47;
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
    setIsFocused((value) => !value);
  };

  /////////////////////////////////////////////////// Y-Scrolling ////////////////////////////////////////
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );

  var clampedScrollValue = 0;
  var offSetValue = 0;
  var scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - scrollValue;
      scrollValue = value;
      clampedScrollValue = Math.min(
        Math.max(clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      offSetValue = value;
    });
  }, []);

  const HeaderTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: "clamp",
  });

  const BottomTabTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, CONTAINER_HEIGHT * 2],
    extrapolate: "clamp",
  });

  var scrollEndTimer = null;

  const onMomnetumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };

  const onMomnetumScrollEnd = () => {
    const toValue =
      scrollValue > CONTAINER_HEIGHT &&
      clampedScrollValue > CONTAINER_HEIGHT / 2
        ? offSetValue + CONTAINER_HEIGHT
        : offSetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnim, {
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomnetumScrollEnd, 250);
  };

  /////////////////////////////////////////////////// X-Scrolling ////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    scrollPosition;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeCommunityTopView
          height={CONTAINER_HEIGHT}
          transform={[{ translateY: HeaderTranslate }]}
          scrollX={scrollX}
          scrollViewRef={scrollViewRef}
          screenWidth={screenWidth}
        />
      ),
    });
  }, [scrollPosition]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          //   { useNativeDriver: false }
          // )}
          scrollEventThrottle={16}
          style={{
            paddingTop: "2%",
          }}
        >
          <View
            id=""
            style={{
              width: Dimensions.get("window").width,
              paddingHorizontal: "1%",
            }}
            // focusable={true}
            // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
          >
            <Marketing />
          </View>
          <View
            id=""
            style={{
              width: Dimensions.get("window").width,
              paddingHorizontal: "1%",
            }}
          >
            <Accommodation />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeCommunity;

const styles = StyleSheet.create({});
