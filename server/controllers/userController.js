const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, phone, location, businessName, businessDescription, businessCategory } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        location,
        businessName,
        businessDescription,
        businessCategory,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search users by location
exports.searchByLocation = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 50000 } = req.query;

    const users = await User.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      role: 'seller'
    }).select('-password');

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
