const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const messageController = require('../controllers/messageController');

// Send message
router.post('/', auth, messageController.sendMessage);

// Get conversations
router.get('/conversations', auth, messageController.getConversations);

// Get messages with specific user
router.get('/:userId', auth, messageController.getMessages);

module.exports = router;
