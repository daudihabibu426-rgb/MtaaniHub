const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
], authController.register);

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], authController.login);

// Get current user
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
