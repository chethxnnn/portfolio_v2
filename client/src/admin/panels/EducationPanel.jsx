import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const EducationPanel = () => {
  const [education, setEducation] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  // Confirm dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    year: '',
    score: '',
    expandedDetails: '',
    order: 0
  });

  const fetchEducation = async () => {
    try {
      const res = await api.get('/education');
      setEducation(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      name: '',
      degree: '',
      year: '',
      score: '',
      expandedDetails: '',
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      name: item.name || '',
      degree: item.degree || '',
      year: item.year || '',
      score: item.score || '',
      expandedDetails: item.expandedDetails ? item.expandedDetails.join('\n') : '',
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
        expandedDetails: formData.expandedDetails.split('\n').filter(s => s.trim() !== '')
      };
      
      if (currentEdit) {
        await api.put(`/education/${currentEdit}`, payload);
      } else {
        await api.post('/education', payload);
      }
      setIsModalOpen(false);
      fetchEducation();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/education/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchEducation();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Education</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-black px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Education
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Institution</th>
              <th className="p-4 font-normal">Degree</th>
              <th className="p-4 font-normal">Year</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {education.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-muted italic">
                  No education found.
                </td>
              </tr>
            )}
            {education.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-muted text-sm">{p.degree}</td>
                <td className="p-4 text-muted text-sm">{p.year}</td>
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
        title={currentEdit ? "Edit Education" : "New Education"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Institution Name</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Degree</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.degree}
              onChange={(e) => setFormData({...formData, degree: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Year</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Score / CGPA</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.score}
                onChange={(e) => setFormData({...formData, score: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Expanded Details (One per line)</label>
            <textarea 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent min-h-[100px]"
              value={formData.expandedDetails}
              onChange={(e) => setFormData({...formData, expandedDetails: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Order (Lower numbers appear first)</label>
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
        title="Delete Education"
        message={`Are you sure you want to delete ${itemToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default EducationPanel;
