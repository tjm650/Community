import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import InternshipNotifInfor from "./InternshipNotifInfor";
import IntershipNotifTopView from "./IntershipNotifTopView";

const InternshipsNotifView = ({
  name,
  description,
  website,
  location,
  locationDetails,
  time,
  Address,
  emailAdress,
  CompanyName,
  onPress,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <TouchableOpacity
    activeOpacity={0.8}
      onPress={onPress}
      style={{
        marginBottom: 0,
        paddingVertical: "2%",
        paddingHorizontal: "2%",
        borderBottomWidth: 0.3,
        borderColor: "#343434",
      }}
    >
      <IntershipNotifTopView CompanyName={CompanyName} />
      <InternshipNotifInfor emailAdress={emailAdress} time={time} />
      {!emailAdress && (
        <Text
          style={{
            color: isLight ? DGlobals.icon : LGlobals.icon,
            fontWeight: 600,
          }}
        >
          Open for more details
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default InternshipsNotifView;

const styles = StyleSheet.create({});
