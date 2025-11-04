import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
//======================================================================================

import useGlobal from "@/assets/common/core/useGlobal";
import CalendarNotifDetails from "./CalendarNotifDetails";
import CalendarNotifTop from "./CalendarNotifTop";

//======================================================================================

function CalendarNotifView({
  time,
  Sender,
  serviceName,
  profileimg,
  document,
  communityName,
  verificationStatus,
}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        marginBottom: "1%",
        marginHorizontal: "1%",
        position: "relative",
        paddingBottom: 7, 
        paddingHorizontal: "2%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: isLight ? "#00000020" : "#00d9ff1b",
        shadowColor: isLight ? "#00000020" : "#ffffff1b",
      }}
    >
      <CalendarNotifTop
        time={time}
        profileimg={profileimg}
        verificationStatus={verificationStatus}
        Sender={Sender}
      />
      <CalendarNotifDetails
        Sender={Sender}
        serviceName={serviceName}
        document={document}
        communityName={communityName}
      />
    </TouchableOpacity>
  );
}

export default CalendarNotifView;

const styles = StyleSheet.create({});
