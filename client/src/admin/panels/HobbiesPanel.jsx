import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const HobbiesPanel = () => {
  const [hobbies, setHobbies] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  // Confirm dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    desc: '',
    tools: '',
    order: 0
  });

  const fetchHobbies = async () => {
    try {
      const res = await api.get('/hobbies');
      setHobbies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      title: '',
      icon: '',
      desc: '',
      tools: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      title: item.title || '',
      icon: item.icon || '',
      desc: item.desc || '',
      tools: item.tools || '',
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
        await api.put(`/hobbies/${currentEdit}`, formData);
      } else {
        await api.post('/hobbies', formData);
      }
      setIsModalOpen(false);
      fetchHobbies();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/hobbies/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchHobbies();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Hobbies</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Hobby
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Icon</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {hobbies.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-muted italic">
                  No hobbies found.
                </td>
              </tr>
            )}
            {hobbies.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium whitespace-pre-line">{p.title}</td>
                <td className="p-4 text-muted text-sm text-2xl">{p.icon}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenEdit(p)} className="text-muted hover:text-accent p-2"><Edit2 size={16} /></button>
                  <button onClick={() => handleOpenDelete(p)} className="text-muted hover:text-danger p-2 ml-2"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentEdit ? "Edit Hobby" : "New Hobby"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,80px] gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Title (Use \n for newlines)</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Emoji Icon</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent text-center"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Description</label>
            <textarea 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent min-h-[120px]"
              value={formData.desc}
              onChange={(e) => setFormData({...formData, desc: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Tools/Gear</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.tools}
              onChange={(e) => setFormData({...formData, tools: e.target.value})}
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
              className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-8px text-white transition-colors"
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
        title="Delete Hobby"
        message={`Are you sure you want to delete this hobby? This action cannot be undone.`}
      />
    </div>
  );
};

export default HobbiesPanel;
