import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
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

const RBOptionsSheet = ({
  height,
  maxHeight,
  GetIcon,
  CommmentSheet,
  GetView,
  openable = false,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  //   const CommmentSheet = useRef([]);

  const handleCommentSheetPress = () => {
    CommmentSheet.current.open();
  };

  // if (openable) { 
  //   CommmentSheet.current.open();
  // }

  return (
    <View>
      <Pressable onPress={handleCommentSheetPress}>{GetIcon}</Pressable>

      <RBSheet
        ref={CommmentSheet}
        // draggable={true}
        // dragOnContent={true}
        // keyboardBehavior="interactive" // Makes sheet move with keyboard
        // keyboardBlurBehavior="restore" // Restores sheet position after keyboard dismiss
        // android_keyboardInputMode="adjustResize" // Android specific
        // closeOnPressBack={true}
        // customStyles={{
        //   wrapper: {
        //     backgroundColor: "transparent",
        //   },
        //   draggableIcon: {
        //     display: "none",
        //   },
        //   container: {
        //     maxHeight: maxHeight,
        //     height: height,
        //     padding: "2%",
        //     width: "100%",
        //     alignSelf: "center",
        //     borderTopLeftRadius: 13,
        //     borderTopRightRadius: 13,
        //     backgroundColor: isLight
        //       ? LGlobals.rbSheets.background
        //       : DGlobals.rbSheets.background,
        //     borderWidth: 0.3,
        //     borderColor: isLight
        //       ? LGlobals.rbSheets.borderColor
        //       : DGlobals.rbSheets.borderColor,
        //   },
        // }}
        // customModalProps={{
        //   animationType: "slide",
        //   statusBarTranslucent: true,
        // }}
        // customAvoidingViewProps={{
        //   enabled: true,
        // }}

        closeOnPressMask={true}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        keyboardBehavior="interactive" // Makes sheet move with keyboard
        keyboardBlurBehavior="restore" // Restores sheet position after keyboard dismiss
        android_keyboardInputMode="adjustResize" // Android specific
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            height: height,
            maxHeight: maxHeight,
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
        <View
          style={
            {
              // marginTop: "1%",
            }
          }
        >
          {GetView}
        </View>
      </RBSheet>
    </View>
  );
};

export default RBOptionsSheet;

const styles = StyleSheet.create({});
