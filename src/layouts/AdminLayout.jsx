import { Outlet, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  Package, 
  Calendar as CalendarIcon, 
  MessageSquare,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  Bell,
  X,
  Menu
} from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const allMenuItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/packages', icon: Package, label: 'Packages' },
  { to: '/admin/calendar', icon: CalendarIcon, label: 'Calendar' },
  { to: '/admin/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/help', icon: HelpCircle, label: 'Help' },
];

// Bottom nav: only 5 main items
const bottomNavItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Home', end: true },
  { to: '/admin/packages', icon: Package, label: 'Packages' },
  { to: '/admin/calendar', icon: CalendarIcon, label: 'Calendar' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
];

export default function AdminLayout() {
  const { isAdmin, logout } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isAdmin) return <Navigate to="/login" replace />;

  const bg = isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]';
  const textColor = isDarkMode ? 'text-slate-100' : 'text-slate-900';
  const adaptiveSidebarBg = isDarkMode ? 'bg-slate-900' : 'bg-[#1E1B4B]';
  const headerBg = isDarkMode ? 'bg-slate-900/80' : 'bg-white/90';

  const handleLogout = () => {
    logout();
    navigate('/services');
  };

  // Dynamic page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard';
    if (path.includes('packages')) return 'Packages';
    if (path.includes('calendar')) return 'Calendar';
    if (path.includes('chat')) return 'Chat';
    if (path.includes('analytics')) return 'Analytics';
    if (path.includes('customers')) return 'Customers';
    if (path.includes('settings')) return 'Settings';
    if (path.includes('help')) return 'Help';
    return 'Dashboard';
  };

  return (
    <div className={`min-h-[100dvh] ${bg} ${textColor} font-['Plus_Jakarta_Sans',_sans-serif] flex transition-colors duration-500`}>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className={`w-[80%] max-w-xs h-full flex flex-col px-6 py-10 shadow-2xl ${adaptiveSidebarBg}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-xl font-black text-indigo-400 tracking-tight">Secret<span className="text-white">Corner</span></h1>
              <button onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* All Menu Items */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-3 text-slate-500">Main Menu</p>
              {allMenuItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 rounded-[18px] transition-all font-bold text-[14px] ${
                      isActive && item.to !== '#'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Logout */}
            <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-indigo-900'}`}>
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-[18px] font-bold text-[14px] mb-3 transition-all ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[18px] font-bold text-[14px] text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col w-[280px] ${adaptiveSidebarBg} h-screen sticky top-0 px-8 py-10 border-r ${isDarkMode ? 'border-slate-800' : 'border-indigo-900'} shadow-2xl transition-colors duration-300`}>
        <div className="flex items-center gap-3 mb-12">
          <h1 className="text-2xl font-black text-indigo-400 tracking-tight">Secret<span className="text-white">Corner</span></h1>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none space-y-10">
          <div>
            <p className={`text-[11px] font-black uppercase tracking-[0.2em] mb-6 px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Main Menu</p>
            <nav className="space-y-3">
              {allMenuItems.slice(0, 6).map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-3.5 rounded-[20px] transition-all font-bold text-[14px] ${
                      isActive && item.to !== '#'
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                        : `${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`
                    }`
                  }
                >
                  <item.icon size={22} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className={`text-[11px] font-black uppercase tracking-[0.2em] mb-6 px-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Preferences</p>
            <nav className="space-y-3">
              {allMenuItems.slice(6).map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-[20px] transition-all font-bold text-[14px] ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <item.icon size={22} className="opacity-40" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-[20px] border transition-all ${
              isDarkMode
                ? 'bg-slate-800/40 border-slate-800 text-slate-300 hover:text-yellow-400'
                : 'bg-indigo-900/40 border-indigo-800 text-indigo-300 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span className="text-[13px] font-bold">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div className={`w-8 h-4 rounded-full relative transition-all ${isDarkMode ? 'bg-slate-700' : 'bg-indigo-700'}`}>
               <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
            </div>
          </button>

          <div className={`bg-slate-800/40 border ${isDarkMode ? 'border-slate-800' : 'border-indigo-800'} rounded-[24px] p-5 flex items-center gap-4 relative group transition-all`}>
            <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white leading-none truncate">Admin</p>
              <p className="text-[11px] text-indigo-400 font-bold tracking-widest mt-1.5 uppercase">Superuser</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all active:scale-90"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Mobile Header */}
        <div className={`lg:hidden sticky top-0 z-40 ${headerBg} backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} px-4 py-4 flex items-center justify-between shadow-sm transition-all`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDrawerOpen(true)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              <Menu size={20} />
            </button>
            <h1 className={`text-[18px] font-black ${isDarkMode ? 'text-white' : 'text-slate-800'} tracking-tight`}>{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-50 border-slate-200 text-indigo-600'}`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-black border-2 border-white z-10">!</div>
              <button className={`p-2 rounded-xl ${isDarkMode ? 'text-white bg-slate-800' : 'text-slate-800 bg-slate-50'}`}>
                 <Bell size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Main View */}
        <main className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'} transition-colors duration-500`}>
          <div className="p-4 lg:p-0">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
