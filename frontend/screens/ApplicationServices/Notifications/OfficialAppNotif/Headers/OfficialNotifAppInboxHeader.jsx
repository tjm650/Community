import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from '@/assets/core/useGlobal';
import { LGlobals } from "@/constants/LightColor/LGlobals";


const OfficialNotifAppInboxHeader = ({subject}) => {
    const { theme } = useGlobal();
    let isLight = theme === "light";
  return (
    <View
      style={{
        backgroundColor: isLight? LGlobals.background : DGlobals.background,
        paddingVertical: "3%",
        paddingLeft: "5%",
        paddingRight: "1%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0,
        borderBottomColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: "5%",
        }}
      >
        <Text
        numberOfLines={1}
          style={{
            fontWeight: 800,
            fontSize: 25,
            color:  "rgba(248, 252, 254, 0.683)",
          }}
        >
          {subject}
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
        }}
      >

      </View>
    </View>
  );
}

export default OfficialNotifAppInboxHeader

const styles = StyleSheet.create({})