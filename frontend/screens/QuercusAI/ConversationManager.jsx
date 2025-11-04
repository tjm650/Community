import AsyncStorage from '@react-native-async-storage/async-storage';

export class ConversationManager {
  constructor() {
    this.CONVERSATIONS_KEY = '@quercus_conversations';
    this.CURRENT_CONVERSATION_KEY = '@quercus_current_conversation';
  }

  async saveConversation(conversationId, messages) {
    try {
      const conversations = await this.getAllConversations();
      conversations[conversationId] = {
        id: conversationId,
        messages,
        timestamp: new Date().toISOString(),
        title: this.generateConversationTitle(messages),
      };

      await AsyncStorage.setItem(
        this.CONVERSATIONS_KEY,
        JSON.stringify(conversations)
      );

      return { success: true };
    } catch (error) {
      console.error('Error saving conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async getConversation(conversationId) {
    try {
      const conversations = await this.getAllConversations();
      return conversations[conversationId] || null;
    } catch (error) {
      console.error('Error getting conversation:', error);
      return null;
    }
  }

  async getAllConversations() {
    try {
      const conversations = await AsyncStorage.getItem(this.CONVERSATIONS_KEY);
      return conversations ? JSON.parse(conversations) : {};
    } catch (error) {
      console.error('Error getting conversations:', error);
      return {};
    }
  }

  async deleteConversation(conversationId) {
    try {
      const conversations = await this.getAllConversations();
      delete conversations[conversationId];

      await AsyncStorage.setItem(
        this.CONVERSATIONS_KEY,
        JSON.stringify(conversations)
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async setCurrentConversation(conversationId) {
    try {
      await AsyncStorage.setItem(
        this.CURRENT_CONVERSATION_KEY,
        conversationId
      );
      return { success: true };
    } catch (error) {
      console.error('Error setting current conversation:', error);
      return { success: false, error: error.message };
    }
  }

  async getCurrentConversation() {
    try {
      const conversationId = await AsyncStorage.getItem(
        this.CURRENT_CONVERSATION_KEY
      );
      return conversationId;
    } catch (error) {
      console.error('Error getting current conversation:', error);
      return null;
    }
  }

  generateConversationTitle(messages) {
    if (!messages || messages.length === 0) return 'New Conversation';

    const firstUserMessage = messages.find(msg => msg.isUser);
    if (!firstUserMessage) return 'New Conversation';

    const text = firstUserMessage.text;
    if (text.length <= 30) return text;

    return text.substring(0, 30) + '...';
  }

  async getConversationList() {
    try {
      const conversations = await this.getAllConversations();
      return Object.values(conversations).sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );
    } catch (error) {
      console.error('Error getting conversation list:', error);
      return [];
    }
  }

  async clearAllConversations() {
    try {
      await AsyncStorage.multiRemove([
        this.CONVERSATIONS_KEY,
        this.CURRENT_CONVERSATION_KEY,
      ]);
      return { success: true };
    } catch (error) {
      console.error('Error clearing conversations:', error);
      return { success: false, error: error.message };
    }
  }

  async exportConversations() {
    try {
      const conversations = await this.getAllConversations();
      return {
        success: true,
        data: conversations,
        exportDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting conversations:', error);
      return { success: false, error: error.message };
    }
  }

  async importConversations(conversationsData) {
    try {
      await AsyncStorage.setItem(
        this.CONVERSATIONS_KEY,
        JSON.stringify(conversationsData)
      );
      return { success: true };
    } catch (error) {
      console.error('Error importing conversations:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export const conversationManager = new ConversationManager();