const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Get user profile
router.get('/:id', userController.getProfile);

// Update user profile
router.put('/:id', auth, userController.updateProfile);

// Search users by location
router.get('/search/location', userController.searchByLocation);

module.exports = router;
