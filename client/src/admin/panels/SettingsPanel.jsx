import { useState, useEffect } from 'react';
import api from '../api';

const SettingsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    seoTitle: '',
    seoDesc: '',
    ogImage: '',
    heroTagline: '',
    heroSubtitle: '',
    sectionsVisibility: {
      about: true,
      projects: true,
      skills: true,
      instagram: true,
      experience: true,
      contact: true
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data && res.data.length > 0) {
          const settings = res.data[0];
          setFormData({
            seoTitle: settings.seoTitle || '',
            seoDesc: settings.seoDesc || '',
            ogImage: settings.ogImage || '',
            heroTagline: settings.heroTagline || '',
            heroSubtitle: settings.heroSubtitle || '',
            sectionsVisibility: {
              about: settings.sectionsVisibility?.about ?? true,
              projects: settings.sectionsVisibility?.projects ?? true,
              skills: settings.sectionsVisibility?.skills ?? true,
              instagram: settings.sectionsVisibility?.instagram ?? true,
              experience: settings.sectionsVisibility?.experience ?? true,
              contact: settings.sectionsVisibility?.contact ?? true
            }
          });
        }
      } catch (err) {
        console.error('Failed to load Settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', formData);
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Failed to update settings');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleVisibilityChange = (section) => {
    setFormData(prev => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [section]: !prev.sectionsVisibility[section]
      }
    }));
  };

  if (loading) return <div className="text-muted p-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Site Settings</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-8px transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="space-y-8">
        {/* SEO Settings */}
        <div className="bg-surface rounded-12px border border-border overflow-hidden p-6">
          <h2 className="text-xl font-medium text-primary border-b border-border pb-2 mb-4">SEO & Meta</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted mb-1 font-mono">Site Title</label>
                <input 
                  type="text" 
                  className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1 font-mono">OG Image URL (Social Share)</label>
                <input 
                  type="text" 
                  className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({...formData, ogImage: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Site Description (Meta Desc)</label>
              <textarea 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent h-24"
                value={formData.seoDesc}
                onChange={(e) => setFormData({...formData, seoDesc: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="bg-surface rounded-12px border border-border overflow-hidden p-6">
          <h2 className="text-xl font-medium text-primary border-b border-border pb-2 mb-4">Hero Section</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Hero Tagline</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.heroTagline}
                onChange={(e) => setFormData({...formData, heroTagline: e.target.value})}
                placeholder="e.g. Creative Developer"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Hero Subtitle</label>
              <textarea 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent h-24"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({...formData, heroSubtitle: e.target.value})}
                placeholder="e.g. I build digital experiences..."
              />
            </div>
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="bg-surface rounded-12px border border-border overflow-hidden p-6">
          <h2 className="text-xl font-medium text-primary border-b border-border pb-2 mb-4">Section Visibility</h2>
          <p className="text-sm text-muted mb-6">Toggle which sections are visible on the public portfolio.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.keys(formData.sectionsVisibility).map((section) => (
              <label key={section} className="flex items-center gap-3 cursor-pointer p-4 bg-card rounded-8px border border-border hover:border-accent/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.sectionsVisibility[section]}
                  onChange={() => handleVisibilityChange(section)}
                  className="w-5 h-5 rounded border-border bg-background accent-accent"
                />
                <span className="font-mono text-primary capitalize">{section}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
