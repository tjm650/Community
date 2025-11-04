// Quercus AI Response Handlers - Following useGlobal.js patterns
// These handlers are imported into useGlobal store

// AI Response Handler
export const responseQuercusAI = (set, get, data) => {
  if (data.error) {
    console.error('Quercus AI response error:', data.error);
    set((state) => ({
      quercusAI: {
        ...state.quercusAI,
        error: data.error,
        isLoading: false
      }
    }));
    return;
  }

  // Add AI response to messages
  const newMessage = {
    id: Date.now(),
    text: data.response,
    isUser: false,
    timestamp: data.timestamp || new Date().toISOString(),
    type: 'ai_response',
    conversation_id: data.conversation_id,
    message_id: data.message_id,
  };

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      messages: [...(state.quercusAI.messages || []), newMessage],
      currentConversation: data.conversation_id || state.quercusAI.currentConversation,
      isLoading: false,
      typing: false,
    }
  }));
};

// Conversation History Handler
export const responseQuercusConversationHistory = (set, get, data) => {
  if (data.error) {
    console.error('Conversation history error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      conversations: data.conversations || [],
      messages: data.messages || [],
      isLoading: false,
    }
  }));
};

// Conversation List Handler
export const responseQuercusConversationList = (set, get, data) => {
  if (data.error) {
    console.error('Conversation list error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      conversations: data.conversations || [],
      isLoading: false,
    }
  }));
};

// Conversation Created Handler
export const responseQuercusConversationCreated = (set, get, data) => {
  if (data.error) {
    console.error('Conversation creation error:', data.error);
    return;
  }

  // Add new conversation to the list
  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      conversations: [data, ...(state.quercusAI.conversations || [])],
      currentConversation: data.conversation_id,
      isLoading: false,
    }
  }));
};

// Campus Info Handler
export const responseQuercusCampusInfo = (set, get, data) => {
  if (data.error) {
    console.error('Campus info error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      campusInfo: {
        ...state.quercusAI.campusInfo,
        [data.type]: data,
      },
      isLoading: false,
    }
  }));
};

// Study Plan Handler
export const responseQuercusStudyPlan = (set, get, data) => {
  if (data.error) {
    console.error('Study plan error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      studyPlan: data,
      isLoading: false,
    }
  }));
};

// Career Guidance Handler
export const responseQuercusCareerGuidance = (set, get, data) => {
  if (data.error) {
    console.error('Career guidance error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      careerGuidance: data,
      isLoading: false,
    }
  }));
};

// Settings Updated Handler
export const responseQuercusSettingsUpdated = (set, get, data) => {
  if (data.error) {
    console.error('Settings update error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      aiSettings: { ...state.quercusAI.aiSettings, ...data },
      isLoading: false,
    }
  }));
};

// Typing Indicator Handler
export const responseQuercusTyping = (set, get, data) => {
  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      typing: data.is_typing || false,
    }
  }));
};

// Error Handler
export const responseQuercusError = (set, get, data) => {
  console.error('Quercus error:', data.error);
  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      error: data.error,
      isLoading: false, 
      typing: false,
    }
  }));
};

// Image Analysis Handler
export const responseQuercusImageAnalysis = (set, get, data) => {
  if (data.error) {
    console.error('Image analysis error:', data.error);
    set((state) => ({
      quercusAI: {
        ...state.quercusAI,
        error: data.error,
        isLoading: false
      }
    })); 
    return;
  }

  // Add image analysis response to messages
  const newMessage = {
    id: Date.now(),
    text: data.response,
    isUser: false,
    timestamp: data.timestamp || new Date().toISOString(),
    type: 'image_analysis_response',
    conversation_id: data.conversation_id,
    message_id: data.message_id,
    metadata: data.metadata
  };

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      messages: [...(state.quercusAI.messages || []), newMessage],
      currentConversation: data.conversation_id || state.quercusAI.currentConversation,
      isLoading: false,
      typing: false,
    }
  }));
};

// Document Analysis Handler
export const responseQuercusDocumentAnalysis = (set, get, data) => {
  if (data.error) {
    console.error('Document analysis error:', data.error);
    set((state) => ({
      quercusAI: {
        ...state.quercusAI,
        error: data.error,
        isLoading: false
      }
    }));
    return;
  }

  // Add document analysis response to messages
  const newMessage = {
    id: Date.now(),
    text: data.response,
    isUser: false,
    timestamp: data.timestamp || new Date().toISOString(),
    type: 'document_analysis_response',
    conversation_id: data.conversation_id,
    message_id: data.message_id,
    metadata: data.metadata
  };

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      messages: [...(state.quercusAI.messages || []), newMessage],
      currentConversation: data.conversation_id || state.quercusAI.currentConversation,
      isLoading: false,
      typing: false,
    }
  }));
};

// Conversation Summary Handler
export const responseQuercusConversationSummary = (set, get, data) => {
  if (data.error) {
    console.error('Conversation summary error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      conversationSummary: data.summary,
      isLoading: false,
    }
  }));
};

// Conversation Insights Handler
export const responseQuercusConversationInsights = (set, get, data) => {
  if (data.error) {
    console.error('Conversation insights error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      conversationInsights: data.insights,
      isLoading: false,
    }
  }));
};

// Analytics Handler
export const responseQuercusAnalytics = (set, get, data) => {
  if (data.error) {
    console.error('Analytics error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      analytics: data.analytics,
      isLoading: false,
    }
  }));
};

// Suggestions Handler
export const responseQuercusSuggestions = (set, get, data) => {
  if (data.error) {
    console.error('Suggestions error:', data.error);
    return;
  }

  set((state) => ({
    quercusAI: {
      ...state.quercusAI,
      suggestions: data.suggestions || [],
      isLoading: false,
    }
  }));
};

// Quercus AI response handlers for WebSocket messages
export const QuercusResponseHandlers = {
  // Handle AI response
  "quercus.ai.response": (set, get, data) => {
    if (data.error) {
      console.error('Quercus AI response error:', data.error);
      return;
    }

    // Add AI response to current conversation
    const currentMessages = get().messages || [];
    const newMessage = {
      id: Date.now(),
      text: data.response,
      isUser: false,
      timestamp: new Date().toISOString(),
      type: 'ai_response',
    };

    set({
      messages: [...currentMessages, newMessage],
    });
  },

  // Handle conversation history
  "quercus.conversation.history": (set, get, data) => {
    if (data.error) {
      console.error('Conversation history error:', data.error);
      return;
    }

    set({
      conversationHistory: data.conversations || [],
      currentConversation: data.current_conversation,
    });
  },

  // Handle AI suggestions
  "quercus.ai.suggestions": (set, get, data) => {
    if (data.error) {
      console.error('AI suggestions error:', data.error);
      return;
    }

    set({
      aiSuggestions: data.suggestions || [],
    });
  },

  // Handle campus information
  "quercus.campus.info": (set, get, data) => {
    if (data.error) {
      console.error('Campus info error:', data.error);
      return;
    }

    set({
      campusInfo: {
        ...get().campusInfo,
        [data.type]: data.info,
      },
    });
  },

  // Handle study plan
  "quercus.study.plan": (set, get, data) => {
    if (data.error) {
      console.error('Study plan error:', data.error);
      return;
    }

    set({
      studyPlan: data.plan,
    });
  },

  // Handle career guidance
  "quercus.career.guidance": (set, get, data) => {
    if (data.error) {
      console.error('Career guidance error:', data.error);
      return;
    }

    set({
      careerGuidance: data.guidance,
    });
  },
}; 

// Default campus AI prompts
export const campusAIPrompts = [
  {
    id: 1,
    title: "Study Help",
    prompt: "Help me understand calculus concepts",
    icon: "book",
    category: "academic"
  },
  {
    id: 2,
    title: "Schedule Planning",
    prompt: "Create a study schedule for exams",
    icon: "calendar",
    category: "productivity"
  },
  {
    id: 3,
    title: "Assignment Help",
    prompt: "Explain this programming problem",
    icon: "code",
    category: "academic"
  },
  {
    id: 4,
    title: "Campus Info",
    prompt: "Find study spots on campus",
    icon: "map-marker",
    category: "campus"
  },
  {
    id: 5,
    title: "Group Study",
    prompt: "Find study partners for mathematics",
    icon: "users",
    category: "social"
  },
  {
    id: 6,
    title: "Time Management",
    prompt: "Help me manage my study time better",
    icon: "clock-o",
    category: "productivity"
  },
  {
    id: 7,
    title: "Research Help",
    prompt: "Explain this research methodology",
    icon: "search",
    category: "academic"
  },
  {
    id: 8,
    title: "Career Guidance",
    prompt: "What career paths suit computer science?",
    icon: "briefcase",
    category: "career"
  },
];

// AI response templates
export const aiResponseTemplates = {
  greeting: "Hello! I'm Quercus, your intelligent campus companion powered by Gemini AI. I can help you with studying, scheduling, research, campus information, and much more. What would you like to know?",

  studyHelp: "I can assist you with:\n• Understanding complex concepts\n• Study techniques and methods\n• Assignment help\n• Exam preparation\n• Research guidance",

  scheduling: "For schedule planning, I can help with:\n• Creating study timetables\n• Balancing academic and personal life\n• Time management strategies\n• Semester planning\n• Event coordination",

  campusLife: "For campus life, I can provide:\n• Event information\n• Club and organization details\n• Resource locations\n• Dining options\n• Transportation guidance",

  career: "For career guidance, I can help with:\n• Major selection advice\n• Internship opportunities\n• Resume and interview tips\n• Job search strategies\n• Industry insights",
};

// Export all Quercus utilities and handlers
export default {
  responseQuercusAI,
  responseQuercusConversationHistory,
  responseQuercusConversationList,
  responseQuercusConversationCreated,
  responseQuercusCampusInfo,
  responseQuercusStudyPlan,
  responseQuercusCareerGuidance,
  responseQuercusSettingsUpdated,
  responseQuercusTyping,
  responseQuercusError,
  responseQuercusImageAnalysis,
  responseQuercusDocumentAnalysis,
  responseQuercusConversationSummary,
  responseQuercusConversationInsights,
  responseQuercusAnalytics,
  responseQuercusSuggestions,
  QuercusResponseHandlers,
  campusAIPrompts,
  aiResponseTemplates,
};