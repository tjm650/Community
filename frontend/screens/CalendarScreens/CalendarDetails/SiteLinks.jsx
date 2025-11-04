import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function LinkOptionsView({ icon, option }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        gap: 25,
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <View>{icon}</View>
      <View>
        <Text
          style={{
            fontWeight: "700",
            color: isLight ? LGlobals.text : DGlobals.text,
            fontSize: 17,
          }}
        >
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const SiteLinks = () => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        marginBottom: "5%",
        borderBottomWidth: 0.3,
        borderBottomColor: "#606060",
      }}
    >
      <LinkOptionsView
        icon={
          <FontAwesomeIcon
            icon="route"
            size={25}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"Nust Web"}
      />
      <LinkOptionsView
        icon={
          <FontAwesomeIcon
            icon="route"
            size={25}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"Portal"}
      />
      <LinkOptionsView
        icon={
          <FontAwesomeIcon
            icon="route"
            size={25}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"Moodle"}
      />
      <LinkOptionsView
        icon={
          <FontAwesomeIcon
            icon="route"
            size={25}
            color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
          />
        }
        option={"Library"}
      />
    </View>
  );
};

export default SiteLinks;

const styles = StyleSheet.create({});
