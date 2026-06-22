import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const MediaPanel = () => {
  const [media, setMedia] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  // Confirm dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    platform: 'instagram',
    name: '',
    handle: '',
    logoUrl: '',
    description: '',
    profileUrl: '',
    order: 0
  });

  const fetchMedia = async () => {
    try {
      const res = await api.get('/media');
      setMedia(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      platform: 'instagram',
      name: '',
      handle: '',
      logoUrl: '',
      description: '',
      profileUrl: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      platform: item.platform || 'instagram',
      name: item.name || '',
      handle: item.handle || '',
      logoUrl: item.logoUrl || '',
      description: item.description || '',
      profileUrl: item.profileUrl || '',
      order: item.order || 0
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentEdit) {
        await api.put(`/media/${currentEdit}`, formData);
      } else {
        await api.post('/media', formData);
      }
      setIsModalOpen(false);
      fetchMedia();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/media/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchMedia();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Media Accounts</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-black px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Account
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Platform</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Handle</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {media.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-muted italic">
                  No media accounts found.
                </td>
              </tr>
            )}
            {media.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium capitalize">{p.platform}</td>
                <td className="p-4 text-muted text-sm">{p.name}</td>
                <td className="p-4 text-muted text-sm">{p.handle}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenEdit(p)} className="text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 p-2 rounded-md transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleOpenDelete(p)} className="text-red-500 bg-red-500/10 hover:bg-red-500/20 p-2 ml-2 rounded-md transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentEdit ? "Edit Media Account" : "New Media Account"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Platform</label>
              <select
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.platform}
                onChange={(e) => setFormData({...formData, platform: e.target.value})}
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="x">X / Twitter</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Handle (e.g. @username)</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.handle}
                onChange={(e) => setFormData({...formData, handle: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Profile URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.profileUrl}
                onChange={(e) => setFormData({...formData, profileUrl: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Logo URL (Optional)</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.logoUrl}
              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Description / Bio</label>
            <textarea 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Order</label>
            <input 
              type="number" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-card hover:bg-card/80 border border-border rounded-8px text-primary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-8px text-black font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Media Account"
        message={`Are you sure you want to delete ${itemToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default MediaPanel;
