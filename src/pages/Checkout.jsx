import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Phone, Calendar as CalendarIcon } from 'lucide-react';
import { useState, useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { currentBooking, confirmBooking } = useContext(BookingContext);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    time: '',
    notes: ''
  });

  if (!currentBooking) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-transparent">
        <div className="w-24 h-24 bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full flex items-center justify-center mb-6 shadow-sm dark:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-colors">
          <CalendarIcon className="text-gray-500" size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-wide transition-colors">No Booking Started</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium transition-colors">Please select a package and date first.</p>
        <button onClick={() => navigate('/services')} className="bg-pink-600 dark:bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-md dark:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-105 transition-all">
          View Packages
        </button>
      </div>
    );
  }

  const { package: pkg, date } = currentBooking;

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmBooking({
      packageName: pkg.name,
      packagePrice: pkg.price,
      date,
      customerName: formData.name,
      customerPhone: formData.phone,
      location: formData.address,
      time: formData.time,
      specialRequests: formData.notes,
      eventName: pkg.name,
      socialLink: '',
      category: pkg.category
    });
    navigate('/confirmation');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-transparent transition-colors overflow-hidden">
      
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Immersive Header */}
        <div className="relative h-32 flex flex-col justify-end p-6 overflow-hidden rounded-b-[40px] border-b border-gray-200 dark:border-white/10 bg-white dark:bg-transparent shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 transition-colors shrink-0">
          <div className={`absolute inset-0 ${pkg.bgClass} opacity-10 dark:opacity-20 mix-blend-normal dark:mix-blend-screen`}></div>
          <button onClick={() => navigate(-1)} className="absolute top-6 left-6 w-10 h-10 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-800 dark:text-white border border-gray-200 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-20 shadow-sm dark:shadow-none">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-widest uppercase relative z-10 drop-shadow-sm dark:drop-shadow-md transition-colors text-right">
            Event Details
          </h1>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className={`relative p-5 rounded-3xl border border-gray-200 dark:border-transparent dark:${pkg.borderClass} ${pkg.bgClass} mb-6 backdrop-blur-md overflow-hidden shadow-sm dark:shadow-[0_0_20px_currentColor] bg-white dark:bg-[#0a0a0a] transition-colors`}>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/50 dark:bg-white/20 blur-3xl rounded-full"></div>
            
            <p className="text-xs text-gray-500 dark:text-gray-300 font-bold uppercase tracking-widest mb-1 relative z-10 transition-colors">Reserving Package</p>
            <div className="flex justify-between items-center relative z-10">
              <h3 className={`text-xl font-black ${pkg.colorClass} dark:drop-shadow-[0_0_8px_currentColor]`}>{pkg.name}</h3>
              <span className="font-bold text-lg text-gray-900 dark:text-white transition-colors">₱{pkg.price.toLocaleString()}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/20 flex justify-between items-center relative z-10 transition-colors">
              <span className="text-sm text-gray-600 dark:text-gray-200 font-medium transition-colors">Event Date:</span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] bg-cyan-50 dark:bg-black/30 px-3 py-1 rounded-lg transition-colors">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}
              </span>
            </div>
          </div>

          {/* Form */}
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 tracking-wide transition-colors">Client Information</h3>
            
            <div className="space-y-1.5 group">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider ml-1 group-focus-within:text-pink-600 dark:group-focus-within:text-pink-500 transition-colors">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-pink-500 dark:group-focus-within:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-all" />
                </div>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-pink-500 dark:focus:bg-pink-500/5 transition-all shadow-sm dark:shadow-inner" placeholder="Juan Dela Cruz" />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider ml-1 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors">Contact Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-cyan-500 dark:group-focus-within:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
                </div>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-500 dark:focus:bg-cyan-400/5 transition-all shadow-sm dark:shadow-inner" placeholder="09XX XXX XXXX" />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider ml-1 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-400 transition-colors">Event Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-yellow-500 dark:group-focus-within:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all" />
                </div>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-yellow-500 dark:focus:bg-yellow-400/5 transition-all shadow-sm dark:shadow-inner" placeholder="Venue Name, Street, City" />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider ml-1 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors">Event Start Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Clock size={18} className="text-green-500 dark:group-focus-within:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-all" />
                </div>
                <input 
                  required 
                  type="time" 
                  value={formData.time} 
                  onChange={e => setFormData({...formData, time: e.target.value})} 
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-green-500 dark:focus:bg-green-400/5 transition-all shadow-sm dark:shadow-inner" 
                />
              </div>
            </div>
            <div className="space-y-1.5 group">
              <label className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider ml-1 group-focus-within:text-pink-600 dark:group-focus-within:text-pink-500 transition-colors">Special Requests / Notes</label>
              <textarea 
                rows="3"
                value={formData.notes} 
                onChange={e => setFormData({...formData, notes: e.target.value})} 
                className="w-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-pink-500 dark:focus:bg-pink-500/5 transition-all shadow-sm dark:shadow-inner resize-none" 
                placeholder="Ex: No sugar for coffee, specific drink choices, or landmark for the venue."
              />
            </div>
          </form>
        </div>
      </div>

      {/* Action Button Fixed at Bottom of Flex Container */}
      <div className="shrink-0 p-4 bg-gray-100/90 dark:bg-[#050505]/90 backdrop-blur-md border-t border-gray-200 dark:border-white/5 transition-colors z-20">
        <button type="submit" form="booking-form" className="w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg dark:shadow-[0_0_20px_rgba(236,72,153,0.5)] bg-pink-600 dark:bg-pink-500 text-white hover:bg-pink-700 dark:hover:bg-pink-600 hover:scale-[1.02] active:scale-95">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
