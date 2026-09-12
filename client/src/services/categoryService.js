import apiClient from './apiClient';

export const categoryService = {
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id) => apiClient.get(`/categories/${id}`),
  getCategoryListings: (id, params) => apiClient.get(`/categories/${id}/listings`, { params })
};
