const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

// Create review
router.post('/', auth, reviewController.createReview);

// Get listing reviews
router.get('/listing/:listingId', reviewController.getListingReviews);

// Get seller reviews
router.get('/seller/:sellerId', reviewController.getSellerReviews);

module.exports = router;
