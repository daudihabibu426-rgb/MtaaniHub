import apiClient from './apiClient';

export const userService = {
  getUserById: (id) => apiClient.get(`/users/${id}`),
  getUserProfile: () => apiClient.get('/users/profile'),
  updateUserProfile: (userData) => apiClient.put('/users/profile', userData),
  getSellerInfo: (id) => apiClient.get(`/users/${id}/seller-info`),
  getSellerListings: (id) => apiClient.get(`/users/${id}/listings`),
  getSellerReviews: (id) => apiClient.get(`/users/${id}/reviews`),
  followSeller: (id) => apiClient.post(`/users/${id}/follow`),
  unfollowSeller: (id) => apiClient.delete(`/users/${id}/follow`),
  getFollowing: () => apiClient.get('/users/following'),
  getFollowers: () => apiClient.get('/users/followers'),
  uploadProfilePhoto: (formData) => apiClient.post('/users/profile-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadCoverPhoto: (formData) => apiClient.post('/users/cover-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};
