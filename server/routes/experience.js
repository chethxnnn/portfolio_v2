const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await Experience.find({}).sort({ order: 1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await Experience.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { res.json(await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Experience.findByIdAndDelete(req.params.id); res.json({ message: 'Removed' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;