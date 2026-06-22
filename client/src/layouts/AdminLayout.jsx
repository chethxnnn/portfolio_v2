import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Lightbulb, Camera, Briefcase, User, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const token = localStorage.getItem('adminToken');
  const location = useLocation();

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
    { name: 'About', path: '/admin/about', icon: User },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-display text-accent tracking-widest text-xl uppercase">CMS</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
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

        <div className="p-4 border-t border-border">
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
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
