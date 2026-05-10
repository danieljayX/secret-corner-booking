import { Home, Calendar, ClipboardList } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function Navbar() {
  const { myBookings } = useContext(BookingContext);
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/booking", icon: Calendar, label: "Book" },
    { to: "/tickets", icon: ClipboardList, label: "Tickets", badge: myBookings.length },
  ];

  return (
    <nav className="h-20 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 relative z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive: linkActive }) => 
              `flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group ${
                linkActive || isActive ? 'text-violet-400' : 'text-gray-600 hover:text-gray-400'
              }`
            }
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isActive ? 'bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'group-hover:bg-white/5'
            }`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            
            {item.badge > 0 && (
              <span className="absolute top-1 right-1 bg-cyan-500 text-[8px] font-black text-black px-1.5 py-0.5 rounded-full min-w-[16px] text-center border-2 border-[#050505]">
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
