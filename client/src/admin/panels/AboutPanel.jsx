import { useState, useEffect } from 'react';
import api from '../api';

const AboutPanel = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    bio: '',
    photoUrl: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: ''
    }
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/about');
        if (res.data && res.data.length > 0) {
          const about = res.data[0];
          setFormData({
            bio: about.bio || '',
            photoUrl: about.photoUrl || '',
            resumeUrl: about.resumeUrl || '',
            socialLinks: {
              github: about.socialLinks?.github || '',
              linkedin: about.socialLinks?.linkedin || '',
              twitter: about.socialLinks?.twitter || '',
              email: about.socialLinks?.email || ''
            }
          });
        }
      } catch (err) {
        console.error('Failed to load About data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/about', formData);
      alert('About section updated successfully!');
    } catch (err) {
      alert('Failed to update About section');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value
      }
    }));
  };

  if (loading) return <div className="text-muted p-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">About & Socials</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-8px transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden p-6 space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-primary border-b border-border pb-2">Basic Info</h2>
          
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Main Bio / Tagline</label>
            <textarea 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent min-h-[100px]"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="e.g. Currently pursuing my undergraduate degree..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Photo URL (Cloudinary etc)</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.photoUrl}
                onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Resume URL (PDF link)</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-primary border-b border-border pb-2">Social Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Email Address</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.socialLinks.email}
                onChange={(e) => handleSocialChange('email', e.target.value)}
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">GitHub Profile URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.socialLinks.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">LinkedIn Profile URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">X (Twitter) Profile URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://x.com/..."
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPanel;
