import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
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
import useGlobal from "@/assets/common/core/useGlobal";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FilePicker from "../../CreatePost/FilePicker";
import InputPost from "../../CreatePost/PostMethods/InputPost";
import StatsCount from "./StatsCount";

function CommentView({ minHeight }) {
  const { theme } = useGlobal();
  let isLight = theme === "light";
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingVertical: "2%",
      }}
    >
      <View style={{ gap: 10 }}>
        <InputPost
          height={minHeight}
          textdescription={true}
          MoreIcons={true}
          post={false}
          showAdd={false}
          borderRadius={0}
        />

        <FilePicker/>
      </View>

      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          backgroundColor: isLight ? "rgba(88, 109, 113, 0.781)" : "#283638",
          borderRadius: 25,
          paddingVertical: "2%",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            textAlign: "center",
            color: isLight ? DGlobals.text : DGlobals.text,
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function UserComment({ height }) {
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
          flexDirection: "row",
          gap: 4,
          alignItems:"center"
        }}
      >

        <AntDesign
          name="message1"
          size={15}
          color={isLight ? LGlobals.lighttext : DGlobals.lighttext}
        />
        <StatsCount/>
      </TouchableOpacity>

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
        <CommentView minHeight={height / 1.5} />
      </RBSheet>
    </View>
  );
}

export default UserComment;

const styles = StyleSheet.create({});
