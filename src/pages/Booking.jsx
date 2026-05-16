import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { ChevronLeft, Calendar as CalendarIcon, MapPin, User, Phone, MessageSquare, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();
  const { currentBooking, confirmBooking, bookedDates } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);

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
    if (!currentBooking && window.location.pathname === '/booking') {
      navigate('/services');
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
    navigate('/confirmation');
  };

  const isDateBooked = (date) => bookedDates.includes(date);

  if (!currentBooking) return null;

  // Theme-aware styles
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const headerBg = isDarkMode ? 'bg-[#030014]/90' : 'bg-white/80';
  const headerBorder = isDarkMode ? 'border-white/5' : 'border-gray-100';
  const cardBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm';
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const inputTextColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-500' : 'text-gray-400';
  const sectionLabelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`min-h-screen ${bg} pb-24 font-['Inter'] transition-colors duration-300 ${textColor}`}>
      {/* Header */}
      <div className={`px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 ${headerBg} backdrop-blur-xl z-30 border-b ${headerBorder}`}>
        <button 
          onClick={() => navigate(-1)} 
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50'}`}
        >
          <ChevronLeft size={20} />
        </button>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Booking Form</span>
        <div className="w-10"></div>
      </div>

      <div className="px-6 py-8 space-y-10">
        {/* Selected Package Info */}
        <div className={`${cardBg} rounded-[2rem] p-8 relative overflow-hidden transition-all duration-300`}>
          <div className={`absolute -right-6 -top-6 w-24 h-24 ${isDarkMode ? 'bg-violet-600/20' : 'bg-indigo-500/10'} blur-3xl rounded-full`}></div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>You are booking:</p>
          <div className="flex justify-between items-end gap-4">
            <h3 className={`text-2xl font-black uppercase italic tracking-widest ${textColor}`}>{currentBooking.packageName}</h3>
            <p className={`text-2xl font-black ${isDarkMode ? 'text-violet-400' : 'text-indigo-600'}`}>₱{currentBooking.packagePrice.toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* DATE & TIME */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <CalendarIcon size={16} className={isDarkMode ? 'text-violet-400' : 'text-indigo-500'} />
              <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${sectionLabelColor}`}>1. Schedule Event</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-4 ${labelColor}`}>Select Event Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-base font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                      isDateBooked(formData.date) ? 'border-red-500 text-red-400' : `${inputTextColor}`
                    }`}
                    style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                  />
                </div>
                {isDateBooked(formData.date) && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-4 mt-2">❌ This date is already booked!</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] ml-4 ${labelColor}`}>Event Start Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-base font-bold ${inputTextColor} focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                />
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <MapPin size={16} className={isDarkMode ? 'text-cyan-400' : 'text-sky-500'} />
              <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${sectionLabelColor}`}>2. Venue Details</h3>
            </div>
            <input
              type="text"
              placeholder="Where is the event located?"
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-sm ${inputTextColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
            />
          </div>

          {/* CONTACT & EVENT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ml-2">
              <User size={16} className={isDarkMode ? 'text-rose-400' : 'text-pink-500'} />
              <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${sectionLabelColor}`}>3. Your Information</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Name (e.g. John's 18th Birthday)"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-sm ${inputTextColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
              />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-sm ${inputTextColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={formData.customerPhone}
                onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                className={`block w-full px-6 py-5 ${inputBg} rounded-[1.5rem] text-sm ${inputTextColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-6">
            <div className={`${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'} border rounded-2xl p-4 flex items-center gap-3 mb-8 transition-all`}>
              <ShieldCheck className="text-emerald-500" size={20} />
              <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Secure Slot Reservation</p>
            </div>
            
            <button
              type="submit"
              disabled={isDateBooked(formData.date)}
              className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_30px_rgba(139,92,246,0.3)]' : 'bg-indigo-600 shadow-[0_8px_30px_rgba(79,70,229,0.2)]'} text-white font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] hover:opacity-90 transition-all flex items-center justify-center gap-4 group active:scale-95`}
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
