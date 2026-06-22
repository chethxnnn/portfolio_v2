const express = require('express');
const router = express.Router();
const InstagramAccount = require('../models/InstagramAccount');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await InstagramAccount.find({}).sort({ order: 1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await InstagramAccount.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { res.json(await InstagramAccount.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await InstagramAccount.findByIdAndDelete(req.params.id); res.json({ message: 'Removed' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;