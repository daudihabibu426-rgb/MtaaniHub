import apiClient from './apiClient';

export const listingService = {
  getListings: (params) => apiClient.get('/listings', { params }),
  getListingById: (id) => apiClient.get(`/listings/${id}`),
  createListing: (formData) => apiClient.post('/listings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateListing: (id, formData) => apiClient.put(`/listings/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteListing: (id) => apiClient.delete(`/listings/${id}`),
  searchListings: (query) => apiClient.get('/listings/search', { params: { q: query } }),
  getListingsByCategory: (category) => apiClient.get(`/listings/category/${category}`),
  getListingsByLocation: (location) => apiClient.get(`/listings/location/${location}`),
  getListingsByUser: (userId) => apiClient.get(`/listings/user/${userId}`),
  toggleFavorite: (id) => apiClient.post(`/listings/${id}/favorite`),
  getFavorites: () => apiClient.get('/listings/favorites'),
  getReviews: (id) => apiClient.get(`/listings/${id}/reviews`),
  addReview: (id, reviewData) => apiClient.post(`/listings/${id}/reviews`, reviewData)
};
