import React, { useLayoutEffect, useRef, useState } from "react";
import {
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
  
  import { useNavigation } from "@react-navigation/native";
import useGlobal from "@/assets/core/useGlobal";
import MainHeader from "../GlobalScreens/MainHeader";
import Calendar from "./CalendarDetails/Calendar";
import UserLinks from "./CalendarDetails/UserLinks";
  
  const CalendarResourses = () => {
    const navigation = useNavigation();
    const ChannelSheet = useRef([]);
    const { theme } = useGlobal();
    let isLight = theme === "light";
  
    useLayoutEffect(() => {
      navigation.setOptions({
        header: () => (
          <MainHeader
            getView={
              <Text
                style={{
                  color: isLight ? LGlobals.text : DGlobals.text,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: "1%",
                }}
              >
                Career Resources
              </Text>
            }
          />
        ),
      });
    });
  
    const [CalendarOpen, setCalendarOpen] = useState(true);
  
    function ScrollToBottom(params) {
      setCalendarOpen((value) => (value = false));
    }
  
    function ScrollToTop(params) {
      setCalendarOpen((value) => (value = true));
    }
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          paddingHorizontal: "1%",
        }}
      >
  
        <ScrollView
          onScrollBeginDrag={() => ScrollToBottom()}
          onScrollToTop={() => ScrollToTop()}
          scrollEventThrottle={250}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingVertical: "2%",
            paddingHorizontal: "2%",
          }}
        >
          <Calendar />
  
    </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default CalendarResourses;
  
  const styles = StyleSheet.create({});
  