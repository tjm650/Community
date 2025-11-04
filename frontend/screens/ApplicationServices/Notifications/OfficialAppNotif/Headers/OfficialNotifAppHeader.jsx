import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from '@/assets/core/useGlobal';
import { LGlobals } from "@/constants/LightColor/LGlobals";

const OfficialNotifAppHeader = () => {
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
        borderBottomWidth: 0,
        borderBottomColor: isLight ? LGlobals.borderColor : DGlobals.borderColor,
      }}
    >
      <View
        style={{
          
        }}
      >
        <Text
          style={{
            fontWeight: 800,
            fontSize: 25,
            color: isLight ? LGlobals.text : DGlobals.fadetext,
            textAlign:"center",
            width:"100%"
          }}
        >
          Community ©
        </Text>
      </View>
    </View>
  );
}

export default OfficialNotifAppHeader

const styles = StyleSheet.create({})