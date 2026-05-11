import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { Martini, Coffee, UtensilsCrossed, ChevronRight, Sparkles, Sun, Moon } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { packages } = useContext(BookingContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'mobile_bar',
      title: 'MOBILE BAR',
      subtitle: 'Cocktails & Mocktails',
      icon: Martini,
      iconColor: 'text-cyan-400',
      iconColorLight: 'text-cyan-600',
      iconBgDark: 'bg-cyan-950/50',
      iconBgLight: 'bg-cyan-50',
      accentLight: 'border-cyan-200',
      bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'coffee_bar',
      title: 'COFFEE BAR',
      subtitle: 'Premium Brews',
      icon: Coffee,
      iconColor: 'text-orange-400',
      iconColorLight: 'text-orange-500',
      iconBgDark: 'bg-orange-950/50',
      iconBgLight: 'bg-orange-50',
      accentLight: 'border-orange-200',
      bgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pica_pica',
      title: 'PICA PICA',
      subtitle: 'Night Bites',
      icon: UtensilsCrossed,
      iconColor: 'text-rose-400',
      iconColorLight: 'text-rose-500',
      iconBgDark: 'bg-rose-950/50',
      iconBgLight: 'bg-rose-50',
      accentLight: 'border-rose-200',
      bgImage: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800'
    },
  ];

  const getActivePackages = () => {
    return packages.filter(pkg => !selectedCategory || pkg.category === selectedCategory);
  };

  // Theme-aware class helpers
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const cardBg = isDarkMode ? 'bg-[#0a0a0f]' : 'bg-white';
  const cardBorder = isDarkMode ? 'border-white/5' : 'border-gray-200';
  const headingColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-white/60' : 'text-gray-500';
  const sectionLabel = isDarkMode ? 'text-white' : 'text-gray-800';
  const backBtnBg = isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 shadow-sm';

  return (
    <div className={`flex flex-col min-h-screen pb-24 font-['Inter',sans-serif] transition-all duration-300 ${bg} ${headingColor}`}>

      {!selectedCategory ? (
        <div className="animate-in fade-in duration-700">

          {/* Header Section */}
          <div className="px-8 pt-12 pb-10 flex flex-col items-center relative">

            {/* Theme Toggle */}
            <div className="absolute top-8 right-8">
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
                  ${isDarkMode
                    ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10'
                    : 'bg-white border-gray-200 text-indigo-500 hover:bg-indigo-50 shadow-sm'}`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Logo Circle */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border transition-all duration-300
              ${isDarkMode
                ? 'bg-black shadow-[0_0_40px_rgba(236,72,153,0.3)] border-white/5'
                : 'bg-white shadow-[0_8px_30px_rgba(236,72,153,0.2)] border-pink-100'}`}>
              <Martini size={36} className="text-pink-500" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h1 className={`text-[42px] font-black tracking-wider leading-none text-center transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              SECRET<br />
              <span className={isDarkMode ? 'text-white/90' : 'text-gray-700'}>CORNER</span>
            </h1>

            {/* Events Tag */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-500"></div>
              <span className="text-[12px] font-black text-pink-500 tracking-[0.4em] uppercase">Events</span>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>

            {/* Capsule Tagline */}
            <div className={`mt-10 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg border transition-all duration-300
              ${isDarkMode
                ? 'bg-[#1a1a1a] border-white/10'
                : 'bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'}`}>
              <Sparkles size={16} className="text-yellow-500" />
              <span className={`text-[12px] font-bold ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Your Event. Our Perfect Setup.
              </span>
            </div>
          </div>

          {/* Services Section */}
          <div className="px-6 space-y-6">
            <h2 className={`text-xl font-black ml-2 tracking-tight ${sectionLabel}`}>Our Services</h2>

            <div className="space-y-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full group relative overflow-hidden rounded-[2.5rem] h-44 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-xl border
                    ${isDarkMode
                      ? 'bg-black border-white/5'
                      : `bg-white ${cat.accentLight} shadow-[0_8px_30px_rgba(0,0,0,0.1)]`}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={cat.bgImage}
                      className={`w-full h-full object-cover transition-opacity duration-300
                        ${isDarkMode
                          ? 'opacity-40 group-hover:opacity-50'
                          : 'opacity-20 group-hover:opacity-30'}`}
                      alt={cat.title}
                    />
                    <div className={`absolute inset-0 
                      ${isDarkMode
                        ? 'bg-gradient-to-t from-black via-black/40 to-transparent'
                        : 'bg-gradient-to-t from-white/90 via-white/50 to-transparent'}`}>
                    </div>
                    {/* Neon/Soft Circle Effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className={`w-32 h-32 rounded-full border-2 blur-sm
                        ${isDarkMode ? cat.iconColor.replace('text', 'border') : cat.accentLight}`}>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-300
                      ${isDarkMode
                        ? `${cat.iconBgDark} ${cat.iconColor} border-white/10`
                        : `${cat.iconBgLight} ${cat.iconColorLight} ${cat.accentLight}`}`}>
                      <cat.icon size={28} />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-2xl font-black uppercase tracking-[0.05em] leading-none mb-1.5 italic
                        ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {cat.title}
                      </h3>
                      <p className={`text-[13px] font-semibold ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {cat.subtitle}
                      </p>
                    </div>
                    <div className={`ml-auto w-10 h-10 rounded-full border flex items-center justify-center transition-all
                      ${isDarkMode
                        ? 'bg-white/10 border-white/20 text-white/80 group-hover:bg-white/20'
                        : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:bg-pink-50 group-hover:border-pink-200 group-hover:text-pink-500'}`}>
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      ) : (
        /* Package Listing View */
        <div className="px-6 pt-12 animate-in slide-in-from-right duration-500">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`mb-8 flex items-center gap-3 group transition-colors ${backBtnBg}`}
          >
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${backBtnBg}`}>
              <ChevronRight size={20} className="rotate-180" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">Back to Services</span>
          </button>

          <h2 className={`text-2xl font-black uppercase italic tracking-widest mb-8 px-2 ${headingColor}`}>
            {categories.find(c => c.id === selectedCategory)?.title} Packages
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {getActivePackages().map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className={`group relative rounded-[3rem] p-10 transition-all duration-300 cursor-pointer shadow-xl overflow-hidden border
                  ${isDarkMode
                    ? 'bg-[#0a0a0f] border-white/5 hover:bg-white/5'
                    : 'bg-white border-gray-100 hover:border-pink-100 hover:shadow-[0_8px_40px_rgba(236,72,153,0.12)]'}`}
              >
                {/* Glow / Accent Blob */}
                <div className={`absolute -right-20 -top-20 w-60 h-60 ${pkg.bgClass} blur-[100px] ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className={`text-2xl font-black ${pkg.colorClass} uppercase italic tracking-widest leading-none mb-2`}>
                        {pkg.name}
                      </h3>
                      <p className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₱{pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <div className={`w-14 h-14 rounded-[1.5rem] border flex items-center justify-center transition-all
                      ${isDarkMode
                        ? 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-pink-50 group-hover:border-pink-200 group-hover:text-pink-500'}`}>
                      <ChevronRight size={24} />
                    </div>
                  </div>

                  <div className={`space-y-4 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${pkg.bgClass.replace('/10', '')} shadow-[0_0_10px_currentColor]`}></div>
                        <span className={`text-[12px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
    </div>
  );
}
