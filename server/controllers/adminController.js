const User = require('../models/User');
const Listing = require('../models/Listing');
const Order = require('../models/Order');
const Category = require('../models/Category');

// Get platform stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalListings = await Listing.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      totalUsers,
      totalSellers,
      totalListings,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pending listings
exports.getPendingListings = async (req, res) => {
  try {
    const listings = await Listing.find({ isApproved: false })
      .populate('seller', 'name email businessName')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve listing
exports.approveListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({ message: 'Listing approved', listing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject listing
exports.rejectListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify seller
exports.verifySeller = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    res.json({ message: 'Seller verified', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Suspend user
exports.suspendUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isSuspended: true },
      { new: true }
    );

    res.json({ message: 'User suspended', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
