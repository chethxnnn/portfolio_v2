import { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('adminToken', data.token);
      window.location.href = '/admin';
    } catch (err) {
      alert('Login Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="bg-surface p-8 rounded-12px border border-border w-full max-w-md">
        <h2 className="text-display tracking-widest text-accent mb-6 text-2xl uppercase">System Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-mono text-muted text-sm mb-2">Username</label>
            <input 
              type="text" 
              className="w-full bg-card border border-border rounded-4px p-3 text-primary focus:outline-none focus:border-accent"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-mono text-muted text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-card border border-border rounded-4px p-3 text-primary focus:outline-none focus:border-accent"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-4px font-bold tracking-wider transition-colors mt-4">
            INITIATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
