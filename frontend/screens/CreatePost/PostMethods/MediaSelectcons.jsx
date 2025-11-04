import { StyleSheet, TouchableOpacity, View } from "react-native";
//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";

const MediaSelectcons = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 25,
        paddingHorizontal: "5%",
      }}
    >
      <TouchableOpacity>
        <FontAwesomeIcon
          icon="mountain-sun"
          size={20}
          color={isLight ? LGlobals.icon : DGlobals.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesomeIcon
          icon="fa-solid fa-paperclip"
          size={19}
          color={isLight ? LGlobals.icon : DGlobals.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MediaSelectcons;

const styles = StyleSheet.create({});
