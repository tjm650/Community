import React from "react";
import { StyleSheet, Text, View } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//==============================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ProfileDetails from "../ProfileDetails";
import ProfileMoreDetails from "../ProfileMoreDetails";

function MoreDetails({ details }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View style={{}}>
      {details.slice(0, 4).map((item) => (
        <Text
          style={{
            color: isLight ? LGlobals.text : DGlobals.text,
            marginBottom: 10,
          }}
        >
          <FontAwesomeIcon
            icon={Inicon}
            color={isLight ? LGlobals.icon : DGlobals.icon}
            size={12}
          />
          {"   "}
          {item}
          {"   "}

          <Text
            style={{
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            }}
          >kkk</Text>
        </Text>
      ))}
    </View>
  );
}

const FacultyProfile = ({
  ds1,
  Executives,
  departments,
  programs,
  code,
  proff,
  networkLink
}) => {
  return (
    <View>
      <ProfileDetails inforStatus={"Service"} icon={"f"} details={ds1} />
      <ProfileDetails inforStatus={"Code"} icon={"e"} details={code} />
      <ProfileMoreDetails
        inforStatus={"Network Links"}
        link={true}
        icon={"link"}
        Inicon={"link"}
        details={networkLink}
      />
      
      <ProfileMoreDetails
        inforStatus={"Executives"}
        Inicon={"user"}
        details={Executives}
        details2={proff}
      />
      <ProfileMoreDetails
        inforStatus={"Departments"}
        Inicon={"industry"}
        details={departments}
      />
      <ProfileMoreDetails
        inforStatus={"Programs"}
        Inicon={"p"}
        details={programs}
      />
    </View> 
  );
};

export default FacultyProfile;

const styles = StyleSheet.create({});
