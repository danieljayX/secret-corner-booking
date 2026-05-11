import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { Ticket, Calendar, Clock, MapPin, ChevronRight, Package, AlertCircle, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const { myBookings } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validBookings = Array.isArray(myBookings) ? myBookings.filter(b => b && b.id) : [];

  // Theme-aware styles
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const headerIconBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm';
  const ticketTopBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm';
  const ticketBottomBg = isDarkMode ? 'bg-white/10 border-white/10' : 'bg-gray-50 border-gray-100';
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const dividerColor = isDarkMode ? 'border-white/10' : 'border-gray-200';
  const sideCircleBg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';

  return (
    <div className={`min-h-full ${bg} pb-24 font-['Inter'] transition-colors duration-300 ${textColor}`}>
      {/* Header */}
      <div className="px-8 pt-16 pb-8 flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border relative transition-all duration-300 ${headerIconBg}`}>
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-cyan-500/20' : 'bg-indigo-500/10'} blur-xl rounded-full`}></div>
          <Ticket size={28} className={`${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'} relative z-10`} />
        </div>
        <h1 className={`text-3xl font-black uppercase tracking-widest italic mb-2 ${textColor}`}>
          Your <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-violet-400' : 'from-indigo-600 to-pink-500'}`}>Tickets</span>
        </h1>
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${labelColor}`}>Event Access & Confirmation</p>
      </div>

      <div className="px-6 space-y-6">
        {validBookings.length === 0 ? (
          <div className={`text-center py-20 rounded-[2.5rem] border border-dashed mx-2 transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <AlertCircle size={40} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`font-black uppercase tracking-widest text-[11px] px-10 leading-relaxed ${labelColor}`}>
              No active bookings found.
            </p>
            <button 
              onClick={() => navigate('/')}
              className={`mt-6 font-black uppercase tracking-widest text-[11px] transition-colors border-b-2 pb-1 ${isDarkMode ? 'text-cyan-400 border-cyan-400/30 hover:text-white' : 'text-indigo-600 border-indigo-600/30 hover:text-indigo-800'}`}
            >
              Explore Packages →
            </button>
          </div>
        ) : (
          validBookings.map((booking) => (
            <div key={booking.id} className="relative group overflow-hidden">
              {/* Ticket Top */}
              <div className={`${ticketTopBg} border border-b-0 rounded-t-[2.5rem] p-8 pb-4 relative z-10 backdrop-blur-md transition-all duration-300`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="min-w-0 pr-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border inline-block mb-3 ${isDarkMode ? 'border-white/20 bg-white/10 text-white' : 'border-indigo-100 bg-indigo-50 text-indigo-600'}`}>
                      ID: {String(booking.id || '').slice(-4)}
                    </span>
                    <h3 className={`text-2xl font-black uppercase italic tracking-widest leading-none truncate ${textColor}`}>{booking.eventName || 'Unnamed Event'}</h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2 ${labelColor}`}>
                      👤 {booking.customerName || 'Customer'}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-2 ${labelColor}`}>
                      📞 {booking.customerPhone || 'No Phone'}
                    </p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shrink-0 shadow-sm ${
                    booking.status === 'Confirmed' 
                      ? (isDarkMode ? 'bg-emerald-500 text-black' : 'bg-emerald-500 text-white') 
                      : (isDarkMode ? 'bg-orange-500 text-black' : 'bg-orange-500 text-white')
                  }`}>
                    {booking.status || 'Pending'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${isDarkMode ? 'bg-violet-500/20 border-violet-500/30 text-violet-400' : 'bg-violet-50 border-violet-100 text-violet-600'}`}>
                      <Package size={16} />
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.packageName || 'Selected Package'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${isDarkMode ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-sky-50 border-sky-100 text-sky-600'}`}>
                      <Calendar size={16} />
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.date || 'TBD'}</span>
                    <div className={`ml-2 w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${isDarkMode ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-sky-50 border-sky-100 text-sky-600'}`}>
                      <Clock size={16} />
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.time || 'TBD'}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${isDarkMode ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-pink-50 border-pink-100 text-pink-600'}`}>
                      <MapPin size={16} />
                    </div>
                    <span className={`text-[13px] font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.location || 'Location Not Set'}</span>
                  </div>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className={`relative h-6 flex items-center justify-between px-[-8px] border-x ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                <div className={`absolute left-[-12px] w-6 h-6 rounded-full border transition-all ${sideCircleBg} ${isDarkMode ? 'border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]' : 'border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]'}`}></div>
                <div className={`flex-1 border-t-2 border-dashed mx-6 ${dividerColor}`}></div>
                <div className={`absolute right-[-12px] w-6 h-6 rounded-full border transition-all ${sideCircleBg} ${isDarkMode ? 'border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]' : 'border-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]'}`}></div>
              </div>

              {/* Ticket Bottom */}
              <div className={`${ticketBottomBg} border border-t-0 rounded-b-[2.5rem] p-8 pt-6 flex flex-col sm:flex-row items-center justify-between relative z-10 gap-6 transition-all duration-300`}>
                <div className="flex-1 w-full text-center sm:text-left">
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${labelColor}`}>Total Amount</p>
                  <p className={`text-2xl font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₱{(booking.packagePrice || 0).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className={`w-full sm:w-auto px-6 py-4 rounded-2xl border flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 shadow-sm'}`}
                >
                  <Printer size={16} />
                  Print Ticket
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <style>{`
        @media print {
          .no-print, nav, button, .blur-xl, .bg-white\\/5 { display: none !important; }
          body { background: white !important; color: black !important; }
          .min-h-full { background: white !important; }
          .bg-white\\/10 { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; color: black !important; }
          .text-white { color: black !important; }
          .text-gray-400, .text-gray-500 { color: #64748b !important; }
          .bg-gradient-to-r { background: none !important; -webkit-background-clip: initial !important; background-clip: initial !important; color: black !important; -webkit-text-fill-color: initial !important; }
          .rounded-[2.5rem] { border-radius: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
