const fs = require('fs');
const path = require('path');

const models = ['InstagramAccount', 'Experience'];
models.forEach(model => {
  const code = `const express = require('express');
const router = express.Router();
const ${model} = require('../models/${model}');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await ${model}.find({}).sort({ order: 1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await ${model}.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { res.json(await ${model}.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (error) { res.status(400).json({ message: error.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await ${model}.findByIdAndDelete(req.params.id); res.json({ message: 'Removed' }); }
  catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;`;
  
  fs.writeFileSync(path.join(__dirname, 'routes', `${model.toLowerCase().replace('account', '')}.js`), code);
});

// About & Settings (Singletons)
['About', 'SiteSettings'].forEach(model => {
  const code = `const express = require('express');
const router = express.Router();
const ${model} = require('../models/${model}');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { 
    const item = await ${model}.findOne();
    res.json(item || {}); 
  }
  catch (error) { res.status(500).json({ message: error.message }); }
});
router.put('/', protect, async (req, res) => {
  try {
    let item = await ${model}.findOne();
    if (item) {
      Object.assign(item, req.body);
      await item.save();
    } else {
      item = await ${model}.create(req.body);
    }
    res.json(item);
  } catch (error) { res.status(400).json({ message: error.message }); }
});
module.exports = router;`;

  fs.writeFileSync(path.join(__dirname, 'routes', `${model.toLowerCase().replace('sitesettings', 'settings')}.js`), code);
});

// Contact
const contactCode = `const express = require('express');
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
module.exports = router;`;

fs.writeFileSync(path.join(__dirname, 'routes', 'contact.js'), contactCode);

console.log('Routes generated');
