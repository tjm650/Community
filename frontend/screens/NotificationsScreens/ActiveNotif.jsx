import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { Entypo } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ActiveNotif = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
        width: "20%",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: isLight
            ? "rgba(246, 129, 129, 0.5)"
            : "rgba(246, 129, 129, 0.2)",
          paddingHorizontal: 2,
          paddingVertical: 2,
        }}
      >
        <Entypo
          name="stopwatch"
          size={15}
          style={{
            color: "red",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: isLight ? "#00475d64" : "#0040487f",
          paddingHorizontal: 2,
          paddingVertical: 2,
        }}
      >
        <FontAwesomeIcon
          icon="fa-regular fa-bell"
          size={15}
          color={isLight ? "#001f29" : "#7cf0ffe7"}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesomeIcon
          icon="fa-solid fa-ellipsis-vertical"
          size={15}
          color={isLight ? LGlobals.icon : DGlobals.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActiveNotif;

const styles = StyleSheet.create({});
