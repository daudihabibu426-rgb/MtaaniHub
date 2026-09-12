import apiClient from './apiClient';

export const orderService = {
  createOrder: (orderData) => apiClient.post('/orders', orderData),
  getOrders: () => apiClient.get('/orders'),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  updateOrderStatus: (id, status) => apiClient.put(`/orders/${id}/status`, { status }),
  cancelOrder: (id) => apiClient.post(`/orders/${id}/cancel`),
  getOrderHistory: (userId) => apiClient.get(`/orders/user/${userId}`),
  trackOrder: (id) => apiClient.get(`/orders/${id}/track`),
  initializePayment: (orderId, paymentMethod) => apiClient.post('/payments/initialize', { orderId, paymentMethod }),
  verifyPayment: (paymentId) => apiClient.post('/payments/verify', { paymentId }),
  getPaymentMethods: () => apiClient.get('/payments/methods')
};
