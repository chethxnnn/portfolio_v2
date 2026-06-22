const express = require('express');
const router = express.Router();
const Hobby = require('../models/Hobby');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await Hobby.find({}).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const item = await Hobby.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Hobby.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Hobby.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hobby removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
