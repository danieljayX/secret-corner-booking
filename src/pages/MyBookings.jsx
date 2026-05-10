import { useContext, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import { Ticket, Calendar, Clock, MapPin, ChevronRight, Package, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const { myBookings } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validBookings = Array.isArray(myBookings) ? myBookings.filter(b => b && b.id) : [];

  return (
    <div className="min-h-full bg-[#030014] pb-24 font-['Outfit'] text-white">
      {/* Header */}
      <div className="px-8 pt-16 pb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-5 border border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
          <Ticket size={28} className="text-cyan-400 relative z-10" />
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-widest italic mb-2">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Tickets</span>
        </h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Event Access & Confirmation</p>
      </div>

      <div className="px-6 space-y-6">
        {validBookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10 mx-2">
            <AlertCircle size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-white font-black uppercase tracking-widest text-[11px] px-10 leading-relaxed">
              No active bookings found.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 text-cyan-400 font-black uppercase tracking-widest text-[11px] hover:text-white transition-colors border-b-2 border-cyan-400/30 pb-1"
            >
              Explore Packages →
            </button>
          </div>
        ) : (
          validBookings.map((booking) => (
            <div key={booking.id} className="relative group overflow-hidden">
              {/* Ticket Top */}
              <div className="bg-white/5 border border-white/10 border-b-0 rounded-t-[2.5rem] p-8 pb-4 relative z-10 backdrop-blur-md">
                <div className="flex justify-between items-start mb-6">
                  <div className="min-w-0 pr-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 bg-white/10 text-white shadow-sm inline-block mb-3`}>
                      ID: {String(booking.id || '').slice(-4)}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-widest leading-none truncate">{booking.eventName || 'Unnamed Event'}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                      👤 {booking.customerName || 'Customer'}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                      📞 {booking.customerPhone || 'No Phone'}
                    </p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shrink-0 ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500 text-black' : 'bg-orange-500 text-black'
                  }`}>
                    {booking.status || 'Pending'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                      <Package size={16} className="text-violet-400" />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-widest">{booking.packageName || 'Selected Package'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <Calendar size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-widest">{booking.date || 'TBD'}</span>
                    <div className="ml-2 w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <Clock size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-widest">{booking.time || 'TBD'}</span>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                      <MapPin size={16} className="text-rose-400" />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-widest truncate">{booking.location || 'Location Not Set'}</span>
                  </div>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className="relative h-6 bg-white/5 flex items-center justify-between px-[-8px] border-x border-white/10">
                <div className="absolute left-[-12px] w-6 h-6 bg-[#030014] rounded-full border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                <div className="flex-1 border-t-2 border-dashed border-white/10 mx-6"></div>
                <div className="absolute right-[-12px] w-6 h-6 bg-[#030014] rounded-full border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
              </div>

              {/* Ticket Bottom */}
              <div className="bg-white/10 border border-white/10 border-t-0 rounded-b-[2.5rem] p-8 pt-6 flex items-center justify-between relative z-10 active:bg-white/20 transition-colors">
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">Total Paid Amount</p>
                  <p className="text-2xl font-black text-white tracking-widest">₱{(booking.packagePrice || 0).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-2xl bg-white/5 border border-white/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  <Ticket size={16} className="text-cyan-400" />
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
