const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  seoTitle: { type: String, default: 'Portfolio' },
  seoDesc: { type: String, default: 'My portfolio' },
  ogImage: { type: String },
  heroTagline: { type: String },
  heroSubtitle: { type: String },
  sectionsVisibility: {
    about: { type: Boolean, default: true },
    projects: { type: Boolean, default: true },
    skills: { type: Boolean, default: true },
    instagram: { type: Boolean, default: true },
    experience: { type: Boolean, default: true },
    contact: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
