const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await Education.find({}).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
