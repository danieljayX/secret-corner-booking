import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { MapPin, Phone, Facebook, Instagram, Clock, Mail, Star, Martini } from 'lucide-react';

export default function About() {
  const { isDarkMode } = useContext(ThemeContext);

  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm';

  const services = [
    { emoji: '🍹', title: 'Mobile Bar', desc: 'Cocktails & Mocktails for any event' },
    { emoji: '☕', title: 'Coffee Bar', desc: 'Premium brews & specialty drinks' },
    { emoji: '🍢', title: 'Pica Pica', desc: 'Finger foods & party bites' },
  ];

  const hours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 5:00 PM' },
  ];

  return (
    <div className={`min-h-full pb-28 font-['Inter',sans-serif] transition-colors duration-300 ${bg} ${textColor}`}>

      {/* Hero */}
      <div className={`relative px-6 pt-12 pb-10 flex flex-col items-center text-center overflow-hidden`}>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-pink-500/10 to-transparent' : 'bg-gradient-to-b from-pink-100/60 to-transparent'}`}></div>
        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-5 border shadow-xl ${isDarkMode ? 'bg-black border-white/10 shadow-pink-500/20' : 'bg-white border-pink-100 shadow-pink-200/50'}`}>
          <Martini size={34} className="text-pink-500" strokeWidth={1.5} />
        </div>
        <h1 className={`text-2xl font-black uppercase tracking-widest italic relative ${textColor}`}>
          Secret <span className="text-pink-500">Corner</span>
        </h1>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-1 relative ${labelColor}`}>Mobile Event Services</p>
        <p className={`text-sm font-medium leading-relaxed mt-4 max-w-xs relative ${labelColor}`}>
          We bring the bar to your celebration. Premium event services for any occasion — birthdays, weddings, corporate events & more.
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-4 relative">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
          <span className={`text-[11px] font-bold ml-1 ${labelColor}`}>5.0 • Trusted by hundreds</span>
        </div>
      </div>

      <div className="px-5 space-y-5">

        {/* Our Services */}
        <div className={`rounded-[1.8rem] border p-5 ${cardBg}`}>
          <h2 className={`text-[11px] font-black uppercase tracking-[0.2em] mb-4 ${labelColor}`}>What We Offer</h2>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>{s.emoji}</div>
                <div>
                  <p className={`text-[13px] font-black uppercase tracking-wider ${textColor}`}>{s.title}</p>
                  <p className={`text-[11px] font-medium ${labelColor}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className={`rounded-[1.8rem] border p-5 ${cardBg}`}>
          <h2 className={`text-[11px] font-black uppercase tracking-[0.2em] mb-4 ${labelColor}`}>Contact Us</h2>
          <div className="space-y-4">

            <a href="tel:+639XXXXXXXXX" className="flex items-center gap-4 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <Phone size={18} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Phone / Viber</p>
                <p className={`text-sm font-black ${textColor} group-hover:text-pink-500 transition-colors`}>+63 9XX XXX XXXX</p>
              </div>
            </a>

            <a href="https://facebook.com/secretcorner" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Facebook size={18} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Facebook Page</p>
                <p className={`text-sm font-black ${textColor} group-hover:text-pink-500 transition-colors`}>Secret Corner Events</p>
              </div>
            </a>

            <a href="https://instagram.com/secretcorner" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                <Instagram size={18} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Instagram</p>
                <p className={`text-sm font-black ${textColor} group-hover:text-pink-500 transition-colors`}>@secretcornerevents</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-50 text-rose-600'}`}>
                <MapPin size={18} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Location</p>
                <p className={`text-sm font-black ${textColor}`}>Cebu City, Philippines</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>
                <Mail size={18} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Email</p>
                <p className={`text-sm font-black ${textColor}`}>secretcorner@email.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className={`rounded-[1.8rem] border p-5 ${cardBg}`}>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={14} className="text-pink-500" />
            <h2 className={`text-[11px] font-black uppercase tracking-[0.2em] ${labelColor}`}>Business Hours</h2>
          </div>
          <div className="space-y-3">
            {hours.map((h, i) => (
              <div key={i} className={`flex justify-between items-center py-2 border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <span className={`text-[12px] font-bold ${labelColor}`}>{h.day}</span>
                <span className={`text-[12px] font-black ${textColor}`}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`rounded-[1.8rem] p-5 text-center bg-gradient-to-br ${isDarkMode ? 'from-pink-950/40 to-indigo-950/40 border border-pink-500/20' : 'from-pink-50 to-indigo-50 border border-pink-100'}`}>
          <p className={`text-[13px] font-black uppercase tracking-widest mb-1 ${textColor}`}>Ready to Book?</p>
          <p className={`text-[11px] font-medium mb-4 ${labelColor}`}>Let us make your event unforgettable!</p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-pink-500/30"
          >
            Book Now →
          </a>
        </div>
      </div>
    </div>
  );
}
