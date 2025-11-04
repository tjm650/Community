import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
  
  // ========================== Colors ==========================================//
  // ============= Dark ============================//
  
  //import { Globals } from "../..//Light";
  import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";
  
  // ============= Light ============================//
  
  //import { Globals } from "../..//Light";
  import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
  
  //======================================================================================
  
  import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import ProfileImage from "../../GlobalScreens/ProfileImage";
  
  const CalendarMainTopView = ({ screenType }) => {
    const navigation = useNavigation();
    const [openOptions, setOpenOptions] = useState(false);
    const [moreNotifs, setMoreNotifs] = useState(false);
  
    const { theme } = useGlobal();
    let isLight = theme === "light";
  
    ////////////////// Functions ///////////////////////////////////
    function Options({ text, onPress, icon }) {
      const { theme } = useGlobal();
      let isLight = theme === "light";
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={{
            paddingVertical: 10,
            borderBottomWidth: 0,
            borderColor: "#606060",
            paddingHorizontal: "5%",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: "600",
            }}
          >
            {text}
          </Text>
          <Pressable>{icon}</Pressable>
        </TouchableOpacity>
      );
    }
  
    function OpenLessons() {
      navigation.navigate("Lessons");
      setOpenOptions((value) => (value = false));
    }
  
    function OpenInclasses() {
      navigation.navigate("Inclasses");
      setOpenOptions((value) => (value = false));
    }
  
    function OpenExams() {
      navigation.navigate("Exams");
      setOpenOptions((value) => (value = false));
    }
  
    function OpenAll() {
      navigation.navigate("All");
      setOpenOptions((value) => (value = false));
    }
  
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: "3%",
          paddingVertical: "3%",
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
          borderBottomWidth: 0,
          borderBottomColor: "#d1d1d6a4",
          flexDirection: "row",
        }}
      >
        <View
          onTouchStart={() => setOpenOptions((value) => (value = false))}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "60%",
          }}
        >
          <ProfileImage />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text
              style={{
                fontWeight: 800,
                fontSize: 19,
                color: isLight ? LGlobals.text : DGlobals.text,
              }}
            >
              {screenType}
            </Text>
          </View>
        </View>
  
        <View
          style={{
            alignItems: "center",
            gap: 15,
            justifyContent: "flex-end",
            flexDirection: "row-reverse",
          }}
        >
          <Pressable onPress={() => setOpenOptions((value) => !value)}>
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              size={20}
              color={isLight ? LGlobals.icon : DGlobals.icon}
            />
          </Pressable>
  
         
        </View>
        {openOptions && (
          <View
            style={{
              position: "absolute",
              height: "auto",
              width: "auto",
              top: "150%",
              right: "1%",
              paddingRight: "5%",
              backgroundColor: isLight
                ? LNotifs.header.ExpanderBackgroundColor
                : DNotifs.header.ExpanderBackgroundColor,
              zIndex: 1,
              borderRadius: 5,
              borderWidth: 0.3,
              borderColor: isLight
                ? LNotifs.header.ExpanderBorderColor
                : DNotifs.header.ExpanderBorderColor,
            }}
          >
            {moreNotifs && <View></View>}
          </View>
        )}
      </View>
    );
  };
  
  export default CalendarMainTopView;
  
  const styles = StyleSheet.create({});
  