const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { 
    const item = await SiteSettings.findOne();
    res.json(item || {}); 
  }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.put('/', protect, async (req, res) => {
  try {
    let item = await SiteSettings.findOne();
    if (item) {
      Object.assign(item, req.body);
      await item.save();
    } else {
      item = await SiteSettings.create(req.body);
    }
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});
module.exports = router;