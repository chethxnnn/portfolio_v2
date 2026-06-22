const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Programming', 'Web Technologies'
  proficiency: { type: Number, min: 1, max: 100 },
  icon: { type: String }, // optional SVG or icon class
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
