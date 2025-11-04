import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";
import { FontAwesome } from "@expo/vector-icons";

const MessageBubble = ({
  message,
  isUser,
  timestamp,
  onRegenerate,
  showActions,
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.aiBubble,
          {
            backgroundColor: isUser
              ? isLight
                ? LGlobals.buttonBackground
                : DGlobals.buttonBackground
              : isLight
              ? "rgba(143, 193, 211, 0.2)"
              : "rgba(29, 38, 42, 0.9)",
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              color: isUser ? "#fff" : isLight ? LGlobals.text : DGlobals.text,
            },
          ]}
        >
          {message}
        </Text>
        {showActions && onRegenerate && (
          <Pressable style={styles.actionButton} onPress={onRegenerate}>
            <FontAwesome name="rotate-left" size={14} color="#ccc" />

          </Pressable>
        )}
      </View>
      <Text
        style={[
          styles.timestamp,
          { color: isLight ? LGlobals.lighttext : DGlobals.lighttext },
        ]}
      >
        {new Date(timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  aiMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  actionButton: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: "flex-end",
  },
});

export default MessageBubble;
