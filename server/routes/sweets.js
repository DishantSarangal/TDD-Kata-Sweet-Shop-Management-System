const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const Sweet = require('../models/sweet.model.js');

const { authRequired, requireAdmin } = require('../middleware/auth');

// Add new sweet (protected)
router.post('/', authRequired, async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch(e) { res.status(400).json({ message: e.message }); }
});

// List all sweets
router.get('/', async (req, res) => {
  const list = await Sweet.find().sort({ createdAt: -1 });
  res.json(list);
});

// Search
router.get('/search', async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const filter = {};
  if(q) filter.name = { $regex: q, $options: 'i' };
  if(category) filter.category = category;
  if(minPrice || maxPrice) filter.price = {};
  if(minPrice) filter.price.$gte = Number(minPrice);
  if(maxPrice) filter.price.$lte = Number(maxPrice);
  const list = await Sweet.find(filter);
  res.json(list);
});

// Update sweet
router.put('/:id', authRequired, async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch(e){ res.status(400).json({ message: e.message }); }
});

// Delete (admin only)
router.delete('/:id', authRequired, requireAdmin, async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch(e){ res.status(400).json({ message: e.message }); }
});

// Purchase: decrease quantity by 1 (or requested amount)
router.post('/:id/purchase', authRequired, async (req, res) => {
  const amount = Number(req.body.amount || 1);
  try {
    const sweet = await Sweet.findById(req.params.id);
    if(!sweet) return res.status(404).json({ message: 'Not found' });
    if(sweet.quantity < amount) return res.status(400).json({ message: 'Out of stock' });
    sweet.quantity -= amount;
    await sweet.save();
    res.json({ message: 'Purchased', sweet });
  } catch(e){ res.status(400).json({ message: e.message }); }
});

// Restock (admin)
router.post('/:id/restock', authRequired, requireAdmin, async (req, res) => {
  const amount = Number(req.body.amount || 1);
  try {
    const sweet = await Sweet.findById(req.params.id);
    if(!sweet) return res.status(404).json({ message: 'Not found' });
    sweet.quantity += amount;
    await sweet.save();
    res.json({ message: 'Restocked', sweet });
  } catch(e){ res.status(400).json({ message: e.message }); }
});

module.exports = router;
