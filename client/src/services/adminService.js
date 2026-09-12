import apiClient from './apiClient';

export const adminService = {
  getDashboardStats: () => apiClient.get('/admin/stats'),
  getUsers: (params) => apiClient.get('/admin/users', { params }),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  updateUser: (id, userData) => apiClient.put(`/admin/users/${id}`, userData),
  suspendUser: (id) => apiClient.post(`/admin/users/${id}/suspend`),
  unsuspendUser: (id) => apiClient.post(`/admin/users/${id}/unsuspend`),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
  getListings: (params) => apiClient.get('/admin/listings', { params }),
  approveListing: (id) => apiClient.post(`/admin/listings/${id}/approve`),
  rejectListing: (id, reason) => apiClient.post(`/admin/listings/${id}/reject`, { reason }),
  deleteListing: (id) => apiClient.delete(`/admin/listings/${id}`),
  getReports: (params) => apiClient.get('/admin/reports', { params }),
  handleReport: (id, action) => apiClient.post(`/admin/reports/${id}/handle`, { action }),
  getSiteSettings: () => apiClient.get('/admin/settings'),
  updateSiteSettings: (settings) => apiClient.put('/admin/settings', settings)
};
