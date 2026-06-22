import { useState, useEffect } from 'react';
import api from './api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    education: 0,
    experience: 0,
    skills: 0,
    hobbies: 0,
    media: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, edu, exp, skil, hob, med] = await Promise.all([
          api.get('/projects'),
          api.get('/education'),
          api.get('/experience'),
          api.get('/skills'),
          api.get('/hobbies'),
          api.get('/media')
        ]);

        setStats({
          projects: proj.data.length || 0,
          education: edu.data.length || 0,
          experience: exp.data.length || 0,
          skills: skil.data.length || 0,
          hobbies: hob.data.length || 0,
          media: med.data.length || 0
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-display text-3xl mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Projects</h3>
          <p className="text-4xl text-accent font-display">{stats.projects}</p>
        </div>
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Education</h3>
          <p className="text-4xl text-accent font-display">{stats.education}</p>
        </div>
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Experience</h3>
          <p className="text-4xl text-accent font-display">{stats.experience}</p>
        </div>
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Skills</h3>
          <p className="text-4xl text-accent font-display">{stats.skills}</p>
        </div>
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Hobbies</h3>
          <p className="text-4xl text-accent font-display">{stats.hobbies}</p>
        </div>
        <div className="bg-surface p-6 rounded-12px border border-border">
          <h3 className="text-muted font-mono mb-2">Media Accounts</h3>
          <p className="text-4xl text-accent font-display">{stats.media}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
