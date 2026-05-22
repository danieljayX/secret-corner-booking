import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ClientLayout() {
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const containerBg = isDarkMode ? 'bg-[#030014]' : 'bg-white';
  const containerBorder = isDarkMode ? 'border-white/5' : 'border-gray-100';
  const shadow = isDarkMode ? 'shadow-violet-900/20' : 'shadow-indigo-500/10';

  const isLanding = location.pathname === '/';
  
  return (
    <div className={`${bg} h-[100dvh] w-full ${isDarkMode ? 'text-white' : 'text-gray-900'} flex justify-center font-['Inter'] overflow-hidden transition-colors duration-300`}>
      {/* Main Mobile Container */}
      <div className={`w-full max-w-[420px] h-full flex flex-col ${containerBg} shadow-2xl ${shadow} relative border-x ${containerBorder} transition-all duration-300`}>
        
        {/* Premium Ambient Glows */}
        <div className={`absolute top-[-100px] left-[-100px] w-[400px] h-[400px] ${isDarkMode ? 'bg-violet-600/10' : 'bg-indigo-500/5'} blur-[120px] rounded-full pointer-events-none`}></div>
        <div className={`absolute bottom-[100px] right-[-150px] w-[350px] h-[350px] ${isDarkMode ? 'bg-cyan-500/10' : 'bg-pink-500/5'} blur-[100px] rounded-full pointer-events-none`}></div>
        
        {/* Top Decorative Glow Bar */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${isDarkMode ? 'via-violet-500' : 'via-indigo-400'} to-transparent opacity-50`}></div>

        {/* Scrollable Content Area — block flow so pages are not flex-shrunk/clipped */}
        <main className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-smooth overscroll-y-contain [-webkit-overflow-scrolling:touch]">
          <Outlet />
        </main>

        {/* Bottom navigation */}
        {!isLanding && <Navbar className="shrink-0" />}
      </div>
    </div>
  );
}
