import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const MoreInfoSheet = ({ GetView, GetIcon, height, activeOpacity }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const Sheet = useRef([]);

  const handleChannelPress = () => {
    Sheet.current.open();
  };

  
  return (
    <View>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={handleChannelPress}>
        {GetIcon}
      </TouchableOpacity>
      <RBSheet
        ref={Sheet}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: { 
            display: "none",
          },
          container: {
            height: height,
            width: "100%",
            alignSelf: "center",       
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: isLight
              ? LGlobals.rbSheets.background
              : DGlobals.rbSheets.background,      
            borderWidth: 0.3,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}
      >
        {GetView}
      </RBSheet>
    </View>
  );
};

export default MoreInfoSheet;

const styles = StyleSheet.create({});
