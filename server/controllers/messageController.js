const Message = require('../models/Message');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, listingId, content } = req.body;

    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      listing: listingId,
      content
    });

    await message.save();
    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get conversations
exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { recipient: req.user.id }]
    })
      .populate('sender', 'name profileImage')
      .populate('recipient', 'name profileImage')
      .populate('listing', 'title')
      .sort({ createdAt: -1 });

    // Group by conversation
    const conversations = {};
    messages.forEach(msg => {
      const otherUser = msg.sender._id.toString() === req.user.id ? msg.recipient._id : msg.sender._id;
      if (!conversations[otherUser]) {
        conversations[otherUser] = [];
      }
      conversations[otherUser].push(msg);
    });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get messages with specific user
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id }
      ]
    })
      .populate('sender', 'name profileImage')
      .populate('recipient', 'name profileImage')
      .sort({ createdAt: 1 });

    // Mark as read
    await Message.updateMany(
      { recipient: req.user.id, sender: req.params.userId, isRead: false },
      { isRead: true }
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
