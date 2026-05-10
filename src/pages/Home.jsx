import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { Martini, Coffee, UtensilsCrossed, ChevronRight, Sparkles, Search } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { packages } = useContext(BookingContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'mobile_bar',
      title: 'Mobile Bar',
      icon: Martini,
      desc: 'Neon Cocktails & Party Vibes',
      color: 'text-violet-400',
      glow: 'shadow-violet-500/20',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20'
    },
    {
      id: 'coffee_bar',
      title: 'Coffee Bar',
      icon: Coffee,
      desc: 'Future Brews & Tech Cafe',
      color: 'text-cyan-400',
      glow: 'shadow-cyan-500/20',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20'
    },
    {
      id: 'pica_pica',
      title: 'Pica Pica',
      icon: UtensilsCrossed,
      desc: 'Night Bites & Party Platters',
      color: 'text-rose-400',
      glow: 'shadow-rose-500/20',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
  ];

  const getActivePackages = () => {
    return packages.filter(pkg => {
      const matchesCategory = !selectedCategory || pkg.category === selectedCategory;
      const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           pkg.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-transparent pb-12">
      {/* Hero Section */}
      <div className="px-8 pt-16 pb-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-2xl relative group">
          <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full group-hover:bg-violet-500/40 transition-all"></div>
          <Sparkles size={32} className="text-violet-400 relative z-10" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-[0.1em] uppercase italic leading-none mb-2">
          Secret <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Corner</span>
        </h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-6">Electric Event Experiences</p>
        
        {/* Search Bar */}
        <div className="w-full max-w-sm relative group">
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
          />
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-violet-400 transition-colors" />
        </div>
      </div>

      {!selectedCategory ? (
        /* Category Selection */
        <div className="px-6 space-y-4">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] text-center mb-6">Select Your Vibe</p>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full group relative overflow-hidden bg-white/5 border ${cat.border} rounded-[2rem] p-6 text-left transition-all duration-300 hover:scale-[1.02] active:scale-95 ${cat.glow} hover:bg-white/10`}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} border border-white/5`}>
                  <cat.icon size={28} />
                </div>
                <div>
                  <h3 className={`text-lg font-black text-white uppercase tracking-wider italic`}>{cat.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{cat.desc}</p>
                </div>
                <div className="ml-auto text-gray-700 group-hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Package Listing */
        <div className="px-5 animate-in fade-in slide-in-from-right-4 duration-300">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-8 flex items-center gap-3 text-gray-500 hover:text-white transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ChevronRight size={18} className="rotate-180" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Services</span>
          </button>

          <div className="space-y-5">
            {getActivePackages().map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className={`group relative bg-white/5 border border-white/5 rounded-[2.5rem] p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/10 cursor-pointer`}
              >
                <div className={`absolute -right-10 -top-10 w-40 h-40 ${pkg.bgClass} blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-2xl font-black ${pkg.colorClass} uppercase italic tracking-widest`}>{pkg.name}</h3>
                      <p className="text-2xl font-black text-white mt-1">₱{pkg.price.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full ${pkg.bgClass.replace('/10', '')} shadow-[0_0_8px_currentColor] shrink-0`}></div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{feature}</span>
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
