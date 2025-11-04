import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

// Import theme constants
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";
import useGlobal from "@/assets/core/useGlobal";

const InputMessage = ({
  onSend,
  onTyping,
  placeholder = "Type a message...",
  maxLength = 1000,
  disabled = false,
  showEmojiPicker = true,
  showVoiceRecording = true,
  showFileAttachment = true,
  showImagePicker = true,
  replyTo = null,
  onCancelReply,
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [recording, setRecording] = useState(null);
  
  const inputRef = useRef(null);
  const recordingTimer = useRef(null);
  const typingTimer = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Emoji data - memoized to prevent re-creation
  const emojis = useMemo(() => [
    '😀', '😂', '😍', '🥰', '😎', '🤔', '😢', '😡', '👍', '👎',
    '❤️', '💔', '🎉', '🎂', '🌹', '🍕', '☕', '🚀', '💯', '🔥',
    '😊', '😭', '😱', '🤗', '🤫', '🤐', '🤯', '😴', '🤤', '😵',
    '🥳', '😇', '🤠', '👻', '🤖', '👽', '👾', '🤡', '👹', '👺'
  ], []);

  // Memoized styles for better performance
  const containerStyle = useMemo(() => [
    styles.container,
    { backgroundColor: isLight ? LGlobals.surface : DGlobals.surface },
  ], [isLight]);

  const inputStyle = useMemo(() => [
    styles.input,
    { 
      backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      color: isLight ? LGlobals.onBackground : DGlobals.onBackground,
      borderColor: isLight ? LGlobals.outline : DGlobals.outline,
    },
  ], [isLight]);

  const buttonStyle = useMemo(() => [
    styles.button,
    { backgroundColor: isLight ? LGlobals.primary : DGlobals.primary },
  ], [isLight]);

  // Handle text input changes
  const handleTextChange = useCallback((text) => {
    setMessage(text);
    
    // Handle typing indicator
    if (onTyping) {
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        onTyping(false);
      }, 1000);
      onTyping(true);
    }
  }, [onTyping]);

  // Handle send message
  const handleSend = useCallback(() => {
    if (!message.trim() || disabled) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const messageData = {
      content: message.trim(),
      message_type: 'text',
      reply_to: replyTo,
      timestamp: new Date().toISOString(),
    };
    
    onSend(messageData);
    setMessage('');
    if (onTyping) onTyping(false);
    
    // Clear reply if exists
    if (replyTo && onCancelReply) {
      onCancelReply();
    }
  }, [message, disabled, replyTo, onSend, onTyping, onCancelReply]);

  // Handle emoji selection
  const handleEmojiSelect = useCallback((emoji) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMessage(prev => prev + emoji);
    setShowEmojiPanel(false);
    inputRef.current?.focus();
  }, []);

  // Handle voice recording
  const startRecording = useCallback(async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant microphone permission to record voice messages.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingTimer.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!recording) return;
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      clearInterval(recordingTimer.current);
      
      if (uri) {
        const messageData = {
          content: 'Voice message',
          message_type: 'audio',
          media_url: uri,
          duration: recordingTime,
          reply_to: replyTo,
          timestamp: new Date().toISOString(),
        };
        
        onSend(messageData);
      }
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }, [recording, recordingTime, replyTo, onSend]);

  // Handle image picker
  const handleImagePicker = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant photo library permission to select images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const messageData = {
          content: 'Image',
          message_type: 'image',
          media_url: result.assets[0].uri,
          reply_to: replyTo,
          timestamp: new Date().toISOString(),
        };
        
        onSend(messageData);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  }, [replyTo, onSend]);

  // Handle file picker
  const handleFilePicker = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      // expo-document-picker returns an object with a `type` field ('cancel' or 'success')
      // and file properties such as `uri`, `name`, and `size`.
      // Newer expo APIs sometimes mirror image-picker and include `assets`.
      if (result && result.type !== 'cancel') {
        const uri = result.uri ?? result.assets?.[0]?.uri;
        const name = result.name ?? result.assets?.[0]?.name ?? 'file';
        const size = result.size ?? result.assets?.[0]?.size ?? null;

        const messageData = {
          content: 'File',
          message_type: 'file',
          media_url: uri,
          fileName: name,
          fileSize: size,
          reply_to: replyTo,
          timestamp: new Date().toISOString(),
        };

        onSend(messageData);
      }
    } catch (error) {
      console.error('File picker error:', error);
      Alert.alert('Error', 'Failed to select file. Please try again.');
    }
  }, [replyTo, onSend]);

  // Format recording time
  const formatRecordingTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowEmojiPanel(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      clearTimeout(typingTimer.current);
      clearInterval(recordingTimer.current);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  // Render reply preview
  const renderReplyPreview = useCallback(() => {
    if (!replyTo) return null;
    
    return (
      <Animated.View 
        style={[
          styles.replyPreview,
          { backgroundColor: isLight ? LGlobals.background : DGlobals.background },
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.replyContent}>
          <Text style={[styles.replyText, { color: isLight ? LGlobals.onBackground : DGlobals.onBackground }]}>
            Replying to: {replyTo.sender?.first_name || 'You'}
          </Text>
          <Text style={[styles.replyMessage, { color: isLight ? LGlobals.onSurface : DGlobals.onSurface }]} numberOfLines={1}>
            {replyTo.content}
          </Text>
        </View>
        <TouchableOpacity onPress={onCancelReply} style={styles.cancelReply}>
          <Ionicons 
            name="close" 
            size={20} 
            color={isLight ? LGlobals.onSurface : DGlobals.onSurface} 
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }, [replyTo, isLight, slideAnim, onCancelReply]);

  // Render emoji panel
  const renderEmojiPanel = useCallback(() => {
    if (!showEmojiPanel) return null;
    
    return (
      <Animated.View 
        style={[
          styles.emojiPanel,
          { backgroundColor: isLight ? LGlobals.surface : DGlobals.surface },
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.emojiGrid}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emojiButton}
              onPress={() => handleEmojiSelect(emoji)}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  }, [showEmojiPanel, isLight, slideAnim, handleEmojiSelect, emojis]);

  return (
    <View style={containerStyle}>
      {renderReplyPreview()}
      
      <View style={styles.inputContainer}>
        {/* Attachment Button */}
        {showFileAttachment && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              Alert.alert(
                'Add Attachment',
                'Choose attachment type',
                [
                  { text: 'Image', onPress: handleImagePicker },
                  { text: 'File', onPress: handleFilePicker },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }}
            disabled={disabled}
          >
            <Ionicons 
              name="add-circle-outline" 
              size={24} 
              color={isLight ? LGlobals.onSurface : DGlobals.onSurface} 
            />
          </TouchableOpacity>
        )}
        
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={inputStyle}
          value={message}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={isLight ? LGlobals.onSurface : DGlobals.onSurface}
          multiline
          maxLength={maxLength}
          editable={!disabled}
          onFocus={() => setShowEmojiPanel(false)}
        />
        
        {/* Emoji Button */}
        {showEmojiPicker && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setShowEmojiPanel(!showEmojiPanel);
              if (!showEmojiPanel) {
                Keyboard.dismiss();
              }
            }}
            disabled={disabled}
          >
            <Ionicons 
              name="happy-outline" 
              size={24} 
              color={isLight ? LGlobals.onSurface : DGlobals.onSurface} 
            />
          </TouchableOpacity>
        )}
        
        {/* Voice Recording or Send Button */}
        {isRecording ? (
          <TouchableOpacity
            style={[buttonStyle, styles.recordingButton]}
            onPress={stopRecording}
          >
            <Ionicons name="stop" size={24} color="white" />
            <Text style={styles.recordingTime}>
              {formatRecordingTime(recordingTime)}
            </Text>
          </TouchableOpacity>
        ) : message.trim() ? (
          <TouchableOpacity
            style={buttonStyle}
            onPress={handleSend}
            disabled={disabled}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        ) : showVoiceRecording ? (
          <TouchableOpacity
            style={[buttonStyle, styles.voiceButton]}
            onPressIn={startRecording}
            onPressOut={stopRecording}
            disabled={disabled}
          >
            <Ionicons name="mic" size={20} color="white" />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {renderEmojiPanel()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  replyPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  replyContent: {
    flex: 1,
  },
  replyText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  replyMessage: {
    fontSize: 14,
    opacity: 0.8,
  },
  cancelReply: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 16,
    lineHeight: 20,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    backgroundColor: '#FF3B30',
  },
  recordingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    width: 'auto',
    minWidth: 80,
  },
  recordingTime: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiPanel: {
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    maxHeight: 200,
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emojiButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  emojiText: {
    fontSize: 20,
  },
});

export default InputMessage;
