import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { MapPin, Phone, Clock, Mail, Star, Martini } from 'lucide-react';

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
    <div className={`w-full min-h-full pb-16 font-['Inter',sans-serif] transition-colors duration-300 flex-shrink-0 ${bg} ${textColor}`}>

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
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${labelColor}`}>Facebook Page</p>
                <p className={`text-sm font-black ${textColor} group-hover:text-pink-500 transition-colors`}>Secret Corner Events</p>
              </div>
            </a>

            <a href="https://instagram.com/secretcorner" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
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
