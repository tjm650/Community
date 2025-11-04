import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
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

const UserSharing = ({ height, GetIcon, CommmentSheet }) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
//   const CommmentSheet = useRef([]);

  const handleCommentSheetPress = () => {
    CommmentSheet.current.open();
  };
  return (
    <View>
      <Pressable onPress={handleCommentSheetPress}>{GetIcon}</Pressable>

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
        <View
          style={{
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: isLight ? LGlobals.lighttext : DGlobals.lighttext,
            }}
          >
            Comments
          </Text>
        </View>
      </RBSheet>
    </View>
  );
};

export default UserSharing;

const styles = StyleSheet.create({});
