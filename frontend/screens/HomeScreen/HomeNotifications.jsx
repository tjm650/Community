import React, { useLayoutEffect, useRef, useState } from "react";
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

import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import CalendarMain from "../CalendarScreens/CalendarMain";
import IconsSheet from "../CreatePost/IconsSheet/IconsSheet";
import Messages from "../EmailScreens/Messages";
import HomeNotifTopView from "../TopViews/HomeNotifTopView";

const HomeNotifications = () => {
  const navigation = useNavigation();
  const [openOptions, setOpenOptions] = useState(false);
  const messages = null;
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFocused, setIsFocused] = useState(true);



  const handleTabPress = (index) => {
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const handleScroll = (event) => {
    setScrollPosition(event.nativeEvent.contentOffset.x);
    setIsFocused((value) => !value);
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeNotifTopView
          // ScreenNotifType={scrollPosition == 0 ? "Notifications" : "Community"}
          DBFontSize={12}
          DBFontWeight={"500"}
          // UFontsize={12}
          UFontWeight={"500"}
          screenWidth={screenWidth}
          scrollX={scrollX}
          scrollViewRef={scrollViewRef}
          // tabs={tabs}
          handleTabPress={handleTabPress}
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
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={16}
      >
        <View 
          id=""
          style={{
            width: Dimensions.get("window").width,
          }}
          focusable={true}
        >
          {/* <Monetization /> */}
        </View>
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
            paddingHorizontal: "1%",
          }}
        >
          <Messages />
        </View>
        <View
          id=""
          style={{
            width: Dimensions.get("window").width,
          }}
          focusable={true}
        >
          <CalendarMain />
        </View>
      </ScrollView>
      <IconsSheet />
    </SafeAreaView>
  );
};

export default HomeNotifications;

const styles = StyleSheet.create({});
