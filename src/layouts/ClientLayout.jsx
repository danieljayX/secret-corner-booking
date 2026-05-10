import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ClientLayout() {
  return (
    <div className="bg-[#030014] h-[100dvh] w-full text-white flex justify-center font-['Outfit'] overflow-hidden">
      {/* Main Mobile Container */}
      <div className="w-full max-w-[420px] h-full flex flex-col bg-[#030014] shadow-2xl shadow-violet-900/20 relative border-x border-white/5 transition-all">
        
        {/* Premium Ambient Glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[100px] right-[-150px] w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Top Decorative Glow Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>

        {/* Scrollable Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto flex flex-col scroll-smooth">
          <Outlet />
        </div>
        
        {/* Fixed Navbar at the bottom */}
        <Navbar />
      </div>
    </div>
  );
}
