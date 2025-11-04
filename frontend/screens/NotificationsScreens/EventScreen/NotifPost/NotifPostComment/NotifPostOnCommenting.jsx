import React from "react";
import { StyleSheet, View } from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import NotifPostView from "../NotifPostView";

//======================================================================================

const NotifPostOnCommenting = ({ item }) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  return (
    <View
      style={{
        // backgroundColor: isLight ? LGlobals.icon : DGlobals.ImageBackground,
        backgroundColor: isLight ? "#43515321" : "#303030",
        borderBottomWidth: 0,
        borderBottomColor: isLight
          ? LGlobals.borderColor
          : DGlobals.borderColor,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginHorizontal: "1%",
      }}
    >
      <NotifPostView item={item} />
    </View>
  );
};

export default NotifPostOnCommenting;

const styles = StyleSheet.create({});
