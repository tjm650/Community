import { StyleSheet, Text } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import { formatNumber } from "@/assets/core/utils/numberFormat";
import React from "react";

function StatsCount({count}) {
    const { theme } = useGlobal();
    let isLight = theme === "light";

    // Handle null/undefined count safely
    const safeCount = count !== null && count !== undefined ? count : 0;

    return (
      <Text
        style={{
          fontWeight: "500",
          fontSize: 12,
          color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
          textAlignVertical: "center",
        }}
      >
        {formatNumber(safeCount)}
      </Text>
    );
  };

export default StatsCount;

const styles = StyleSheet.create({});
