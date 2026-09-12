const Order = require('../models/Order');
const Listing = require('../models/Listing');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { listingId, quantity, deliveryAddress, notes } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const totalPrice = listing.price * (quantity || 1);

    const order = new Order({
      customer: req.user.id,
      seller: listing.seller,
      listing: listingId,
      quantity: quantity || 1,
      totalPrice,
      deliveryAddress,
      notes
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('seller', 'name phone')
      .populate('listing', 'title price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get seller orders
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id })
      .populate('customer', 'name phone email')
      .populate('listing', 'title')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    order.status = status;
    if (status === 'completed') {
      order.completedAt = new Date();
    }

    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
