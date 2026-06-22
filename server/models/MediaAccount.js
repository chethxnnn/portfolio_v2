const mongoose = require('mongoose');

const mediaAccountSchema = new mongoose.Schema({
  platform: { type: String, required: true, enum: ['instagram', 'youtube', 'linkedin', 'github', 'x'] },
  name: { type: String, required: true },
  handle: { type: String, required: true },
  logoUrl: { type: String }, // Used as avatar
  description: { type: String }, // Used as story
  profileUrl: { type: String, required: true }, // link
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MediaAccount', mediaAccountSchema);
