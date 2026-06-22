import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const ExperiencePanel = () => {
  const [experiences, setExperiences] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    techStack: '',
    order: 0
  });

  const fetchExperiences = async () => {
    try {
      const res = await api.get('/experience');
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      techStack: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      company: item.company || '',
      role: item.role || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      description: item.description || '',
      techStack: item.techStack ? item.techStack.join(', ') : '',
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
      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s)
      };
      
      if (currentEdit) {
        await api.put(`/experience/${currentEdit}`, payload);
      } else {
        await api.post('/experience', payload);
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/experience/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchExperiences();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Experience</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-black px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Experience
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Company</th>
              <th className="p-4 font-normal">Role</th>
              <th className="p-4 font-normal">Duration</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {experiences.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-muted italic">
                  No experience found.
                </td>
              </tr>
            )}
            {experiences.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium">{p.company}</td>
                <td className="p-4 text-muted text-sm">{p.role}</td>
                <td className="p-4 text-muted text-sm">{p.startDate} - {p.endDate || 'Present'}</td>
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
        title={currentEdit ? "Edit Experience" : "New Experience"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Company</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Role</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Start Date</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">End Date (Leave blank for Present)</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Description</label>
            <textarea 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.techStack}
              onChange={(e) => setFormData({...formData, techStack: e.target.value})}
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
        title="Delete Experience"
        message={`Are you sure you want to delete ${itemToDelete?.company}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ExperiencePanel;
