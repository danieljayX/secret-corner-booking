import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ChevronLeft, CheckCircle2, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages, setCurrentBooking } = useContext(BookingContext);

  const pkg = packages.find(p => p.id === id);

  if (!pkg) return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center text-white p-10 text-center">
      <div>
        <p className="text-gray-500 mb-4 uppercase tracking-widest font-black">Package Not Found</p>
        <button onClick={() => navigate('/')} className="text-violet-400 font-black">Back to Home</button>
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

  // Fallback colors if classes are missing
  const colorClass = pkg.colorClass || 'text-white';
  const bgClass = pkg.bgClass || 'bg-violet-500/20';

  return (
    <div className="min-h-screen bg-[#030014] pb-24 font-['Outfit'] text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#030014]/90 backdrop-blur-xl z-30">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Service Details</span>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-4 space-y-8">
        {/* Package Title Card - Made more robust */}
        <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center shadow-2xl">
          {/* Background Glow */}
          <div className={`absolute -right-10 -top-10 w-40 h-40 ${bgClass.replace('/10', '/30')} blur-[60px] rounded-full`}></div>
          <div className={`absolute -left-10 -bottom-10 w-40 h-40 ${bgClass.replace('/10', '/30')} blur-[60px] rounded-full`}></div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <Star size={10} className="text-yellow-400" fill="currentColor" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Premium Choice</span>
            </div>
            <h1 className={`text-5xl font-black ${colorClass} uppercase italic tracking-widest leading-none drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
              {pkg.name}
            </h1>
            <p className="text-3xl font-black text-white tracking-tight">₱{pkg.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 ml-4">What's Included</p>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${colorClass} border border-white/5`}>
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm font-black text-white uppercase tracking-widest leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusive Badge */}
        <div className="bg-violet-600/10 border border-violet-500/20 rounded-3xl p-6 flex items-start gap-5">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-violet-400" size={24} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-widest text-violet-400 mb-1">Exclusive Slot</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-widest opacity-80">
              Only 1 exclusive booking per day for quality assurance.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSelect}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-4 active:scale-95 mt-4 group"
        >
          <span className="drop-shadow-lg">Reserve Package</span>
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
