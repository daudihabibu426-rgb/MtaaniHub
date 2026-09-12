import apiClient from './apiClient';

export const notificationService = {
  getNotifications: () => apiClient.get('/notifications'),
  getUnreadNotifications: () => apiClient.get('/notifications/unread'),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.put('/notifications/read-all'),
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`),
  getNotificationPreferences: () => apiClient.get('/notifications/preferences'),
  updateNotificationPreferences: (preferences) => apiClient.put('/notifications/preferences', preferences)
};
