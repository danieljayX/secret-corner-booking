import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Martini, ChevronRight, Sun, Moon, Sparkles, Star, ShieldCheck } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function Landing() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <PageShell className={`flex flex-col px-8 py-10 animate-in fade-in duration-700 relative font-['Inter',sans-serif] ${bg} ${headingColor}`}>
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/20 via-purple-500/10 to-transparent blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/20 via-pink-500/10 to-transparent blur-[120px] pointer-events-none rounded-full"></div>

      {/* Top Header Area */}
      <div className="flex items-center justify-between mb-12 relative z-20">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-500 shadow-xl ${isDarkMode ? 'bg-black/80 border-white/10 shadow-pink-500/10' : 'bg-white/90 border-pink-100 shadow-pink-500/5'}`}>
            <Martini size={24} className="text-pink-500 animate-pulse" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-[14px] font-black uppercase tracking-[0.2em] leading-none mb-1 bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent">Secret Corner</h2>
            <p className={`text-[9px] font-black uppercase tracking-[0.25em] ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Elite Hospitality</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className={`w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-white/80 border-pink-100 text-indigo-600 hover:bg-white'}`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col justify-center relative z-20 max-w-lg my-auto pb-12 pt-4">
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 backdrop-blur-md shadow-sm w-fit transition-all duration-300 hover:border-pink-500/40 bg-white/50 dark:bg-white/5 border-pink-500/20 dark:border-pink-500/30">
          <Sparkles size={14} className="text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-pink-600 dark:text-pink-400">Premium Event Management</span>
        </div>

        {/* Headline */}
        <h1 className="text-[48px] sm:text-[60px] font-black leading-[1.05] tracking-tight mb-6">
          Event<br/>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent italic pr-2 drop-shadow-sm">Service</span><br/>
          Booking.
        </h1>

        {/* High-End Copywriting */}
        <p className={`text-[15px] sm:text-[16px] leading-relaxed font-medium mb-10 pr-4 transition-colors ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
          Elevate your celebration with elite mobile bar experiences, artisan coffee bars, and gourmet pica-pica stations. <strong className={`font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>We accept only 1 exclusive booking per day</strong> to guarantee flawless, world-class service for your guests.
        </p>

        {/* Breathtaking CTA Button */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate('/services')} 
            className="group relative inline-flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_50px_rgba(236,72,153,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden w-fit"
          >
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10 drop-shadow-md">EXPLORE SERVICES</span>
            <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ChevronRight size={18} strokeWidth={3} />
            </div>
          </button>

          {/* Trust Indicators */}
          <div className={`flex items-center gap-6 pt-6 border-t ${isDarkMode ? 'border-white/10 text-white/50' : 'border-gray-200 text-gray-500'}`}>
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Star size={14} className="text-yellow-500" fill="currentColor" />
              <span>5.0 Rated</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Exclusive</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
