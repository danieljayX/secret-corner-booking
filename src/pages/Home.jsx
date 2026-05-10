import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { Martini, Coffee, UtensilsCrossed, ChevronRight, Sparkles, Search, Sun } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { packages } = useContext(BookingContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'mobile_bar',
      title: 'MOBILE BAR',
      subtitle: 'Cocktails & Mocktails',
      icon: Martini,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-950/50',
      bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'coffee_bar',
      title: 'COFFEE BAR',
      subtitle: 'Premium Brews',
      icon: Coffee,
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-950/50',
      bgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pica_pica',
      title: 'PICA PICA',
      subtitle: 'Night Bites',
      icon: UtensilsCrossed,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-950/50',
      bgImage: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800'
    },
  ];

  const getActivePackages = () => {
    return packages.filter(pkg => !selectedCategory || pkg.category === selectedCategory);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030014] text-white pb-24 font-['Inter',sans-serif]">
      
      {!selectedCategory ? (
        <div className="animate-in fade-in duration-700">
          {/* Header Section */}
          <div className="px-8 pt-12 pb-10 flex flex-col items-center">
            {/* Top Right Toggle Placeholder */}
            <div className="absolute top-8 right-8">
               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                 <Sun size={20} />
               </div>
            </div>

            {/* Logo Martini Circle */}
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(236,72,153,0.3)] border border-white/5">
              <Martini size={36} className="text-pink-500" strokeWidth={1.5} />
            </div>

            {/* Secret Corner Text */}
            <h1 className="text-[42px] font-black tracking-wider leading-none text-center">
              SECRET<br />
              <span className="text-white/90">CORNER</span>
            </h1>

            {/* Events with Lines */}
            <div className="flex items-center gap-4 mt-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-500"></div>
              <span className="text-[12px] font-black text-pink-500 tracking-[0.4em] uppercase">Events</span>
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-500"></div>
            </div>

            {/* Capsule Button */}
            <div className="mt-10 px-6 py-3 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center gap-3 shadow-lg">
               <Sparkles size={16} className="text-yellow-500" />
               <span className="text-[12px] font-bold text-white/80">Your Event. Our Perfect Setup.</span>
            </div>
          </div>

          {/* Services Section */}
          <div className="px-6 space-y-6">
            <h2 className="text-xl font-black text-white ml-2 tracking-tight">Our Services</h2>
            
            <div className="space-y-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="w-full group relative overflow-hidden rounded-[2.5rem] bg-black border border-white/5 h-44 transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-2xl"
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img src={cat.bgImage} className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" alt={cat.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    {/* Neon Circle Effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                       <div className={`w-32 h-32 rounded-full border-2 ${cat.iconColor.replace('text', 'border')} blur-sm`}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center ${cat.iconColor} border border-white/10 shadow-lg`}>
                      <cat.icon size={28} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black text-white uppercase tracking-[0.05em] leading-none mb-1.5 italic">{cat.title}</h3>
                      <p className="text-[13px] text-white/60 font-semibold">{cat.subtitle}</p>
                    </div>
                    <div className="ml-auto w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-white/20 transition-all">
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
            className="mb-8 flex items-center gap-3 text-gray-500 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ChevronRight size={20} className="rotate-180" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">Back to Services</span>
          </button>

          <h2 className="text-2xl font-black text-white uppercase italic tracking-widest mb-8 px-2">
            {categories.find(c => c.id === selectedCategory)?.title} Packages
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {getActivePackages().map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => navigate(`/package/${pkg.id}`)}
                className={`group relative bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 transition-all duration-300 hover:bg-white/5 cursor-pointer shadow-2xl overflow-hidden`}
              >
                <div className={`absolute -right-20 -top-20 w-60 h-60 ${pkg.bgClass} blur-[100px] opacity-20`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className={`text-2xl font-black ${pkg.colorClass} uppercase italic tracking-widest leading-none mb-2`}>{pkg.name}</h3>
                      <p className="text-3xl font-black text-white tracking-tight">₱{pkg.price.toLocaleString()}</p>
                    </div>
                    <div className="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/5">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${pkg.bgClass.replace('/10', '')} shadow-[0_0_10px_currentColor]`}></div>
                        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{feature}</span>
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
