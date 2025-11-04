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

function IntershipNotifTopView({ CompanyName }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
    style={{
      width:"100%",
      flexDirection:"row",
      alignItems:"center",
      justifyContent: "space-between",
    }}
    >
      <Text
        numberOfLines={2}
        style={{
          fontWeight: 800,
          fontSize: 17,
          color: isLight ? LGlobals.text : DGlobals.text,
          
        }}
      >
        {CompanyName}
      </Text>
      <FontAwesomeIcon
        icon="fa-solid fa-bell"
        size={16}
        color={isLight ? LGlobals.bellNotifIcon : DGlobals.bellNotifIcon}
        style={{marginRight:"2%"}}
      />
    </View>
  );
}

export default IntershipNotifTopView;

const styles = StyleSheet.create({});
