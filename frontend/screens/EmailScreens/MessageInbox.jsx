import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ========================== Colors ==========================================//
// ============= Dark ============================//
import { DGlobals } from "@/constants/DarkColor/DGlobals";

// ============= Light ============================//
import { LGlobals } from "@/constants/LightColor/LGlobals";

//======================================================================================

import useGlobal from "@/assets/core/useGlobal";
import utils from "@/assets/core/utils";
import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";
import InputMessage from "../GlobalScreens/InputMessage";
import MainHeader from "../GlobalScreens/MainHeader";
import MessageView from "../GlobalScreens/MessageView";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CheckClientType from "../GlobalScreens/CheckClientType";

const { width: screenWidth } = Dimensions.get("window");

/////////////////////////////////////////////// Enhanced MessageBubble ///////////////////////////////////////////
function MessageBubble({ message, onReaction, onReply, onLongPress }) {
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(message.reactions || []);

  const handleReaction = (emoji) => {
    const newReactions = [...reactions];
    const existingIndex = newReactions.findIndex((r) => r.emoji === emoji);

    if (existingIndex >= 0) {
      newReactions.splice(existingIndex, 1);
    } else {
      newReactions.push({ emoji, count: 1 });
    }

    setReactions(newReactions);
    onReaction && onReaction(message.id, emoji);
  };

  const handleMessageLongPress = () => {
    onLongPress && onLongPress(message);
  };

  return message.is_me ? (
    <View style={styles.messageContainer}>
      <MessageView
        onLongPress={handleMessageLongPress}
        receiver={false}
        item={message}
        image={message.image}
        text={message.description}
        time={utils.formatTime(message.created)}
        reactions={reactions}
        showReactions={showReactions}
        onReaction={handleReaction}
        onReply={onReply}
      />
    </View>
  ) : (
    <View style={styles.messageContainer}>
      <MessageView
        onLongPress={handleMessageLongPress}
        item={message}
        image={message.image}
        receiver={true}
        text={message.description}
        time={utils.formatTime(message.created)}
        reactions={reactions}
        showReactions={showReactions}
        onReaction={handleReaction}
        onReply={onReply}
      />
    </View>
  );
}

/////////////////////////////////////////////// Typing Indicator ///////////////////////////////////////////
function TypingIndicator({ isTyping, username }) {
  const { theme } = useGlobal();
  const isLight = theme === "light";

  if (!isTyping) return null;

  return (
    <View
      style={[
        styles.typingContainer,
        {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        },
      ]}
    >
      <View
        style={[
          styles.typingBubble,
          { backgroundColor: isLight ? "#f0f0f0" : "#2a2a2a" },
        ]}
      >
        <View style={styles.typingDots}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.typingDot,
                { backgroundColor: isLight ? "#666" : "#999" },
              ]}
            />
          ))}
        </View>
        <Text
          style={[
            styles.typingText,
            { color: isLight ? LGlobals.text : DGlobals.text },
          ]}
        >
          {username} is typing...
        </Text>
      </View>
    </View>
  );
}

/////////////////////////////////////////////// Enhanced MessageInbox ///////////////////////////////////////////
const MesssageInbox = ({ route }) => {
  const navigation = useNavigation();
  const connect = route.params.connect;
  const sender = route.params.sender;
  const connectionId = route.params.id;
  const updated = route.params.updated;

  // State management
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [tagedMessage, setTagedMessage] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Refs
  const flatListRef = useRef(null);
  const typingAnimationRef = useRef(new Animated.Value(0)).current;

  const { theme } = useGlobal();
  let isLight = theme === "light";

  // Global state
  const user = useGlobal((state) => state.user);
  const messagesNext = useGlobal((state) => state.messagesNext);
  const messagesList = useGlobal((state) => state.messagesList);
  const messageSend = useGlobal((state) => state.messageSend);
  const messageList = useGlobal((state) => state.messageList);
  const messageType = useGlobal((state) => state.messageType);
  const MessagesTyping = useGlobal((state) => state.MessagesTyping);
  const messageRed = useGlobal((state) => state.messageRed);

  const isReceiver = true;
  const isReceiving = () => {
    if (sender !== user.id) {
      return isReceiver;
    }
  };

  // Enhanced image picker with better error handling
  async function pickImage() {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to select images.",
          [{ text: "OK" }]
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setImage(file.uri);
        setImage1(file);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  }

  // Enhanced message sending with validation
  function onSend() {
    if (!message.trim() && !image) {
      return;
    }

    const cleaned = message.replace(/\s+/g, " ").trim();
    const details = {
      connectionId: connectionId,
      image: image ? image1 : null,
      message: cleaned || ".",
      timestamp: new Date().toISOString(),
    };

    messageSend(details);
    setMessage("");
    setImage(null);
    setImage1(null);
    setTagedMessage([]);
    setShowSelected(false);
  }

  // Enhanced typing with debouncing
  function onType(value) {
    setMessage(value);

    if (!isTyping) {
      setIsTyping(true);
      messageType(connect.username);
    }

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 2000);

    setTypingTimeout(timeout);
  }

  // Message reactions
  const handleReaction = useCallback((messageId, emoji) => {
    // Handle reaction logic here
    console.log(`Reaction ${emoji} added to message ${messageId}`);
  }, []);

  // Message reply
  const handleReply = useCallback((message) => {
    setTagedMessage(message);
    setShowSelected(true);
  }, []);

  // Message long press for options
  const handleMessageLongPress = useCallback((message) => {
    setSelectedMessage(message);
    setShowMessageOptions(true);
  }, []);

  // Message options actions
  const handleMessageAction = (action) => {
    if (!selectedMessage) return;

    switch (action) {
      case "reply":
        handleReply(selectedMessage);
        break;
      case "copy":
        // Copy message text to clipboard
        break;
      case "share":
        Share.share({
          message: selectedMessage.description || "Shared message",
        });
        break;
      case "delete":
        Alert.alert(
          "Delete Message",
          "Are you sure you want to delete this message?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                // Handle delete logic
                console.log("Delete message:", selectedMessage.id);
              },
            },
          ]
        );
        break;
    }
    setShowMessageOptions(false);
    setSelectedMessage(null);
  };

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    messageList(connectionId);
    setTimeout(() => setRefreshing(false), 1000);
  }, [connectionId]);

  // Update header with enhanced design
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
        messageInbox={true}
          getView={
            <View style={styles.headerAvatarContainer}>
              <CheckClientType
                DirectoryView={
                  <View
                    style={{
                      // width: "100%",
                      gap:15,
                      alignItems: "center",
                      flexDirection: "row",
                      paddingHorizontal: "3%",
                    }}
                  >
                    <View
                      style={[
                        styles.headerAvatar,
                        {
                          backgroundColor: isLight ? "#e0e0e0" : "#5a5a5b",
                          borderColor: isLight ? "#d0d0d0" : "#d0d0d0",
                        },
                      ]}
                    >
                      {connect.profile_image ? (
                        <Image
                          style={styles.headerAvatarImage}
                          source={utils.GetImage(connect.profile_image)}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon=" fa-solid fa-user"
                          size={30}
                          color={DGlobals.icon}
                          style={{
                            marginTop: "25%",
                          }}
                        />
                      )}
                    </View>

                    <View style={styles.headerContent}>
                      <Text
                        style={[
                          styles.headerTitle,
                          { color: isLight ? LGlobals.text : DGlobals.text },
                        ]}
                      >
                        {connect.name}
                      </Text>
                     
                    </View>
                  </View>
                }
                directoryStatus={connect.directory_status1}
                verified={connect.verified}
              />
            </View>
          }
          // header={
          //   <View style={styles.headerContent}>
          //     <Text
          //       style={[
          //         styles.headerTitle,
          //         { color: isLight ? LGlobals.text : DGlobals.text },
          //       ]}
          //     >
          //       {connect.name}
          //     </Text>
          //     <Text style={[styles.headerSubtitle, { color: isLight ? LGlobals.lighttext : DGlobals.lighttext }]}>
          //       {connect.username}
          //     </Text>
          //   </View>
          // }
        />
      ),
    });
  }, [MessagesTyping, connect, isLight]);

  useEffect(() => {
    isReceiving() && messageRed(connectionId);
    messageList(connectionId);
  }, []);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isLight ? LGlobals.background : DGlobals.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={styles.flatListContent}
            onEndReached={() => {
              if (messagesNext) {
                messageList(connectionId, messagesNext);
                setLoading(true);
              }
            }}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[isLight ? LGlobals.bluetext : DGlobals.bluetext]}
                tintColor={isLight ? LGlobals.bluetext : DGlobals.bluetext}
              />
            }
            ListFooterComponent={
              loading ? (
                <ActivityIndicator
                  size="small"
                  style={styles.loadingIndicator}
                  color={isLight ? LGlobals.bluetext : DGlobals.bluetext}
                />
              ) : null
            }
            data={messagesList}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <MessageBubble
                message={item}
                onReaction={handleReaction}
                onReply={handleReply}
                onLongPress={handleMessageLongPress}
              />
            )}
            showsVerticalScrollIndicator={false}
          />

          {/* Typing Indicator */}
          {/* <TypingIndicator isTyping={isTyping} username={connect.name} /> */}
        </View>

        {/* Enhanced Input Message */}
        {Platform.OS === "ios" ? (
          <InputAccessoryView>
            <InputMessage
              message={message}
              setMessage={onType}
              onSend={onSend}
              image={image}
              pickImage={pickImage}
              showSelected={showSelected}
              tagedMessage={tagedMessage}
              setImage={setImage}
              setImage1={setImage1}
              onPressImage={onSend}
            />
          </InputAccessoryView>
        ) : (
          <InputMessage
            message={message}
            setMessage={onType}
            onSend={onSend}
            image={image}
            pickImage={pickImage}
            showSelected={showSelected}
            tagedMessage={tagedMessage}
            setImage={setImage}
            setImage1={setImage1}
            onPressImage={onSend}
          />
        )}
      </KeyboardAvoidingView>

      {/* Message Options Modal */}
      <Portal>
        <Modal
          visible={showMessageOptions}
          onDismiss={() => setShowMessageOptions(false)}
          contentContainerStyle={[
            styles.modalContainer,
            {
              backgroundColor: isLight
                ? LGlobals.background
                : DGlobals.background,
            },
          ]}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMessageAction("reply")}
            >
              <Ionicons
                name="arrow-undo"
                size={24}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
              <Text
                style={[
                  styles.modalOptionText,
                  { color: isLight ? LGlobals.text : DGlobals.text },
                ]}
              >
                Reply
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMessageAction("copy")}
            >
              <Ionicons
                name="copy"
                size={24}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
              <Text
                style={[
                  styles.modalOptionText,
                  { color: isLight ? LGlobals.text : DGlobals.text },
                ]}
              >
                Copy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleMessageAction("share")}
            >
              <Ionicons
                name="share"
                size={24}
                color={isLight ? LGlobals.text : DGlobals.text}
              />
              <Text
                style={[
                  styles.modalOptionText,
                  { color: isLight ? LGlobals.text : DGlobals.text },
                ]}
              >
                Share
              </Text>
            </TouchableOpacity>

            {selectedMessage?.is_me && (
              <TouchableOpacity
                style={[styles.modalOption, styles.deleteOption]}
                onPress={() => handleMessageAction("delete")}
              >
                <Ionicons name="trash" size={24} color="#ff4444" />
                <Text style={[styles.modalOptionText, { color: "#ff4444" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default MesssageInbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 60 : 0,
  },
  flatListContent: {
    paddingTop: "3%",
    paddingBottom: "5%",
  },
  // loadingIndicator: {
  //   marginVertical: 10,
  // },
  messageContainer: {
    marginVertical: 2,
  },
  headerAvatarContainer: {
    marginRight: 10,
    // marginTop: "10%",
  },
  headerAvatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerAvatarImage: {
    height: 35,
    width: 35,
    resizeMode: "cover",
  },
  headerAvatarText: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  headerStatus: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  headerStatusText: {
    fontSize: 12,
    fontWeight: "400",
  },
  headerContent: {
    // flex: 1,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "400",
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  typingText: {
    fontSize: 12,
    fontWeight: "400",
  },
  modalContainer: {
    margin: 20,
    borderRadius: 12,
    padding: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    padding: 16,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  modalOptionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  deleteOption: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginTop: 8,
    paddingTop: 16,
  },
});
