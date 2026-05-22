import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Package, ArrowRight, Home as HomeIcon } from 'lucide-react';
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { myBookings } = useContext(BookingContext);
  
  // Get the latest booking
  const latestBooking = myBookings.length > 0 ? myBookings[0] : null;

  return (
    <div className="w-full min-h-full flex flex-col items-center p-6 pb-16 bg-gray-50 dark:bg-[#050505] relative transition-colors flex-shrink-0">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/5 dark:from-orange-500/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="mt-12 mb-8 flex flex-col items-center relative z-10">
        <div className="w-20 h-20 bg-orange-500 dark:bg-orange-500/20 rounded-full flex items-center justify-center mb-6 shadow-xl dark:shadow-[0_0_30px_rgba(249,115,22,0.3)] border-4 border-white dark:border-orange-500/30">
          <Clock size={40} className="text-white dark:text-orange-400 animate-pulse" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 text-center tracking-widest uppercase italic">
          Booking Submitted
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-sm font-medium px-4">
          Your request is pending admin review & confirmation.
        </p>
      </div>

      {/* Premium Receipt Card */}
      {latestBooking && (
        <div className="w-full max-w-[340px] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-colors animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500"></div>
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Official Ticket</span>
                <span className="px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-orange-500 text-white shadow-sm">
                  {latestBooking.status || 'Pending'}
                </span>
              </div>
              <span className="text-[10px] font-black text-pink-600 dark:text-pink-400 uppercase tracking-widest bg-pink-50 dark:bg-pink-500/10 px-2 py-0.5 rounded-md">
                #{latestBooking.id.toString().slice(-6)}
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-400 shrink-0">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Package Selected</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white uppercase italic">{latestBooking.packageName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-400 shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Event Date</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    {new Date(latestBooking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-dashed border-gray-200 dark:border-white/10 flex justify-between items-end transition-colors">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
                <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{latestBooking.customerName}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Fee</p>
                <p className="text-xl font-black text-pink-600 dark:text-pink-400">₱{latestBooking.packagePrice?.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-500/10 p-4 flex justify-center transition-colors">
             <p className="text-[9px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-[0.2em] text-center">
               ⚠️ Admin review required to confirm slot.
             </p>
          </div>
        </div>
      )}
      
      <div className="mt-10 space-y-3 w-full max-w-[340px] z-10">
        <button 
          onClick={() => navigate('/my-bookings')}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/5 flex items-center justify-center gap-2"
        >
          My Tickets <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => navigate('/services')}
          className="w-full flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest py-3 hover:text-pink-500 transition-colors"
        >
          <HomeIcon size={14} /> Back to Home
        </button>
      </div>
    </div>
  );
}
