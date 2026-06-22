const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try { res.status(201).json(await Contact.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.get('/', protect, async (req, res) => {
  try { res.json(await Contact.find({}).sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Contact.findByIdAndDelete(req.params.id); res.json({ message: 'Removed' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
module.exports = router;