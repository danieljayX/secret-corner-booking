import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { Martini, Coffee, UtensilsCrossed, ChevronRight, Sparkles, Sun, Moon, Star } from 'lucide-react';
import PageShell from '../components/PageShell';

export default function Home() {
  const navigate = useNavigate();
  const { packages } = useContext(BookingContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'mobile_bar',
      title: 'MOBILE BAR',
      subtitle: 'Premium Cocktails & Mocktails',
      icon: Martini,
      iconColor: 'text-cyan-400',
      iconColorLight: 'text-cyan-600',
      iconBgDark: 'bg-cyan-950/40',
      iconBgLight: 'bg-cyan-50/80',
      accentLight: 'border-cyan-100',
      accentDark: 'border-cyan-500/20'
    },
    {
      id: 'coffee_bar',
      title: 'COFFEE BAR',
      subtitle: 'Artisan Espresso & Brews',
      icon: Coffee,
      iconColor: 'text-orange-400',
      iconColorLight: 'text-orange-600',
      iconBgDark: 'bg-orange-950/40',
      iconBgLight: 'bg-orange-50/80',
      accentLight: 'border-orange-100',
      accentDark: 'border-orange-500/20'
    },
    {
      id: 'pica_pica',
      title: 'PICA PICA',
      subtitle: 'Gourmet Grazing & Night Bites',
      icon: UtensilsCrossed,
      iconColor: 'text-rose-400',
      iconColorLight: 'text-rose-600',
      iconBgDark: 'bg-rose-950/40',
      iconBgLight: 'bg-rose-50/80',
      accentLight: 'border-rose-100',
      accentDark: 'border-rose-500/20'
    },
  ];

  const getActivePackages = () => {
    return packages.filter(pkg => !selectedCategory || pkg.category === selectedCategory);
  };

  // Theme-aware class helpers
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const sectionLabel = isDarkMode ? 'text-white' : 'text-gray-900';

  const formatPrice = (price) => (
    <span className="inline-flex items-baseline gap-1.5 tabular-nums tracking-normal">
      <span className="text-lg font-black shrink-0 leading-none">₱</span>
      <span className="text-2xl font-black leading-none">{price.toLocaleString()}</span>
    </span>
  );

  return (
    <PageShell className={`font-['Inter',sans-serif] transition-all duration-300 relative ${bg} ${headingColor} ${selectedCategory ? 'pb-16' : 'pb-12'}`}>
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-transparent blur-[100px] pointer-events-none rounded-full -z-0"></div>

      {!selectedCategory ? (
        <div className="animate-in fade-in duration-700 max-w-lg mx-auto w-full">

          {/* Header Section */}
          <div className="px-6 pt-10 pb-8 flex flex-col items-center relative z-20">
            {/* Theme Toggle */}
            <div className="absolute top-6 right-6">
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95
                  ${isDarkMode
                    ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10'
                    : 'bg-white/80 border-pink-100 text-indigo-600 hover:bg-white'}`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Premium Logo Circle */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border backdrop-blur-md transition-all duration-500 shadow-xl
              ${isDarkMode
                ? 'bg-black/80 shadow-[0_0_30px_rgba(236,72,153,0.2)] border-white/10'
                : 'bg-white/90 shadow-[0_10px_25px_rgba(236,72,153,0.1)] border-pink-100'}`}>
              <Martini size={30} className="text-pink-500 animate-pulse" strokeWidth={1.8} />
            </div>

            {/* Title */}
            <h1 className={`text-3xl font-black tracking-tight leading-none text-center mb-2 transition-colors duration-300 ${headingColor}`}>
              SECRET CORNER
            </h1>

            {/* Subtitle */}
            <p className={`text-[11px] font-black tracking-[0.3em] uppercase bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent mb-6`}>
              Curated Event Services
            </p>

            {/* Capsule Tagline */}
            <div className={`px-5 py-2.5 rounded-full flex items-center gap-2.5 border backdrop-blur-md transition-all duration-300 shadow-sm
              ${isDarkMode
                ? 'bg-white/5 border-white/10 text-white/80'
                : 'bg-white/80 border-pink-100 text-gray-700 shadow-[0_4px_20px_rgba(236,72,153,0.06)]'}`}>
              <Sparkles size={14} className="text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold tracking-wide">
                Your Event. Our Perfect Setup.
              </span>
            </div>
          </div>

          {/* Services Section */}
          <div className="px-6 space-y-4 relative z-20">
            <div className="flex items-center justify-between mb-2 ml-1">
              <h2 className={`text-base font-black tracking-tight ${sectionLabel}`}>Select a Service</h2>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>3 Categories</span>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full group flex items-center gap-5 p-5 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-lg text-left overflow-hidden
                    ${isDarkMode
                      ? `bg-[#0a0a10]/90 border-white/10 hover:border-pink-500/40 hover:shadow-[0_15px_30px_rgba(236,72,153,0.15)]`
                      : `bg-white/90 border-pink-100 hover:border-pink-300 hover:shadow-[0_15px_35px_rgba(236,72,153,0.15)]`}`}
                >
                  {/* Premium Glow Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shrink-0 shadow-md group-hover:scale-105
                    ${isDarkMode
                      ? `${cat.iconBgDark} ${cat.iconColor} ${cat.accentDark}`
                      : `${cat.iconBgLight} ${cat.iconColorLight} ${cat.accentLight}`}`}>
                    <cat.icon size={26} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className={`text-lg font-black uppercase tracking-[0.08em] leading-tight mb-1 transition-colors duration-300 group-hover:text-pink-500
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {cat.title}
                    </h3>
                    <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Premium Navigation Arrow */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white group-hover:shadow-[0_4px_15px_rgba(236,72,153,0.4)]
                    ${isDarkMode
                      ? 'bg-white/5 border-white/10 text-white/60'
                      : 'bg-pink-50/50 border-pink-100 text-pink-500'}`}>
                    <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="px-6 pt-10 pb-10 space-y-4 relative z-20">
            <div className="flex items-center justify-between ml-1">
              <h2 className={`text-base font-black tracking-tight ${sectionLabel}`}>📸 Curated Gallery</h2>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`}>Recent Events</span>
            </div>

            {/* Elegant Grid Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { url: '/work1.jpg', tall: true },
                { url: '/work2.jpg', tall: true },
                { url: '/mobile-bar.png', tall: false },
                { url: '/coffee.png', tall: false },
                { url: '/pica-pica.png', tall: true },
                { url: '/work2.jpg', tall: false },
                { url: '/work1.jpg', tall: true },
                { url: '/coffee.png', tall: false },
              ].map((photo, i) => (
                <div
                  key={i}
                  className={`rounded-[1.5rem] overflow-hidden border shadow-sm group cursor-pointer ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-white'} ${photo.tall ? 'row-span-2' : ''}`}
                  style={{ height: photo.tall ? '190px' : '90px' }}
                >
                  <img
                    src={photo.url}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (
        /* Package Listing View */
        <div className="px-6 pt-10 pb-20 animate-in slide-in-from-right duration-500 max-w-lg mx-auto w-full relative z-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`mb-8 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group
              ${isDarkMode 
                ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
                : 'bg-white/80 border-pink-100 text-gray-700 hover:bg-white hover:text-pink-600 hover:border-pink-200 shadow-[0_4px_20px_rgba(236,72,153,0.08)]'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1
              ${isDarkMode 
                ? 'bg-white/10 text-white' 
                : 'bg-pink-50 text-pink-500'}`}>
              <ChevronRight size={16} className="rotate-180" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] pr-1">Back to Services</span>
          </button>

          <div className="flex flex-col gap-3 mb-6 px-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className={`text-lg font-black uppercase tracking-wide leading-tight ${headingColor}`}>
              {categories.find(c => c.id === selectedCategory)?.title} Packages
            </h2>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border w-fit shrink-0 ${isDarkMode ? 'bg-white/5 border-white/10 text-pink-400' : 'bg-pink-50 border-pink-100 text-pink-600'}`}>
              Premium Selection
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {getActivePackages().map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className={`group relative rounded-[2rem] p-5 transition-all duration-500 cursor-pointer shadow-xl border backdrop-blur-xl
                  ${isDarkMode
                    ? 'bg-[#0a0a10]/90 border-white/10 hover:border-pink-500/40 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]'
                    : 'bg-white/90 border-pink-100 hover:border-pink-300 hover:shadow-[0_20px_45px_rgba(236,72,153,0.15)]'}`}
              >
                {/* Background Accent Glow */}
                <div className={`absolute -right-16 -top-16 w-48 h-48 ${pkg.bgClass} blur-[80px] ${isDarkMode ? 'opacity-25' : 'opacity-15'} transition-opacity duration-500 group-hover:opacity-40`}></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star size={12} className="text-yellow-500" fill="currentColor" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500">Top Tier</span>
                      </div>
                      <h3 className={`text-xl font-black ${pkg.colorClass} uppercase tracking-widest leading-none mb-2`}>
                        {pkg.name}
                      </h3>
                      <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                        {formatPrice(pkg.price)}
                      </p>
                    </div>
                    
                    <div className={`w-12 h-12 rounded-[1.4rem] border flex items-center justify-center transition-all duration-300 shadow-sm group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:text-white group-hover:shadow-[0_4px_20px_rgba(236,72,153,0.4)]
                      ${isDarkMode
                        ? 'bg-white/5 border-white/10 text-gray-400'
                        : 'bg-pink-50/50 border-pink-100 text-pink-500'}`}>
                      <ChevronRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <div className={`space-y-2.5 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3.5">
                        <div className={`w-2 h-2 rounded-full ${pkg.bgClass.replace('/10', '')}`}></div>
                        <span className={`text-xs font-bold tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
