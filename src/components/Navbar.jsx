import { Home, Calendar, ClipboardList } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function Navbar() {
  const { myBookings } = useContext(BookingContext);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home", activeColor: 'text-pink-500' },
    { to: "/booking", icon: Calendar, label: "Book", badge: 1, activeColor: 'text-cyan-400' },
    { to: "/tickets", icon: ClipboardList, label: "Tickets", activeColor: 'text-white' },
  ];

  return (
    <nav className="h-20 bg-black border-t border-white/5 flex items-center justify-around px-4 relative z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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
              isActive ? item.activeColor : 'text-gray-600'
            }`}>
              <Icon size={26} strokeWidth={2.5} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-40 text-gray-700'}`}>
              {item.label}
            </span>
            
            {item.badge > 0 && (
              <span className="absolute top-1 right-2 bg-cyan-400 text-[10px] font-black text-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-black animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
