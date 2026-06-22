import { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Lightbulb, Camera, Briefcase, User, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Folder },
    { name: 'Education', path: '/admin/education', icon: Briefcase },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Hobbies', path: '/admin/hobbies', icon: Lightbulb },
    { name: 'Media Accounts', path: '/admin/media', icon: Camera },
    { name: 'Skills', path: '/admin/skills', icon: Lightbulb },
    { name: 'Resume', path: '/admin/resume', icon: Folder },
    { name: 'About', path: '/admin/about', icon: User },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden relative">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-surface border-b border-border flex items-center justify-between px-4 z-40">
        <h2 className="text-display text-accent tracking-widest text-lg uppercase">CMS</h2>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-primary p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-border hidden md:block">
          <h2 className="text-display text-accent tracking-widest text-xl uppercase">CMS</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 mt-16 md:mt-0">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-8px transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-accent/10 text-accent' 
                      : 'text-muted hover:bg-card hover:text-primary'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border bg-surface">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-danger hover:bg-danger/10 rounded-8px transition-colors"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 relative w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
