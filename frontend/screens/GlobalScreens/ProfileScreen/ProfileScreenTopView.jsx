import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";

//======================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const ProfileScreenTopView = ({ds1}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.goBack()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
        borderRadius: 20,
        marginRight: 20,
        position: "absolute",
        left: 0,
        marginLeft: "2%",
        marginTop:"1%"
      }}
    >
      <FontAwesomeIcon
        icon=" fa-solid fa-arrow-left"
        size={17}
        color={  DGlobals.text}
      />
    </TouchableOpacity>
  );
};

export default ProfileScreenTopView;

const styles = StyleSheet.create({});
