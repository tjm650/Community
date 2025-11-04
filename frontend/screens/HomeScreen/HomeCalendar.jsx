import React, { useLayoutEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import CalendarMainTopView from "../TopViews/Calendar/CalendarMainTopView";

  
  const HomeCalendar = () => {
    const navigation = useNavigation();
    const [openOptions, setOpenOptions] = useState(false);
    const messages = null;
    const { theme } = useGlobal();
    let isLight = theme === "light";
  
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFocused, setIsFocused] = useState(true);
  
    const handleScroll = (event) => {
      setScrollPosition(event.nativeEvent.contentOffset.x);
      setIsFocused((value) => !value);
    };
  
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => (
          <CalendarMainTopView
            screenType={scrollPosition == 0 ? "Calendar" : "Lessons"}
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
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onScroll={handleScroll}
          scrollEventThrottle={0}
        >
          <Animated.View
            id=""
            style={{
              width: Dimensions.get("window").width,
              paddingHorizontal: "1%",
            }}
            focusable={true}
            // onAccessibilityTap={() => setLeftScroll((value) => (value = false))}
          >
          <CalendarMain/>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default HomeCalendar;
  
  const styles = StyleSheet.create({});
  