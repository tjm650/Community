import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import Events from "../NotificationsScreens/Events";
import HomeTopView from "../TopViews/HomeTopView";
import DailyBlog from "./Home/DailyBlog/DailyBlog";
import Posts from "./Home/Post/Posts";

const Home = () => {
  const [OpenDailyBlog_Updates, setOpenDailyBlog_Updates] = useState(true);
  const navigation = useNavigation();
  const messages = null;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  //////////////////////////////////////// Hide Header//////////////////////////////////

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
  };

  const CONTAINER_HEIGHT = 47;
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

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
        <HomeTopView
          height={CONTAINER_HEIGHT}
          transform={[{ translateY: HeaderTranslate }]}
          DBFontSize={14}
          DBFontWeight={"500"}
          UFontsize={14}
          UFontWeight={"500"}
          scrollX={scrollX}
          scrollViewRef={scrollViewRef}
          screenWidth={screenWidth}
        />
      ),
    });
  }, [scrollPosition]);

  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        //paddingTop: "3%"
      }}
    >
      <ScrollView
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{
          paddingTop: "2%",
        }}
      >
        <Animated.View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "1%",
          }}
          // focusable={true}
          // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 20,
              fontWeight: "500",
              textAlign:"center",
              textAlignVertical:"center"
            }}
          >
            Explore new content
          </Text>
        </Animated.View>

        {/* <Animated.View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "1%",
          }}
        >
          <DailyBlog
            onMomentumScrollBegin={onMomnetumScrollBegin}
            onMomentumScrollEnd={onMomnetumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={1}
            height={CONTAINER_HEIGHT * 2}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        </Animated.View> */}

        {/* <Animated.View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "1%",
          }}
        >
          <Posts
            onMomentumScrollBegin={onMomnetumScrollBegin}
            onMomentumScrollEnd={onMomnetumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={1}
            height={CONTAINER_HEIGHT * 2}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        </Animated.View> */}

        <Animated.View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "1%",
          }}
        >
          <Events
            onMomentumScrollBegin={onMomnetumScrollBegin}
            onMomentumScrollEnd={onMomnetumScrollEnd}
            onScrollEndDrag={onScrollEndDrag}
            scrollEventThrottle={1}
            height={CONTAINER_HEIGHT * 2}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
