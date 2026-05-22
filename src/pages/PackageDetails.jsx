import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages, setCurrentBooking } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);

  const pkg = packages.find(p => p.id === id);

  if (!pkg) return (
    <div className={`min-h-screen flex items-center justify-center p-10 text-center ${isDarkMode ? 'bg-[#030014] text-white' : 'bg-[#F5F3FF] text-gray-900'}`}>
      <div>
        <p className={`mb-4 uppercase tracking-widest font-black ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Package Not Found</p>
        <button onClick={() => navigate('/services')} className={`${isDarkMode ? 'text-violet-400' : 'text-indigo-600'} font-black`}>Back to Home</button>
      </div>
    </div>
  );

  const handleSelect = () => {
    setCurrentBooking({
      packageId: pkg.id,
      packageName: pkg.name,
      packagePrice: pkg.price,
      category: pkg.category
    });
    navigate('/booking');
  };

  // Fallback colors
  const colorClass = pkg.colorClass || 'text-white';
  const bgClass = pkg.bgClass || 'bg-violet-500/20';

  // Theme-aware styles
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const headerBg = isDarkMode ? 'bg-[#030014]/90' : 'bg-white/80';
  const sectionLabel = isDarkMode ? 'text-gray-600' : 'text-gray-400';

  return (
    <div className={`w-full min-h-full ${bg} pb-16 font-['Inter'] transition-colors duration-300 flex-shrink-0 ${textColor}`}>
      {/* Header */}
      <div className={`px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 ${headerBg} backdrop-blur-xl z-30 border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
        <button 
          onClick={() => navigate(-1)} 
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50'}`}
        >
          <ChevronLeft size={20} />
        </button>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Service Details</span>
        <div className="w-10"></div>
      </div>

      <div className="px-5 py-4 space-y-6">
        {/* Package Title Card */}
        <div className={`relative overflow-hidden rounded-[2rem] p-8 text-center transition-all duration-300 border ${isDarkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-lg'}`}>
          {/* Background Glow */}
          <div className={`absolute -right-10 -top-10 w-40 h-40 ${bgClass.replace('/10', '/30')} blur-[60px] rounded-full ${isDarkMode ? 'opacity-40' : 'opacity-20'}`}></div>
          <div className={`absolute -left-10 -bottom-10 w-40 h-40 ${bgClass.replace('/10', '/30')} blur-[60px] rounded-full ${isDarkMode ? 'opacity-40' : 'opacity-20'}`}></div>
          
          <div className="relative z-10 space-y-3">
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border mb-1 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
              <Star size={10} className="text-yellow-400" fill="currentColor" />
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium Choice</span>
            </div>
            <h1 className={`text-3xl font-black ${colorClass} uppercase italic tracking-widest leading-none ${isDarkMode ? 'drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]' : ''}`}>
              {pkg.name}
            </h1>
            <p className={`inline-flex items-baseline gap-1.5 tabular-nums tracking-normal ${textColor}`}>
              <span className="text-lg font-black shrink-0 leading-none">₱</span>
              <span className="text-2xl font-black leading-none">{pkg.price.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ml-4 ${sectionLabel}`}>What's Included</p>
          <div className={`rounded-[2rem] p-6 space-y-4 border transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all shrink-0 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'} ${colorClass}`}>
                  <CheckCircle2 size={16} />
                </div>
                <span className={`text-xs font-black uppercase tracking-widest leading-snug ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusive Badge */}
        <div className={`rounded-2xl p-5 flex items-start gap-4 border transition-all ${isDarkMode ? 'bg-violet-600/10 border-violet-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-violet-500/20' : 'bg-white shadow-sm border border-indigo-50'}`}>
            <ShieldCheck className={isDarkMode ? 'text-violet-400' : 'text-indigo-600'} size={18} />
          </div>
          <div>
            <h4 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-violet-400' : 'text-indigo-600'}`}>Exclusive Slot</h4>
            <p className={`text-[10px] leading-relaxed font-bold uppercase tracking-widest opacity-80 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Only 1 exclusive booking per day for quality assurance.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSelect}
          className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_30px_rgba(139,92,246,0.4)]' : 'bg-indigo-600 shadow-[0_8px_30px_rgba(79,70,229,0.2)]'} text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-[1.8rem] hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95 mt-2 group`}
        >
          <span className="drop-shadow-lg">RESERVE PACKAGE</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
