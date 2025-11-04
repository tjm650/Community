import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { DNotifs } from "@/constants/DarkColor/DNotifs";
// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import { LNotifs } from "@/constants/LightColor/LNotifs";
//======================================================================================

const Calendar = ({ CalendarOpen = true }) => {
  const [closeCalendar, setCloseCalendar] = useState(false);

  const { theme } = useGlobal();
  let isLight = theme === "light";
  return CalendarOpen ? (
    <TouchableOpacity
      style={{
        borderColor: isLight
          ? LNotifs.header.smallCarlendarBackgroundColor
          : DNotifs.header.smallCarlendarBackgroundColor,
        borderWidth: 0.3,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
        height: 200,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 5,
          right: 10,
        }}
        onPress={() => setCloseCalendar((value) => value != CalendarOpen)}
      >
        <Ionicons
          name={"chevron-down"}
          size={20}
          color={
            isLight
              ? LNotifs.header.smallCarlendarBackgroundColor
              : DNotifs.header.smallCarlendarBackgroundColor
          }
        />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          opacity: 0.5,
          color: isLight ? LGlobals.lighttext : LGlobals.lighttext,
          fontSize: 25,
          fontWeight: "700",
          marginBottom: "1%",
        }}
      >
        Calendar
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
        backgroundColor: isLight
          ? LNotifs.header.smallCarlendarBackgroundColor
          : DNotifs.header.smallCarlendarBackgroundColor,
      }}
      onPress={CalendarOpen((val) => (val = true))}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 5,
          right: 10,
        }}
        onPress={() => setCloseCalendar((value) => value != CalendarOpen)}
      >
        <Ionicons
          name={"chevron-forward"}
          size={20}
          color={
            isLight
              ? LNotifs.header.smallCarlendarBackgroundColor
              : DNotifs.header.smallCarlendarBackgroundColor
          }
        />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: 800,
          color: isLight
            ? LNotifs.header.smallCarlendarText
            : DNotifs.header.smallCarlendarText,

          padding: 7,
          marginHorizontal: "2%",
        }}
      >
        Friday 10 August 2024
      </Text>
    </TouchableOpacity>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
