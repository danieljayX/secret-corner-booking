import { Outlet, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut, 
  Package, 
  Calendar as CalendarIcon, 
  ShieldCheck,
  MessageSquare,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  MoreVertical,
  Bell,
  User
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AdminLayout() {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAdmin) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainMenu = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/packages', icon: Package, label: 'Packages' },
    { to: '/admin/calendar', icon: CalendarIcon, label: 'Calendar' },
    { to: '#', icon: MessageSquare, label: 'Chat' },
    { to: '#', icon: BarChart2, label: 'Analytics' },
    { to: '#', icon: Users, label: 'Customers' },
  ];

  const preferences = [
    { to: '#', icon: Settings, label: 'Settings' },
    { to: '#', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-800 font-['Inter',sans-serif] flex">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-slate-900 h-screen sticky top-0 px-8 py-10 border-r border-slate-800 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <h1 className="text-2xl font-black text-indigo-400 tracking-tight">Secret<span className="text-white">Corner</span></h1>
        </div>

        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto scrollbar-none space-y-10">
          <div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-4">Main Menu</p>
            <nav className="space-y-3">
              {mainMenu.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-5 py-3.5 rounded-[20px] transition-all font-bold text-[14px] ${
                      isActive && item.to !== '#'
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon size={22} className={item.to === '#' ? 'opacity-40' : ''} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-4">Preferences</p>
            <nav className="space-y-3">
              {preferences.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-[20px] transition-all font-bold text-[14px] text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <item.icon size={22} className="opacity-40" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mt-8 bg-slate-800/40 border border-slate-800 rounded-[24px] p-5 flex items-center gap-4 relative group">
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
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
             <button className="text-slate-800 flex flex-col gap-1.5">
               <div className="w-6 h-[2.5px] bg-slate-800 rounded-full"></div>
               <div className="w-4 h-[2.5px] bg-slate-800 rounded-full"></div>
               <div className="w-6 h-[2.5px] bg-slate-800 rounded-full"></div>
             </button>
             <h1 className="text-[20px] font-black text-slate-800 tracking-tight">Dashboard</h1>
          </div>
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-black border-2 border-white z-10">3</div>
            <button className="text-slate-800 p-1 bg-slate-50 rounded-xl">
               <Bell size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] px-4 pb-2">
          <nav className="flex items-center justify-around py-3">
            {[
              { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
              { to: '/admin/packages', icon: Package, label: 'Bookings' },
              { to: '/admin/calendar', icon: CalendarIcon, label: 'Calendar' },
              { to: '/admin/profile', icon: User, label: 'Profile' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1.5 px-6 py-2 rounded-[24px] transition-all duration-300 ${
                    isActive ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' : 'text-slate-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
