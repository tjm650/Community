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

const UserDetailView = ({
  inforStatus,
  details,
  icon,
  link = false,
  mb = false,
  uneditable = false,
  onPress,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      activeOpacity={0.7}
      style={{
        marginBottom: mb ? 0 : "10%",
        borderBottomWidth: 0,
        // paddingVertical: "2%",
        borderColor: "#9ba1a654",
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,

        flexDirection: "column",
        // alignItems: "center",
        gap: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent:"center",
          paddingHorizontal: "1%",

          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //  marginBottom: 3,
          }}
        >
          <Text
            style={{
              color: isLight ? LGlobals.text : DGlobals.text,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            {inforStatus}
          </Text>
        </View>

        <FontAwesomeIcon
          icon={icon}
          color={isLight ? LGlobals.icon : DGlobals.icon}
          size={17}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: "1%",
          //    backgroundColor: isLight ? "#b5b5b53e" : "#00000049",
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          gap: 10,
          width: "95%",
          maxWidth: "95%",
          borderBottomWidth: !uneditable && 0.3,
          borderColor: isLight ? LGlobals.lighttext : DGlobals.lighttext,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            textAlignVertical: "top",
            color: link
              ? isLight
                ? LGlobals.bluetext
                : DGlobals.bluetext
              : isLight
              ? LGlobals.lighttext
              : DGlobals.lighttext,
            fontWeight: link ? 600 : "",
            paddingVertical: "2%",
            lineHeight: 23,
            maxWidth: "90%",
          }}
        >
          {details}
        </Text>

        {/* <FontAwesomeIcon
          icon={"pencil"}   
          color={isLight ? LGlobals.icon : DGlobals.icon}
          size={12} 
        /> */}
      </View>
    </View>
  );
};

export default UserDetailView;

const styles = StyleSheet.create({});
