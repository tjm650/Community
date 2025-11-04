import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

const ProfileDetails = ({
  inforStatus,
  details,
  icon,
  link = false,
  mb = false,
  onPress,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showAll, setshowAll] = useState(true);

  const handlePress = () => {
    setshowAll((val) => !val);
    onPress;
  };

  return (
    <View
      style={{
        marginBottom: mb ? 0 : "0.5%",
        borderBottomWidth: 0,
        paddingVertical: 10,
        paddingRight: 20,

        borderColor: "#9ba1a654",
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,

        flexDirection: "column",
        alignItems: showAll ? "flex-start" : "flex-start",
        // gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 10,
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          color={isLight ? LGlobals.icon : DGlobals.icon}
          size={17}
        />

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
      </View>

      <Pressable
        // onPress={handlePress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          // paddingHorizontal: "2%",
          //    backgroundColor: isLight ? "#b5b5b53e" : "#00000049",
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          gap: 10,
          width: "95%",
          maxWidth: "95%",
        }}
      >
        <Text
          numberOfLines={showAll ? 5 : 1}
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
            lineHeight: 23,
            maxWidth: "99%",
          }}
        >
          {details}
        </Text>
      </Pressable>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});
