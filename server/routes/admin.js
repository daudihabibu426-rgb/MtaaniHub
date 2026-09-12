const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Get platform stats
router.get('/stats', auth, checkRole('admin'), adminController.getStats);

// Get pending listings
router.get('/listings/pending', auth, checkRole('admin'), adminController.getPendingListings);

// Approve listing
router.put('/listings/:id/approve', auth, checkRole('admin'), adminController.approveListing);

// Reject listing
router.delete('/listings/:id/reject', auth, checkRole('admin'), adminController.rejectListing);

// Verify seller
router.put('/users/:id/verify', auth, checkRole('admin'), adminController.verifySeller);

// Suspend user
router.put('/users/:id/suspend', auth, checkRole('admin'), adminController.suspendUser);

module.exports = router;
