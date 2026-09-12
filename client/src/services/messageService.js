import apiClient from './apiClient';

export const messageService = {
  getConversations: () => apiClient.get('/messages/conversations'),
  getConversationById: (id) => apiClient.get(`/messages/conversations/${id}`),
  sendMessage: (conversationId, message) => apiClient.post(`/messages/conversations/${conversationId}`, { message }),
  startConversation: (userId) => apiClient.post('/messages/conversations', { userId }),
  markAsRead: (conversationId) => apiClient.put(`/messages/conversations/${conversationId}/read`),
  deleteConversation: (id) => apiClient.delete(`/messages/conversations/${id}`),
  searchMessages: (query) => apiClient.get('/messages/search', { params: { q: query } })
};
