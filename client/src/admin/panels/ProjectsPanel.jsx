import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';

const ProjectsPanel = () => {
  const [projects, setProjects] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  
  // Confirm dialog state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDesc: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    status: 'Completed',
    projectType: 'Personal',
    featured: false,
    order: 0
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setCurrentEdit(null);
    setFormData({
      title: '',
      description: '',
      shortDesc: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      status: 'Completed',
      projectType: 'Personal',
      featured: false,
      order: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentEdit(item._id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      shortDesc: item.shortDesc || '',
      techStack: item.techStack ? item.techStack.join(', ') : '',
      liveUrl: item.liveUrl || '',
      githubUrl: item.githubUrl || '',
      status: item.status || 'Completed',
      projectType: item.projectType || 'Personal',
      featured: item.featured || false,
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
        await api.put(`/projects/${currentEdit}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert('Error saving data');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/projects/${itemToDelete._id}`);
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchProjects();
    } catch (err) {
      alert('Error deleting data');
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display text-3xl">Projects</h1>
        <button 
          onClick={handleOpenAdd}
          className="bg-accent hover:bg-accent-hover text-black px-4 py-2 rounded-8px flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      <div className="bg-surface rounded-12px border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card border-b border-border text-muted font-mono text-sm">
            <tr>
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Tech Stack</th>
              <th className="p-4 font-normal">Featured</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-muted italic">
                  No projects found.
                </td>
              </tr>
            )}
            {projects.map(p => (
              <tr key={p._id} className="hover:bg-card/50 transition-colors">
                <td className="p-4 font-medium">{p.title}</td>
                <td className="p-4 text-muted text-sm">{p.techStack?.join(', ')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${p.featured ? 'bg-success/20 text-success' : 'bg-surface text-muted'}`}>
                    {p.featured ? 'Yes' : 'No'}
                  </span>
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
        title={currentEdit ? "Edit Project" : "New Project"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Title</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Short Description (for cards)</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
              value={formData.shortDesc}
              onChange={(e) => setFormData({...formData, shortDesc: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 font-mono">Full Description</label>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Live URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.liveUrl}
                onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">GitHub URL</label>
              <input 
                type="text" 
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.githubUrl}
                onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Status</label>
              <select
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1 font-mono">Project Type</label>
              <select
                className="w-full bg-card border border-border rounded-8px px-4 py-2 text-primary focus:outline-none focus:border-accent"
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
              >
                <option value="Personal">Personal</option>
                <option value="College">College</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="w-4 h-4 rounded border-border bg-card accent-accent"
              />
              <span className="text-sm font-mono text-muted">Featured Project</span>
            </label>
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
        title="Delete Project"
        message={`Are you sure you want to delete ${itemToDelete?.title}? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProjectsPanel;
