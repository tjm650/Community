import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//Light";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//Light";
import useGlobal from "@/assets/common/core/useGlobal";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import SendIcon from "./SendIcon";

//======================================================================================

const InputPost = ({
  postmessage,
  setPostMessage,
  onSend,
  height,
  post = false,
  MoreIcons = false,
  textdescription = false,
  texttags = false,
  inputMode,
  onPressIn,
  showAdd = useState(false),
  moreOptions,
  minHeight,
  borderRadius,
  backgroundColor,
  maxHeight,
  onSubmitEditing,
  borderWidthB = false,
borderWidth
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";


  const [keyboardOpen, setKeyboardOpen] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState("")
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        (e) => {
          const keyboardHeight = e.endCoordinates.height;
          setKeyboardHeight(keyboardHeight)
          setKeyboardOpen(true);
          // hideView();
        }
      );
  
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardOpen(false);
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

  return (
    <View
      style={{
        flexDirection: post ? "row" : "column-reverse",
        alignItems: "flex-end",
        marginBottom: keyboardOpen && keyboardHeight,  
        // gap: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: textdescription
            ? "flex-start"
            : "center" || texttags
            ? "center"
            : "center",
          justifyContent: "space-between",
          paddingHorizontal: "5%",
          borderLeftWidth: borderWidthB ? borderWidth :  0.3,
          borderRadius: post ? 25 : borderRadius,
          borderColor: isLight ? LGlobals.icon : "#d0d0d08d",
          /* backgroundColor: post
            ? isLight
              ? "#172021"
              : "#7f7f7f50"
            : (isLight? LGlobals.background : DGlobals.background),*/
          backgroundColor: backgroundColor,
        }}
      >
        <TextInput
          onPressIn={onPressIn}
          multiline={true}
          inputMode={inputMode}
          scrollEnabled={true}
          onSubmitEditing={onSubmitEditing}
          placeholder={
            textdescription
              ? "Type message ..."
              : "" || texttags
              ? "Tags ..."
              : ""
          }
          placeholderTextColor={
            isLight ? LGlobals.lighttext : DGlobals.lighttext
          } //"#d0d0d08d"
          value={postmessage}
          onChangeText={setPostMessage}
          style={{
            width: "100%",
            paddingBottom: "3%",
            paddingRight: "5%",
            textAlignVertical: "top",
            minHeight: minHeight,
            maxHeight: Dimensions.get("window").height * 0.6,
            height: height,
            color: isLight ? LGlobals.text : DGlobals.text,
          }}
        />
      </View>

      {post ? (
        <View
          style={{
            gap: 15,
            flexDirection: "row",
          }}
        >
          {showAdd && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                width: 35,
                height: 35,
                borderRadius: 35,
                backgroundColor: isLight ? "#172021" : "#283638",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: borderWidthB ? borderWidth : 0.3,
                borderColor: "#6e9aa05a",
              }}
              onPress={moreOptions}
            >
              <FontAwesomeIcon icon="plus" size={20} color="#07c9e3" />
            </TouchableOpacity>
          )}

          <SendIcon onPress={onSend} />
        </View>
      ) : (
        ""
      )}
    </View>
  );
};

export default InputPost;

const styles = StyleSheet.create({});
