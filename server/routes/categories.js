const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create category (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, slug, icon, description, subcategories } = req.body;

    const category = new Category({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      icon,
      description,
      subcategories
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
