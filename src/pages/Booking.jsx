import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { ChevronLeft, Calendar as CalendarIcon, MapPin, User, Phone, MessageSquare, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();
  const { currentBooking, confirmBooking, bookedDates } = useContext(BookingContext);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    eventName: '',
    customerName: '',
    customerPhone: '',
    specialRequests: ''
  });

  useEffect(() => {
    // Only redirect to home if we don't have a current booking 
    // and we are NOT on the confirmation step
    if (!currentBooking && window.location.pathname === '/booking') {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [currentBooking, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookedDates.includes(formData.date)) {
      alert("This date is already booked! Please select another date.");
      return;
    }
    confirmBooking({
      ...currentBooking,
      ...formData
    });
    navigate('/tickets');
  };

  const isDateBooked = (date) => bookedDates.includes(date);

  if (!currentBooking) return null;

  return (
    <div className="min-h-screen bg-[#030014] pb-24 font-['Outfit'] text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#030014]/90 backdrop-blur-xl z-30 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Booking Form</span>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Selected Package Info */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-600/20 blur-3xl rounded-full"></div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">You are booking:</p>
          <div className="flex justify-between items-end">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">{currentBooking.packageName}</h3>
            <p className="text-2xl font-black text-violet-400">₱{currentBooking.packagePrice.toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* DATE & TIME - Explicit and Large */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <CalendarIcon size={16} className="text-violet-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">1. Schedule Event</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4">Select Event Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`block w-full px-6 py-5 bg-white/5 border rounded-[1.5rem] text-base font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      isDateBooked(formData.date) ? 'border-red-500 text-red-400' : 'border-white/10 text-white'
                    }`}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                {isDateBooked(formData.date) && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4 mt-2">❌ This date is already booked!</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-4">Event Start Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="block w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <MapPin size={16} className="text-cyan-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">2. Venue Details</h3>
            </div>
            <input
              type="text"
              placeholder="Where is the event located?"
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="block w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>

          {/* CONTACT & EVENT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <User size={16} className="text-rose-400" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">3. Your Information</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Name (e.g. John's 18th Birthday)"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                className="block w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className="block w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                className="block w-full px-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-6">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 mb-8">
              <ShieldCheck className="text-emerald-500" size={20} />
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Secure Slot Reservation</p>
            </div>
            
            <button
              type="submit"
              disabled={isDateBooked(formData.date)}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] hover:from-violet-500 hover:to-indigo-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center gap-4 group active:scale-95"
            >
              <span className="drop-shadow-lg">BOOK MY EVENT NOW</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
