import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================

function LinkView({ icon, link }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        paddingRight: "5%",
        paddingHorizontal: "1%",
        paddingVertical: "1%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        overflow: "hidden",
        width:"95%"
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        size={15}
        color={isLight ? LGlobals.text : DGlobals.text}
      />
      <View
        style={{
          paddingHorizontal: "3%",
          paddingVertical: "1%",
          backgroundColor: isLight? LGlobals.buttonBackground : DGlobals.buttonBackground, //"#c9d4d46b",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          overflow: "hidden",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
           // width: "85%",
            textAlign: "left",
            color: isLight ? DGlobals.text : LGlobals.background,
            fontWeight:600
          }}
        >
          {link}
        </Text>
      </View>
    </View>
  );
}

function InternshipNotifInfor({
  website,
  location,
  locationDetails,
  emailAdress,
  Address,
}) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        marginTop: "3%",
        flexWrap: "wrap",
        flex: 1,
        gap: 10,
      }}
    >
      {website && <LinkView icon={"fa-solid fa-earth"} link={website} />}

      {emailAdress && (
        <LinkView icon={"fa-regular fa-envelope"} link={emailAdress} />
      )}

      {location && (
        <LinkView icon={"fa-solid fa-location"} link={locationDetails} />
      )}

      {Address && <LinkView icon={"fa-solid fa-location-dot"} link={Address} />}
    </View>
  );
}

export default InternshipNotifInfor;

const styles = StyleSheet.create({});
