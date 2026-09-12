const Listing = require('../models/Listing');
const Review = require('../models/Review');

// Create listing
exports.createListing = async (req, res) => {
  try {
    const { title, description, category, price, location, contact, type } = req.body;

    const listing = new Listing({
      seller: req.user.id,
      title,
      description,
      category,
      price,
      location,
      contact,
      type,
      images: req.files ? req.files.map(f => f.path) : []
    });

    await listing.save();
    res.status(201).json({ message: 'Listing created', listing });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all listings
exports.getAllListings = async (req, res) => {
  try {
    const { category, search, city, isFeatured, page = 1, limit = 20 } = req.query;
    const query = { isApproved: true };

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (city) query['location.city'] = city;
    if (isFeatured === 'true') query.isFeatured = true;

    const listings = await Listing.find(query)
      .populate('seller', 'name rating isVerified profileImage')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Listing.countDocuments(query);

    res.json({
      listings,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('seller', '-password').populate('reviews');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: 'Listing updated', listing: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search listings by location
exports.searchByLocation = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 50000, category } = req.query;
    const query = {
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isApproved: true
    };

    if (category) query.category = category;

    const listings = await Listing.find(query)
      .populate('seller', 'name rating isVerified profileImage');

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
