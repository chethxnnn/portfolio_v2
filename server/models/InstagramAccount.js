const mongoose = require('mongoose');

const instagramAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true },
  logoUrl: { type: String }, // Cloudinary URL
  description: { type: String },
  profileUrl: { type: String, required: true },
  category: { type: String }, // e.g., 'Culture', 'Tech'
  dateStarted: { type: Date },
  followers: { type: String }, // e.g., '4,900+'
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('InstagramAccount', instagramAccountSchema);
