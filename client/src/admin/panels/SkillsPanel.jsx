import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const SkillsPanel = () => {
  const [skills, setSkills] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 50,
    icon: '',
    order: 0
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      name: '',
      category: '',
      proficiency: 50,
      icon: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      name: item.name || '',
      category: item.category || '',
      proficiency: item.proficiency || 50,
      icon: item.icon || '',
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
        await api.put(`/skills/${currentEdit}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/skills/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchSkills();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Skills</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Skill
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Skill Name</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal">Proficiency</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {skills.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-muted italic">
                  No skills found.
                </td>
              </tr>
            )}
            {skills.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-muted text-sm">{p.category}</td>
                <td className="p-4">
                  <div className="w-full bg-card rounded-full h-2 max-w-[100px]">
                    <div className="bg-accent h-2 rounded-full" style={{ width: `${p.proficiency}%` }}></div>
                  </div>
                </td>
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
        title={currentEdit ? "Edit Skill" : "New Skill"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Skill Name</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Category</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Proficiency ({formData.proficiency}%)</label>
            <input 
              type="range" 
              min="1" max="100"
              className="w-full accent-accent"
              value={formData.proficiency}
              onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value) || 50})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Icon (Optional URL or Emoji)</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
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
        title="Delete Skill"
        message={`Are you sure you want to delete ${itemToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default SkillsPanel;
