const express = require('express');
const router = express.Router();
const MediaAccount = require('../models/MediaAccount');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const items = await MediaAccount.find({}).sort({ platform: 1, order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const item = await MediaAccount.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await MediaAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await MediaAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'MediaAccount removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
