const Review = require('../models/Review');
const Listing = require('../models/Listing');
const User = require('../models/User');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { listingId, rating, comment } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const review = new Review({
      listing: listingId,
      seller: listing.seller,
      reviewer: req.user.id,
      rating,
      comment
    });

    await review.save();
    listing.reviews.push(review._id);

    // Update seller rating
    const allReviews = await Review.find({ seller: listing.seller });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await User.findByIdAndUpdate(listing.seller, {
      rating: avgRating,
      totalReviews: allReviews.length
    });

    await listing.save();

    res.status(201).json({ message: 'Review created', review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get reviews for listing
exports.getListingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ listing: req.params.listingId })
      .populate('reviewer', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get seller reviews
exports.getSellerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('reviewer', 'name profileImage')
      .populate('listing', 'title')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
