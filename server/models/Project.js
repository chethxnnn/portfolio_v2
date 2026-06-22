const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDesc: { type: String },
  techStack: [{ type: String }],
  images: [{ type: String }], // URLs from Cloudinary
  liveUrl: { type: String },
  githubUrl: { type: String },
  status: { type: String, enum: ['Completed', 'Ongoing'], default: 'Completed' },
  projectType: { type: String, enum: ['College', 'Personal'], default: 'Personal' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
