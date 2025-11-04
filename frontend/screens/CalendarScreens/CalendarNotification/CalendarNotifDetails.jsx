import React from "react";
import { StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

//======================================================================================

const CalendarNotifDetails = ({
  Sender,
  serviceName,
  document,
  communityName,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const findDoc = document.split(".");
  
  return (
    <View
      id="Desc-View"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: document ? "90%" : "100%",
        paddingHorizontal: "2%",
      }}
    >
      {document ? (
        <View
          activeOpacity={0.5}
          style={{
            marginRight: "2%",
            overflow: "hidden",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-file-invoice"
            size={25}
            color={isLight ? LGlobals.icon : DGlobals.icon}
          />
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontSize: 10,
              fontWeight: "500",
            }}
          >
            {findDoc.length > 1 ? findDoc.pop() : ""}
          </Text>
        </View>
      ) : (
        ""
      )}
      <View
        style={{
          maxWidth: document ? "90%" : "100%",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
          numberOfLines={2}
        >
          Received a document by{" "}
          <Text
            style={{
              fontWeight: "500",
              color: isLight ? LGlobals.bluetext : DGlobals.bluetext,
            }}
          >
            @ {Sender}
          </Text>{" "}
          from{" "}
          <Text style={{ }}>
            {" "}
            {serviceName
              ? serviceName
              : communityName
              ? communityName
              : "inbox"}
          </Text>
        </Text>
        
        <Text
          numberOfLines={1}
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        >
          
          <Text
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            }}
          >
            {" "}
            {document}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default CalendarNotifDetails;

const styles = StyleSheet.create({});
