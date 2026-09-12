const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

// Create order
router.post('/', auth, orderController.createOrder);

// Get user orders
router.get('/user/orders', auth, orderController.getUserOrders);

// Get seller orders
router.get('/seller/orders', auth, orderController.getSellerOrders);

// Update order status
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;
