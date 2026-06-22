import { useState, useEffect } from 'react';
import api from '../api';
import { Save } from 'lucide-react';

const ResumePanel = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchAbout = async () => {
    try {
      const res = await api.get('/about');
      if (res.data) {
        setResumeUrl(res.data.resumeUrl || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/about', { resumeUrl });
      alert('Resume URL updated successfully!');
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-display text-3xl">Resume</h1>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-accent hover:bg-accent-hover text-black px-6 py-2 rounded-8px font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border p-6 space-y-6">
        <div>
          <label className="block text-sm text-muted mb-2 font-mono">Resume URL (Google Drive, Dropbox, PDF link, etc.)</label>
          <input 
            type="text" 
            className="w-full bg-card border border-border rounded-8px px-4 py-3 text-primary focus:outline-none focus:border-accent"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://..."
          />
          <p className="mt-2 text-sm text-muted">This link will be used when visitors click the "View Resume" button on your portfolio.</p>
        </div>
      </div>
    </div>
  );
};

export default ResumePanel;
