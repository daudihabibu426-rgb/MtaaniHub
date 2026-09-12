const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  subcategory: String,
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'TZS'
  },
  images: [String],
  location: {
    city: String,
    district: String,
    address: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number]
    }
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    hours: {
      start: String,
      end: String
    },
    daysOfWeek: [String]
  },
  contact: {
    phone: String,
    whatsapp: String,
    email: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  featuredUntil: Date,
  isApproved: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['product', 'service'],
    default: 'product'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
listingSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
