import React from "react";
import { StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LGlobals } from "@/constants/LightColor/LGlobals";
//======================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { useNavigation } from "@react-navigation/native";

const FocusableRBSheet = ({
  height,
  CommmentSheet,
  GetView,
  enable,
  maxHeight,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  //   const CommmentSheet = useRef([]);

  //   const handleCommentSheetPress = () => {
  //     CommmentSheet.current.open();
  //   };

  // enable && CommmentSheet.current.open();

  return (
    <View>
      <RBSheet
        closeOnPressMask={true}
        ref={CommmentSheet}
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
            maxHeight: maxHeight,
            height: height,
            padding: "2%",
            width: "100%",
            alignSelf: "center",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
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
        <View>{GetView}</View>
      </RBSheet>
    </View>
  );
};

export default FocusableRBSheet;

const styles = StyleSheet.create({});
