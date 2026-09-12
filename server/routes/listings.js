const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const listingController = require('../controllers/listingController');

// Create listing
router.post('/', auth, checkRole('seller', 'admin'), listingController.createListing);

// Get all listings
router.get('/', listingController.getAllListings);

// Get listing by ID
router.get('/:id', listingController.getListingById);

// Update listing
router.put('/:id', auth, listingController.updateListing);

// Delete listing
router.delete('/:id', auth, listingController.deleteListing);

// Search by location
router.get('/search/location', listingController.searchByLocation);

module.exports = router;
