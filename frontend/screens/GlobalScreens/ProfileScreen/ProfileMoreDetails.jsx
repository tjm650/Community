import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
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
 
const ProfileMoreDetails = ({
  Inicon,
  GetIcon,
  inforStatus,
  details,
  itemStatus,
  icon,
  link = false,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [showAll, setshowAll] = useState(false);
  return (
    <View
      style={{
        justifyContent: "center",
        marginBottom: 10,
        borderBottomWidth: 0.3,
        borderColor: "#9ba1a654",
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
         marginBottom: 3,

        }}
      >
        {GetIcon}
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            fontWeight: 700,
          }}
        >
          {inforStatus}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setshowAll((val) => !val)}
        activeOpacity={0.6}
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: "2%",
          backgroundColor: isLight ? "#b5b5b53e" : "#00000049",
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          //marginBottom: 2,
        }}
      >
        {showAll ? (
          <View style={{}}>
            {details.slice(0, -1).map((item) => (
              <Text
                style={{
                  color: link
                    ? LGlobals.bluetext
                    : DGlobals.bluetext && isLight
                    ? LGlobals.lighttext
                    : DGlobals.lighttext,
                  marginBottom: 10,
                  fontWeight: link ? 600 : "",
                  textDecorationLine: link ? "underline" : "none",
                }}
              >
                <FontAwesomeIcon
                  icon={Inicon}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                  size={12}
                />
                {" "}
                {item}
              </Text>
            ))}
          </View>
        ) : (
          <View style={{}}>
            {details.slice(-3, -1).map((item) => (
              <Text
                style={{
                  color: link
                    ? LGlobals.bluetext
                    : DGlobals.bluetext && isLight
                    ? LGlobals.lighttext
                    : DGlobals.lighttext,
                  marginBottom: 10,
                  fontWeight: link ? 600 : "",
                  textDecorationLine: link ? "underline" : "none",
                }}
              >
                <FontAwesomeIcon
                  icon={Inicon}
                  color={isLight ? LGlobals.icon : DGlobals.icon}
                  size={12}
                />
                {" "}
                {item}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMoreDetails;

const styles = StyleSheet.create({});
