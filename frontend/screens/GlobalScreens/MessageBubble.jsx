import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  Share,
  Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faVideo, faMusic, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';

// Import theme constants
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/common/core/useGlobal";

const { width } = Dimensions.get('window');

const MessageBubble = ({
  message,
  isOwnMessage = false,
  onReaction,
  onReply,
  onLongPress,
  showStatus = true,
  showReactions = true,
  maxWidth = width * 0.75,
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const reactionAnim = useRef(new Animated.Value(0)).current;

  // Memoized styles for better performance
  const containerStyle = useMemo(() => [
    styles.container,
    isOwnMessage ? styles.ownMessage : styles.otherMessage,
  ], [isOwnMessage]);

  const bubbleStyle = useMemo(() => [
    styles.bubble,
    isOwnMessage 
      ? [styles.ownBubble, { backgroundColor: isLight ? LGlobals.primary : DGlobals.primary }]
      : [styles.otherBubble, { backgroundColor: isLight ? LGlobals.surface : DGlobals.surface }],
    { maxWidth },
  ], [isOwnMessage, isLight, maxWidth]);

  const textStyle = useMemo(() => [
    styles.messageText,
    { color: isOwnMessage 
      ? (isLight ? LGlobals.onPrimary : DGlobals.onPrimary)
      : (isLight ? LGlobals.onSurface : DGlobals.onSurface)
    },
  ], [isOwnMessage, isLight]);

  // Handle press animations
  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Handle long press for message options
  const handleLongPress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (onLongPress) {
      onLongPress(message);
    } else {
      showMessageOptions();
    }
  }, [message, onLongPress, showMessageOptions]);

  // Show message options modal
  const showMessageOptions = useCallback(() => {
    Alert.alert(
      'Message Options',
      'What would you like to do?',
      [
        {
          text: 'Reply',
          onPress: () => onReply && onReply(message),
        },
        {
          text: 'Copy',
          onPress: () => {
            Clipboard.setString(message.content);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
        {
          text: 'Share',
          onPress: () => {
            Share.share({
              message: message.content,
              title: 'Shared Message',
            });
          },
        },
        {
          text: 'React',
          onPress: () => setShowReactionPicker(true),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  }, [message, onReply]);

  // Handle reaction selection
  const handleReaction = useCallback((reaction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (onReaction) {
      onReaction(message.id, reaction);
    }
    
    setShowReactionPicker(false);
    
    // Animate reaction
    Animated.sequence([
      Animated.timing(reactionAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(reactionAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [message.id, onReaction, reactionAnim]);

  // Get message status icon
  const getStatusIcon = useCallback(() => {
    if (!showStatus || !isOwnMessage) return null;
    
    const status = message.status || 'sent';
    const iconName = {
      sending: 'time-outline',
      sent: 'checkmark-outline',
      delivered: 'checkmark-done-outline',
      read: 'checkmark-done',
      failed: 'close-circle-outline',
    }[status];
    
    const iconColor = {
      sending: isLight ? LGlobals.onSurface : DGlobals.onSurface,
      sent: isLight ? LGlobals.onSurface : DGlobals.onSurface,
      delivered: isLight ? LGlobals.primary : DGlobals.primary,
      read: isLight ? LGlobals.primary : DGlobals.primary,
      failed: isLight ? LGlobals.error : DGlobals.error,
    }[status];
    
    return (
      <Ionicons 
        name={iconName} 
        size={16} 
        color={iconColor} 
        style={styles.statusIcon}
      />
    );
  }, [message.status, showStatus, isOwnMessage, isLight]);

  // Format message time
  const formatTime = useCallback((timestamp) => {
    try {
      const date = new Date(timestamp);
      return format(date, 'HH:mm');
    } catch (_error) {
      return '';
    }
  }, []);

  // Render message content based on type
  const renderMessageContent = useCallback(() => {
    switch (message.message_type) {
      case 'image':
        return (
          <View style={styles.imageContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCamera} size={16} color={isOwnMessage ? (isLight ? LGlobals.onPrimary : DGlobals.onPrimary) : (isLight ? LGlobals.onSurface : DGlobals.onSurface)} />
              <Text style={textStyle}> Image</Text>
            </View>
            {message.caption && (
              <Text style={[textStyle, styles.caption]}>{message.caption}</Text>
            )}
          </View>
        );
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faVideo} size={16} color={isOwnMessage ? (isLight ? LGlobals.onPrimary : DGlobals.onPrimary) : (isLight ? LGlobals.onSurface : DGlobals.onSurface)} />
              <Text style={textStyle}> Video</Text>
            </View>
            {message.caption && (
              <Text style={[textStyle, styles.caption]}>{message.caption}</Text>
            )}
          </View>
        );
      case 'audio':
        return (
          <View style={styles.audioContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faMusic} size={16} color={isOwnMessage ? (isLight ? LGlobals.onPrimary : DGlobals.onPrimary) : (isLight ? LGlobals.onSurface : DGlobals.onSurface)} />
              <Text style={textStyle}> Audio Message</Text>
            </View>
          </View>
        );
      case 'file':
        return (
          <View style={styles.fileContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faPaperclip} size={16} color={isOwnMessage ? (isLight ? LGlobals.onPrimary : DGlobals.onPrimary) : (isLight ? LGlobals.onSurface : DGlobals.onSurface)} />
              <Text style={textStyle}> File</Text>
            </View>
            <Text style={[textStyle, styles.fileName]}>{message.fileName}</Text>
          </View>
        );
      default:
        return (
          <Text style={textStyle} selectable>
            {message.content}
          </Text>
        );
    }
  }, [message, textStyle]);

  // Render reply to message
  const renderReply = useCallback(() => {
    if (!message.reply_to) return null;
    
    return (
      <View style={styles.replyContainer}>
        <View style={styles.replyLine} />
        <View style={styles.replyContent}>
          <Text style={styles.replySender} numberOfLines={1}>
            {message.reply_to.sender?.first_name || 'You'}
          </Text>
          <Text style={styles.replyText} numberOfLines={2}>
            {message.reply_to.content}
          </Text>
        </View>
      </View>
    );
  }, [message.reply_to]);

  // Render reactions
  const renderReactions = useCallback(() => {
    if (!showReactions || !message.reactions || Object.keys(message.reactions).length === 0) {
      return null;
    }
    
    return (
      <View style={[
        styles.reactionsContainer,
        isOwnMessage ? styles.ownReactions : styles.otherReactions
      ]}>
        {Object.entries(message.reactions).map(([reaction, count]) => (
          <View key={reaction} style={styles.reactionItem}>
            <Text style={styles.reactionEmoji}>{reaction}</Text>
            <Text style={styles.reactionCount}>{count}</Text>
          </View>
        ))}
      </View>
    );
  }, [message.reactions, showReactions, isOwnMessage]);

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[
          bubbleStyle,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={handleLongPress}
          style={styles.touchable}
        >
          {renderReply()}
          {renderMessageContent()}
          
          <View style={styles.messageFooter}>
            <Text style={styles.timeText}>
              {formatTime(message.created_at)}
            </Text>
            {getStatusIcon()}
          </View>
        </TouchableOpacity>
        
        {renderReactions()}
      </Animated.View>
      
      {/* Reaction Picker Modal */}
      {showReactionPicker && (
        <View style={styles.reactionPickerOverlay}>
          <View style={styles.reactionPicker}>
            {['👍', '❤️', '😂', '😮', '😢', '😡'].map((reaction) => (
              <TouchableOpacity
                key={reaction}
                style={styles.reactionButton}
                onPress={() => handleReaction(reaction)}
              >
                <Text style={styles.reactionPickerEmoji}>{reaction}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ownBubble: {
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    borderBottomLeftRadius: 4,
  },
  touchable: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  imageContainer: {
    alignItems: 'center',
  },
  videoContainer: {
    alignItems: 'center',
  },
  audioContainer: {
    alignItems: 'center',
  },
  fileContainer: {
    alignItems: 'center',
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
  },
  fileName: {
    marginTop: 4,
    fontSize: 12,
  },
  replyContainer: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    flexDirection: 'row',
  },
  replyLine: {
    width: 2,
    backgroundColor: '#007AFF',
    marginRight: 8,
  },
  replyContent: {
    flex: 1,
  },
  replySender: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  replyText: {
    fontSize: 12,
    opacity: 0.8,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timeText: {
    fontSize: 11,
    opacity: 0.7,
    marginRight: 4,
  },
  statusIcon: {
    marginLeft: 2,
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ownReactions: {
    alignSelf: 'flex-end',
  },
  otherReactions: {
    alignSelf: 'flex-start',
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  reactionEmoji: {
    fontSize: 16,
    marginRight: 2,
  },
  reactionCount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  reactionPickerOverlay: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  reactionPicker: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reactionButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  reactionPickerEmoji: {
    fontSize: 24,
  },
});

export default MessageBubble;
