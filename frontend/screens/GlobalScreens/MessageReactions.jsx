import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { Portal } from 'react-native-paper';

// ========================== Colors ==========================================//
import useGlobal from "@/assets/core/useGlobal";
import { DGlobals } from "@/constants/DarkColor/DGlobals";
import { LGlobals } from "@/constants/LightColor/LGlobals";

const MessageReactions = ({ 
  reactions = [], 
  onReaction, 
  messageId, 
  showReactions = false,
  position = 'left' // 'left' for receiver, 'right' for sender
}) => {
  const { theme } = useGlobal();
  const isLight = theme === "light";
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const quickReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  const handleReaction = (emoji) => {
    onReaction && onReaction(messageId, emoji);
    setShowReactionPicker(false);
  };

  const getReactionCount = (emoji) => {
    const reaction = reactions.find(r => r.emoji === emoji);
    return reaction ? reaction.count : 0;
  };

  const isReactionActive = (emoji) => {
    return reactions.some(r => r.emoji === emoji);
  };

  return (
    <View style={[
      styles.container,
      position === 'right' && styles.containerRight
    ]}>
      {/* Display existing reactions */}
      {reactions.length > 0 && (
        <View style={[
          styles.reactionsContainer,
          position === 'right' && styles.reactionsContainerRight
        ]}>
          {reactions.map((reaction, index) => (
            <View key={index} style={[
              styles.reactionBubble,
              { backgroundColor: isLight ? '#f0f0f0' : '#2a2a2a' }
            ]}>
              <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
              <Text style={[
                styles.reactionCount,
                { color: isLight ? LGlobals.text : DGlobals.text }
              ]}>
                {reaction.count}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Quick reaction button */}
      <TouchableOpacity
        style={[
          styles.reactionButton,
          { backgroundColor: isLight ? '#f5f5f5' : '#333' }
        ]}
        onPress={() => setShowReactionPicker(true)}
      >
        <Ionicons 
          name="add-circle-outline" 
          size={16} 
          color={isLight ? LGlobals.text : DGlobals.text} 
        />
      </TouchableOpacity>

      {/* Reaction Picker Modal */}
      <Portal>
        <Modal
          visible={showReactionPicker}
          onDismiss={() => setShowReactionPicker(false)}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={[
              styles.reactionPicker,
              { backgroundColor: isLight ? LGlobals.background : DGlobals.background }
            ]}>
              <View style={styles.reactionPickerHeader}>
                <Text style={[
                  styles.reactionPickerTitle,
                  { color: isLight ? LGlobals.text : DGlobals.text }
                ]}>
                  React to message
                </Text>
              </View>
              
              <View style={styles.reactionGrid}>
                {quickReactions.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.reactionOption,
                      isReactionActive(emoji) && styles.activeReactionOption
                    ]}
                    onPress={() => handleReaction(emoji)}
                  >
                    <Text style={styles.reactionOptionEmoji}>{emoji}</Text>
                    {getReactionCount(emoji) > 0 && (
                      <Text style={styles.reactionOptionCount}>
                        {getReactionCount(emoji)}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.reactionPickerFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowReactionPicker(false)}
                >
                  <Text style={[
                    styles.cancelButtonText,
                    { color: isLight ? LGlobals.text : DGlobals.text }
                  ]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 8,
  },
  reactionsContainerRight: {
    marginRight: 0,
    marginLeft: 8,
  },
  reactionBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  reactionEmoji: {
    fontSize: 12,
    marginRight: 2,
  },
  reactionCount: {
    fontSize: 10,
    fontWeight: '500',
  },
  reactionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionPicker: {
    borderRadius: 16,
    padding: 20,
    width: 280,
    maxWidth: '90%',
  },
  reactionPickerHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  reactionPickerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  reactionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  reactionOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    backgroundColor: '#f0f0f0',
  },
  activeReactionOption: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  reactionOptionEmoji: {
    fontSize: 20,
  },
  reactionOptionCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ff4444',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    textAlign: 'center',
  },
  reactionPickerFooter: {
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MessageReactions;
