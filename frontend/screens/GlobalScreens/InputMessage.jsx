import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState } from "react";
// ========================== Colors ==========================================//
// ============= Dark ============================//

//import { Globals } from "../..//DarkColor";
import { DCommunity } from "@/constants/DarkColor/DCommunity";
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//

//import { Globals } from "../..//DarkColor";
import { LCommunity } from "@/constants/LightColor/LCommunity";
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================
import useGlobal from "@/assets/common/core/useGlobal";
import { ScrollView } from "react-native";
import { ActivityIndicator, Modal } from "react-native-paper";

const InputMessage = ({
  message,
  setMessage,
  onSend,
  image,
  showSelected,
  tagedMessage,
  pickImage,
  setImage,
  setImage1,
  onPressImage,
}) => {
  const { theme } = useGlobal();
  let isLight = theme === "light";

  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recordingTimerRef = useRef(null)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        const keyboardHeight = e.endCoordinates.height;
        setKeyboardHeight(keyboardHeight)
        setKeyboardOpen(true);
        setShowEmojiPicker(false);
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

  // Emoji picker
  const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '😢', '😡', '👍', '👎', '❤️', '💔', '🎉', '🎂', '🌹', '🍕', '☕', '🚀', '💯', '🔥'];
  
  const addEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  // Voice recording functions
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setRecordingTime(0);
    // Here you would implement actual voice recording logic
    Alert.alert('Voice Message', 'Voice recording feature coming soon!');
  };

  return (
    <View style={{ width: "100%", marginBottom: keyboardOpen && keyboardHeight }}>
      {showSelected && (
        <View
          style={{
            paddingHorizontal: "5%",
            paddingVertical: "2%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          >
            {tagedMessage.text}
          </Text>
        </View>
      )}

      {image && (
        <View
          style={{
            flexDirection: "row-reverse",
            gap: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => pickImage(setImage, setImage1)}
            style={{
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderWidth: 1,
              borderColor: isLight ? LGlobals.icon : DGlobals.icon,
              alignSelf: "flex-end",
              marginHorizontal: "7%",
              overflow: "hidden",
              marginBottom: "5%",
            }}
          >
            <View
              style={{
                position: "absolute",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(32, 43, 44, 0.65)",
                zIndex: 99,
                height: "100%",
                paddingVertical: "10%",
                right: 0,
                left: 0,
              }}
            >
              <ActivityIndicator
                size={20}
                color={isLight ? LGlobals.greyText : DGlobals.greyText}
              />
            </View>
            <Image
              style={{
                resizeMode: "cover",
                // aspectRatio: 2, // imageSize.height
                height: Dimensions.get("window").height * 0.2,
                width: Dimensions.get("window").width * 0.3,
                overflow: "hidden",
                borderWidth: 0,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderColor: isLight
                  ? LCommunity.GInbox.imageBackground
                  : DCommunity.GInbox.imageBackground,
                backgroundColor: isLight
                  ? LCommunity.GInbox.imageBackground
                  : DCommunity.GInbox.imageBackground,
              }}
              source={{ uri: image }}
            />
          </TouchableOpacity>

          {!message && (
            <TouchableOpacity
              onPress={onPressImage}
              activeOpacity={0.8}
              style={{
                alignItems: "center",
                // borderWidth: 0.3,
                // backgroundColor: "rgba(32, 43, 44, 0.65)",
                borderColor: isLight
                  ? LGlobals.borderColor
                  : DGlobals.borderColor,
                paddingHorizontal: "1%",
                height: 20,
                borderRadius: 20,
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-paper-plane"
                size={20}
                color={isLight ? LGlobals.icon : DGlobals.icon}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      <View
        style={{
          paddingHorizontal: "3%",
          paddingBottom: "2%",
          backgroundColor: "transparent",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 18,
            borderWidth: 0.3,
            borderRadius: 25,
            borderColor: isLight
              ? LGlobals.inputMessages.borderColor
              : DGlobals.inputMessages.borderColor,
            backgroundColor: isLight
              ? LGlobals.inputMessages.backgroundColor
              : DGlobals.inputMessages.backgroundColor,
            height: 40,
          }}
        >
          <TextInput
            multiline={true}
            placeholder="Type message..."
            placeholderTextColor={
              isLight
                ? LGlobals.inputMessages.placeholderTextColor
                : DGlobals.inputMessages.placeholderTextColor
            }
            value={message}
            onChangeText={setMessage}
            style={{
              width: "80%",
              paddingRight: "5%",
              color: isLight ? LGlobals.text : DGlobals.text,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Ionicons
                name="image"
                size={20}
                color={
                  isLight
                    ? LGlobals.inputMessages.icon
                    : DGlobals.inputMessages.icon
                }
              />
            </TouchableOpacity>
            
            {/* <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Ionicons
                name="happy"
                size={20}
                color={
                  isLight
                    ? LGlobals.inputMessages.icon
                    : DGlobals.inputMessages.icon
                }
              />
            </TouchableOpacity>
             */}
            <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
              <Ionicons
                name={isRecording ? "stop-circle" : "mic"}
                size={20}
                color={
                  isRecording 
                    ? "#ff4444"
                    : isLight
                    ? LGlobals.inputMessages.icon
                    : DGlobals.inputMessages.icon
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 35,
            height: 35,
            borderRadius: 45,
            backgroundColor: isLight
              ? LGlobals.inputMessages.sendIconBackgroundColor
              : DGlobals.inputMessages.sendIconBackgroundColor,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onSend}
        >
          <Ionicons
            name="send"
            size={18}
            color={
              isLight
                ? LGlobals.inputMessages.icon
                : DGlobals.inputMessages.icon
            }
          />
        </TouchableOpacity>
      </View>

      {/* Recording Indicator */}
      {isRecording && (
        <View style={{
          position: 'absolute',
          bottom: 60,
          left: 20,
          right: 20,
          backgroundColor: isLight ? '#ffebee' : '#2d1b1b',
          borderRadius: 12,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#ff4444',
              marginRight: 8,
            }} />
            <Text style={{
              color: isLight ? '#d32f2f' : '#ffcdd2',
              fontWeight: '500',
            }}>
              Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
            </Text>
          </View>
          <TouchableOpacity onPress={stopRecording}>
            <Ionicons name="stop-circle" size={24} color="#ff4444" />
          </TouchableOpacity>
        </View>
      )}

      {/* Emoji Picker Modal */}
      <Modal
        visible={showEmojiPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEmojiPicker(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-end',
          }}
          activeOpacity={1}
          onPress={() => setShowEmojiPicker(false)}
        >
          <View style={{
            backgroundColor: isLight ? LGlobals.background : DGlobals.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: 300,
          }}>
            <View style={{
              width: 40,
              height: 4,
              backgroundColor: isLight ? '#ddd' : '#666',
              borderRadius: 2,
              alignSelf: 'center',
              marginBottom: 20,
            }} />
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}>
                {emojis.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 8,
                      margin: 4,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      addEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default InputMessage;

const styles = StyleSheet.create({});
