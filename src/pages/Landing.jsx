import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Martini, ChevronRight, Sun, Moon, Layers, Volume2 } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const playGreeting = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const hour = new Date().getHours();
      let greetingText = "Good morning, Ma'am and Sir! Welcome to Secret Corner.";
      if (hour >= 12 && hour < 18) {
        greetingText = "Good afternoon, Ma'am and Sir! Welcome to Secret Corner.";
      } else if (hour >= 18) {
        greetingText = "Good evening, Ma'am and Sir! Welcome to Secret Corner.";
      }

      const utterance = new SpeechSynthesisUtterance(greetingText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Attempt to play greeting on mount (may be blocked by browser autoplay policy until user interaction)
    const timer = setTimeout(() => {
      playGreeting();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`flex flex-col h-screen px-8 py-12 animate-in fade-in duration-700 relative font-['Inter',sans-serif] ${bg} ${headingColor}`}>
      {/* Top Logo Area */}
      <div className="flex items-center gap-3 mb-12">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-pink-100'} shadow-lg`}>
          <Martini size={24} className="text-pink-500" />
        </div>
        <div>
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] leading-none mb-1">Secret Corner</h2>
          <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Event Management</p>
        </div>
      </div>

      {/* Top Right Controls: Greeting Toggle & Theme Toggle */}
      <div className="absolute top-12 right-8 flex items-center gap-3 z-50">
        <button 
          onClick={playGreeting} 
          className={`h-10 px-4 rounded-full flex items-center gap-2 transition-all shadow-lg ${isDarkMode ? 'bg-[#1a1a24] border border-white/5 text-pink-400 hover:text-pink-300' : 'bg-white border border-pink-100 text-pink-500 hover:text-pink-600'}`}
          title="Play Voice Greeting"
        >
          <Volume2 size={18} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Play Greeting</span>
        </button>

        <button 
          onClick={toggleTheme} 
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${isDarkMode ? 'bg-[#1a1a24] border border-white/5 text-white/60 hover:text-white' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col justify-center pb-20">
        <h1 className="text-[48px] font-black leading-[1.05] tracking-tight mb-6">
          Event<br/>Service<br/>Booking
        </h1>
        <p className={`text-[15px] leading-relaxed font-medium mb-10 pr-4 ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
          Our platform provides the perfect scheduling solution for your event needs. Book mobile bars, coffee carts, and pica-pica stations instantly.
        </p>

        <button onClick={() => navigate('/services')} className="w-fit bg-[#3b82f6] text-white px-8 py-4 rounded-full font-bold text-[17px] flex items-center gap-3 hover:bg-blue-600 transition-all active:scale-95 shadow-[0_8px_30px_rgba(59,130,246,0.3)]">
          Get Started <ChevronRight size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Bottom Feature */}
      <div className={`mt-auto pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} pb-4`}>
        <div className="flex items-start gap-4">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-[#1a1a24]' : 'bg-gray-100'}`}>
             <Layers size={20} className={isDarkMode ? 'text-white/80' : 'text-gray-600'} />
           </div>
           <div className="pt-1">
             <h3 className="text-[15px] font-bold mb-1">Organized Requests</h3>
             <p className={`text-[13px] font-medium ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Manage all event bookings in one place.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
