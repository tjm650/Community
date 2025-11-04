import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

// ===================================================================//
import useGlobal from "@/assets/common/core/useGlobal";

function Button({ ButtonType, backgroundColor }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
      disabled
      activeOpacity={0.8}
      style={{
        backgroundColor: backgroundColor,
        height: 25,
        minWidth: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        borderColor: backgroundColor,
        borderWidth: 0.5,
        paddingHorizontal: "2%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: isLight ? LGlobals.text : DGlobals.text,
          fontWeight: "600",
        }}
      >
        {ButtonType}
      </Text>
    </TouchableOpacity>
  );
}

function ButtonTimer({ backgroundColor, ButtonType, timer, date }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        paddingVertical: "2%",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <Button backgroundColor={backgroundColor} ButtonType={ButtonType} />
      <Text
        style={{
          textAlign: "center",
          marginLeft: "1%",
          color: isLight
            ? "rgba(251, 84, 84, 0.67)"
            : "rgba(251, 84, 84, 0.67)",
        }}
      >
        {timer}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: isLight ? LGlobals.text : DGlobals.text,
        }}
      >
        {date}
      </Text>
    </View>
  );
}
function LiveForumCountDown({ startDate, endDate, endTime }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        marginVertical: "2%",
        justifyContent: "space-between",
      }}
    >
      <ButtonTimer
        date={startDate}
        ButtonType={"Date"}
        backgroundColor={"rgba(170, 178, 209, 0.117)"}
      />

      <ButtonTimer
        date={endDate}
        timer={endTime}
        ButtonType={"Close"}
        backgroundColor={"rgba(251, 84, 84, 0.262)"}
      />
    </View>
  );
}

export default LiveForumCountDown;

const styles = StyleSheet.create({});
