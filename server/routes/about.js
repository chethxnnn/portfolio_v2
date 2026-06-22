const express = require('express');
const router = express.Router();
const About = require('../models/About');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { 
    const item = await About.findOne();
    res.json(item || {}); 
  }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.put('/', protect, async (req, res) => {
  try {
    let item = await About.findOne();
    if (item) {
      Object.assign(item, req.body);
      await item.save();
    } else {
      item = await About.create(req.body);
    }
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});
module.exports = router;