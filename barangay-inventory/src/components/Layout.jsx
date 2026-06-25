import React from 'react';
import { LayoutDashboard, Box, PlusCircle, Layers, PieChart, Users, Settings, LogOut, Bell, User as UserIcon, Menu, Search, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Inventory', path: '/inventory', icon: Box },
    { name: 'Add Item', path: '/add-item', icon: PlusCircle },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Reports', path: '/reports', icon: PieChart },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a4d2e] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 flex flex-col items-center">
            <div className="bg-white p-3 rounded-full mb-3 shadow-lg">
              <Box size={40} className="text-[#1a4d2e]" />
            </div>
            <h1 className="text-sm font-bold tracking-wider text-center uppercase leading-tight">
              Barangay<br/><span className="text-[10px] font-medium opacity-80">Inventory System</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#2d6a4f] text-white font-semibold' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-white transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/inventory') return 'Inventory List';
    if (path === '/add-item') return 'Add Item';
    if (path.includes('/edit-item')) return 'Edit Item';
    if (path === '/categories') return 'Categories';
    if (path === '/reports') return 'Reports';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 text-slate-800">
          <Menu className="hidden lg:block text-slate-400" size={20} />
          <h2 className="text-base font-bold">{getPageTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[10px] text-white flex items-center justify-center rounded-full border border-white font-bold">2</span>
        </button>

        <div className="flex items-center gap-2 pl-2 cursor-pointer group">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 border border-slate-300">
            <UserIcon size={16} />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:text-[#1a4d2e]">
              {user?.role || 'Barangay Staff'}
              <ChevronDown size={14} />
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
