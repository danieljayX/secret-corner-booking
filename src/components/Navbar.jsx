import { Home, Calendar, ClipboardList } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const { myBookings } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home", activeColorDark: 'text-pink-500', activeColorLight: 'text-pink-600' },
    { to: "/booking", icon: Calendar, label: "Book", badge: 1, activeColorDark: 'text-cyan-400', activeColorLight: 'text-indigo-600' },
    { to: "/tickets", icon: ClipboardList, label: "Tickets", activeColorDark: 'text-white', activeColorLight: 'text-gray-900' },
  ];

  const navBg = isDarkMode ? 'bg-black border-white/5' : 'bg-white border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]';
  const labelColor = isDarkMode ? 'text-gray-700' : 'text-gray-400';

  return (
    <nav className={`h-20 ${navBg} border-t flex items-center justify-around px-4 relative z-50 transition-all duration-300`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isExact = location.pathname === item.to;
        const isActive = isExact || (item.to !== '/' && location.pathname.startsWith(item.to));
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group"
          >
            <div className={`p-2 transition-all duration-300 ${
              isActive 
                ? (isDarkMode ? item.activeColorDark : item.activeColorLight) 
                : (isDarkMode ? 'text-gray-600' : 'text-gray-300')
            }`}>
              <Icon size={26} strokeWidth={2.5} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 ${
              isActive ? 'opacity-100' : `opacity-40 ${labelColor}`
            }`}>
              {item.label}
            </span>
            
            {item.badge > 0 && (
              <span className={`absolute top-1 right-2 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 animate-pulse shadow-lg
                ${isDarkMode 
                  ? 'bg-cyan-400 text-black border-black shadow-cyan-400/50' 
                  : 'bg-indigo-600 text-white border-white shadow-indigo-600/30'}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
