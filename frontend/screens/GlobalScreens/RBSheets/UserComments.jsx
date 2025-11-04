import React, { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
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
import useGlobal from "@/assets/core/useGlobal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";

const UserComments = ({
  StatsCountView,
  isPostInteractions = false,
  CommentsView,
}) => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  let isLight = theme === "light";
  const CommmentSheet = useRef([]);

  const handleCommentSheetPress = () => {
    CommmentSheet.current.open();
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handleCommentSheetPress}
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: isLight ? "#43515321" : "#303030",
          paddingVertical: 2,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
        }}
      >
        <FontAwesomeIcon
          icon="fa-regular fa-comments"
          size={isPostInteractions ? 20 : 16}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
        {StatsCountView}
      </TouchableOpacity>

      <RBSheet
        closeOnPressMask={true}
        ref={CommmentSheet}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(2, 28, 32, 0.75)",
            // backgroundColor: "transparent",
          },
          draggableIcon: {
            display: "none",
          },
          container: {
            height: "90%",
            // minHeight:"20%",
            position:"absolute",
            bottom:0,
            top:"10%",
            zIndex:99,
            paddingHorizontal: "0%",
            width: "100%", 
            alignSelf: "center",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: isLight
              ? LGlobals.rbSheets.borderColor
              : DGlobals.rbSheets.borderColor,
          },
        }}
        customModalProps={{
          animationType: "fade",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}
      >
        {CommentsView}
      </RBSheet>
    </View>
  );
};

export default UserComments;

const styles = StyleSheet.create({});
