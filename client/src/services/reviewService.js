import apiClient from './apiClient';

export const reviewService = {
  getReviews: (params) => apiClient.get('/reviews', { params }),
  getReviewById: (id) => apiClient.get(`/reviews/${id}`),
  createReview: (reviewData) => apiClient.post('/reviews', reviewData),
  updateReview: (id, reviewData) => apiClient.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => apiClient.delete(`/reviews/${id}`),
  getUserReviews: (userId) => apiClient.get(`/reviews/user/${userId}`),
  getListingReviews: (listingId) => apiClient.get(`/reviews/listing/${listingId}`),
  likeReview: (id) => apiClient.post(`/reviews/${id}/like`),
  unlikeReview: (id) => apiClient.delete(`/reviews/${id}/like`)
};
