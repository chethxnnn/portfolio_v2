const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  year: { type: String, required: true },
  location: { type: String },
  degree: { type: String }
});

const socialLinksSchema = new mongoose.Schema({
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  email: { type: String }
});

const aboutSchema = new mongoose.Schema({
  bio: { type: String },
  story: { type: [String], default: [] },
  photoUrl: { type: String },
  resumeUrl: { type: String },
  education: [educationSchema],
  socialLinks: socialLinksSchema
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
