import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  productId?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  productId?: string;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  activeConversation: null,
  messages: {},
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    setMessages: (state, action: PayloadAction<{ conversationId: string; messages: Message[] }>) => {
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
    addMessage: (state, action: PayloadAction<{ conversationId: string; message: Message }>) => {
      const { conversationId, message } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(message);

      // Update conversation last message and unread count
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        if (state.activeConversation !== conversationId) {
          conversation.unreadCount += 1;
        }
      }
    },
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(c => c.id === action.payload);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setActiveConversation,
  setMessages,
  addMessage,
  markConversationAsRead,
  setLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer; 