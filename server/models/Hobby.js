const mongoose = require('mongoose');

const hobbySchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  desc: { type: String, required: true },
  tools: { type: String },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hobby', hobbySchema);
