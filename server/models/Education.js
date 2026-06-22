const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
  score: { type: String },
  expandedDetails: [{ type: String }],
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
