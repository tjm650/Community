import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Alert,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DGlobals } from '@/constants/DarkColor/DGlobals';
import { LGlobals } from '@/constants/LightColor/LGlobals';
import useGlobal from '@/assets/core/useGlobal';

import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import AISearchBar from './AISearchBar';
import AISuggestions from './AISuggestions';
import TypingIndicator from './TypingIndicator';
import MessageBubble from './MessageBubble';

const QuercusHome = () => {
  const navigation = useNavigation();
  const { theme } = useGlobal();
  const isLight = theme === 'light';

  // Get Quercus functionality from useGlobal store
  const globalStore = useGlobal();
  const {
    quercusGenerateResponse,
    quercusGenerateResponseEnhanced,
    quercusGetConversationHistory,
    quercusCreateConversation,
    quercusSendTypingIndicator,
    quercusClearError,
    initialized,
  } = globalStore;

  // Get Quercus data from global store
  const quercusData = globalStore.quercusAI || {};
  const aiLoading = quercusData.isLoading || false;
  const aiError = quercusData.error || null;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef(null);

  // Type definitions for better TypeScript support
  type Message = {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
    type: string;
  };

  // Get messages from global store
  useEffect(() => {
    if (quercusData.messages) {
      setMessages(quercusData.messages);
    }
  }, [quercusData.messages]);

  // Load conversation history on mount
  useEffect(() => {
    if (initialized && quercusGetConversationHistory) {
      quercusGetConversationHistory().catch(error => {
        console.warn('Failed to load conversation history:', error);
      });
    }
  }, [initialized, quercusGetConversationHistory]);

  // Auto-scroll when messages change
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, quercusData.typing]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || aiLoading || !initialized) return;

    // Check if Quercus functions are available
    if (!quercusGenerateResponse || !quercusGenerateResponseEnhanced) {
      console.error('Quercus functions not available');
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Quercus AI is not available right now. Please try again later.',
        isUser: false,
        timestamp: new Date().toISOString(),
        type: 'error_message',
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
      type: 'user_message',
    };

    // Add user message immediately to local state
    setMessages(prev => [...prev, userMessage]);
    const currentInputText = inputText;
    setInputText('');

    // Send typing indicator
    try {
      await quercusSendTypingIndicator(true);
    } catch (error) {
      console.warn('Failed to send typing indicator:', error);
    }

    try {
      // Try enhanced method first, fallback to original if it fails
      let result;
      try {
        result = await quercusGenerateResponseEnhanced(currentInputText, 'campus_assistant');
      } catch (enhancedError) {
        console.warn('Enhanced method failed, trying original method:', enhancedError);
        result = await quercusGenerateResponse(currentInputText, 'campus_assistant');
      }

      if (!result || !result.success) {
        throw new Error(result?.error || 'Failed to generate AI response');
      }
    } catch (error) {
      console.error('Error generating AI response:', error);

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        isUser: false,
        timestamp: new Date().toISOString(),
        type: 'error_message',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      try {
        await quercusSendTypingIndicator(false);
      } catch (error) {
        console.warn('Failed to stop typing indicator:', error);
      }
    }
  };

  const handleSuggestionPress = (suggestionText: string) => {
    setInputText(suggestionText);
  };

  const handleRegenerateResponse = (messageId: number) => {
    Alert.alert(
      "Regenerate Response",
      "This will create a new response for this message. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Regenerate", onPress: () => regenerateMessage(messageId) }
      ]
    );
  };

  const regenerateMessage = (messageId: number) => {
    // Implementation for regenerating AI response
    console.log('Regenerating message:', messageId);
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiLoading]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => scrollToBottom()
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[
      styles.container,
      {
        backgroundColor: isLight ? LGlobals.background : DGlobals.background,
      }
    ]}>
      {/* Header */}
      <View
        colors={isLight ? LGlobals.background : DGlobals.background}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Pressable
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              {/* <FontAwesome name="arrow-left" size={20} color="#fff" /> */}
            </Pressable>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Quercus</Text>
            </View>
          </View>
          <Pressable
            style={styles.headerButton}
            onPress={() => quercusCreateConversation('New Chat')}
          >
            <FontAwesome name="plus" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {!initialized ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.emptyText}>Initializing ...</Text>
            <Text style={styles.emptySubtext}>Please wait a moment</Text>
          </View>
        ) : messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome name="comments" size={48} color="#ccc" />
            <Text style={styles.emptySubtext}>Quercus life on-campus</Text>
          </View>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              onRegenerate={() => handleRegenerateResponse(message.id)}
              showActions={!message.isUser}
            />
          ))
        )}

        {/* Typing Indicator */}
        <TypingIndicator isVisible={quercusData.typing} />
      </ScrollView>

      {/* Error Display */}
      {aiError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{aiError}</Text>
          <Pressable style={styles.errorButton} onPress={quercusClearError}>
            <Text style={styles.errorButtonText}>Dismiss</Text>
          </Pressable>
        </View>
      )}

      {/* AI Suggestions */}
      {messages.length === 0 && !aiLoading && (
        <AISuggestions onSuggestionPress={handleSuggestionPress} />
      )}

      {/* Input Area */}
      <AISearchBar
        value={inputText}
        onChangeText={setInputText}
        onSubmit={handleSendMessage}
        isLoading={aiLoading}
        placeholder="Ask Quercus ..."
      />
    </SafeAreaView>
  );
};

export default QuercusHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical:"5%",
    // paddingHorizontal: "2%",
    paddingRight:20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  aiTimestamp: {
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  typingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  typingIndicator: {
    marginLeft: 4,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    flex: 1,
  },
  errorButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  suggestionsList: {
    paddingVertical: 4,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#6366f1',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
  },
});
