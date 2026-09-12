import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me')
};

export const listingService = {
  getAll: (params) => api.get('/listings', { params }),
  getById: (id) => api.get(`/listings/${id}`),
  create: (data) => api.post('/listings', data),
  update: (id, data) => api.put(`/listings/${id}`, data),
  delete: (id) => api.delete(`/listings/${id}`),
  searchByLocation: (params) => api.get('/listings/search/location', { params })
};

export const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  searchByLocation: (params) => api.get('/users/search/location', { params })
};

export const orderService = {
  create: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/user/orders'),
  getSellerOrders: () => api.get('/orders/seller/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export const reviewService = {
  create: (data) => api.post('/reviews', data),
  getListingReviews: (listingId) => api.get(`/reviews/listing/${listingId}`),
  getSellerReviews: (sellerId) => api.get(`/reviews/seller/${sellerId}`)
};

export const messageService = {
  send: (data) => api.post('/messages', data),
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (userId) => api.get(`/messages/${userId}`)
};

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getPendingListings: () => api.get('/admin/listings/pending'),
  approveListing: (id) => api.put(`/admin/listings/${id}/approve`),
  rejectListing: (id) => api.delete(`/admin/listings/${id}/reject`),
  verifySeller: (id) => api.put(`/admin/users/${id}/verify`),
  suspendUser: (id) => api.put(`/admin/users/${id}/suspend`)
};
