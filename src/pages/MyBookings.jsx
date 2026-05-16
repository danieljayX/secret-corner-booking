import { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
import { Ticket, Calendar, Clock, MapPin, Package, AlertCircle, Edit2, X, User, Phone, FileText, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const { myBookings, editBooking } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const validBookings = Array.isArray(myBookings) ? myBookings.filter(b => b && b.id) : [];

  const openEdit = (booking) => {
    setEditingBooking(booking);
    setEditForm({
      eventName: booking.eventName || '',
      customerName: booking.customerName || '',
      customerPhone: booking.customerPhone || '',
      location: booking.location || '',
      date: booking.date || '',
      time: booking.time || '',
      specialRequests: booking.specialRequests || '',
    });
    setSaveSuccess(false);
  };

  const handleSave = () => {
    editBooking(editingBooking.id, { ...editingBooking, ...editForm });
    setSaveSuccess(true);
    setTimeout(() => {
      setEditingBooking(null);
      setSaveSuccess(false);
    }, 1200);
  };

  // Theme-aware styles
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const headerIconBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm';
  const ticketTopBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm';
  const ticketBottomBg = isDarkMode ? 'bg-white/10 border-white/10' : 'bg-gray-50 border-gray-100';
  const labelColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const dividerColor = isDarkMode ? 'border-white/10' : 'border-gray-200';
  const sideCircleBg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F5F3FF]';
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';
  const modalBg = isDarkMode ? 'bg-[#0a0a1a] border-white/10' : 'bg-white border-gray-100';

  return (
    <div className={`min-h-full ${bg} pb-24 font-['Inter'] transition-colors duration-300 ${textColor}`}>

      {/* Edit Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-t-[2.5rem] border shadow-2xl flex flex-col ${modalBg}`} style={{maxHeight: 'calc(100dvh - 80px)', marginBottom: '80px'}}>

            {/* Modal Header */}
            <div className={`px-6 pt-6 pb-4 flex items-center justify-between border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <div>
                <h2 className={`text-lg font-black uppercase tracking-widest italic ${textColor}`}>Edit Booking</h2>
                <p className={`text-[9px] font-black uppercase tracking-[0.2em] mt-0.5 ${labelColor}`}>
                  ID: {String(editingBooking.id || '').slice(-4)} • {editingBooking.packageName}
                </p>
              </div>
              <button onClick={() => setEditingBooking(null)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}>
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4 flex-1 overflow-y-auto">

              {/* Event Name */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                  <FileText size={11} /> Event Name
                </label>
                <input
                  type="text"
                  value={editForm.eventName}
                  onChange={e => setEditForm({...editForm, eventName: e.target.value})}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                  placeholder="e.g. John's 18th Birthday"
                />
              </div>

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                  <User size={11} /> Full Name
                </label>
                <input
                  type="text"
                  value={editForm.customerName}
                  onChange={e => setEditForm({...editForm, customerName: e.target.value})}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                  placeholder="Juan Dela Cruz"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                  <Phone size={11} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={editForm.customerPhone}
                  onChange={e => setEditForm({...editForm, customerPhone: e.target.value})}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                  placeholder="09XX XXX XXXX"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                  <MapPin size={11} /> Venue / Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={e => setEditForm({...editForm, location: e.target.value})}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                  placeholder="Venue Name, Street, City"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                    <Calendar size={11} /> Date
                  </label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={e => setEditForm({...editForm, date: e.target.value})}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                    style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${labelColor}`}>
                    <Clock size={11} /> Time
                  </label>
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={e => setEditForm({...editForm, time: e.target.value})}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all ${inputBg}`}
                    style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className={`text-[9px] font-black uppercase tracking-[0.2em] ${labelColor}`}>Special Requests</label>
                <textarea
                  rows={2}
                  value={editForm.specialRequests}
                  onChange={e => setEditForm({...editForm, specialRequests: e.target.value})}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none ${inputBg}`}
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            {/* Save Button */}
            <div className={`px-6 pb-6 pt-3 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              {saveSuccess ? (
                <div className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black text-[12px] uppercase tracking-widest text-center animate-pulse">
                  ✅ Saved Successfully!
                </div>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/30"
                >
                  <Save size={16} /> Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
              onClick={() => navigate('/services')}
              className={`mt-6 font-black uppercase tracking-widest text-[11px] transition-colors border-b-2 pb-1 ${isDarkMode ? 'text-cyan-400 border-cyan-400/30 hover:text-white' : 'text-indigo-600 border-indigo-600/30 hover:text-indigo-800'}`}
            >
              Explore Packages →
            </button>
          </div>
        ) : (
          validBookings.map((booking) => (
            <div key={booking.id} className="relative group overflow-hidden">
              {/* Ticket Top */}
              <div className={`${ticketTopBg} border border-b-0 rounded-t-[1.8rem] p-5 pb-3 relative z-10 backdrop-blur-md transition-all duration-300`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="min-w-0 pr-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border inline-block mb-2 ${isDarkMode ? 'border-white/20 bg-white/10 text-white' : 'border-indigo-100 bg-indigo-50 text-indigo-600'}`}>
                      ID: {String(booking.id || '').slice(-4)}
                    </span>
                    <h3 className={`text-base font-black uppercase italic tracking-widest leading-none truncate ${textColor}`}>{booking.eventName || 'Unnamed Event'}</h3>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5 ${labelColor}`}>
                      👤 {booking.customerName || 'Customer'}
                    </p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1.5 ${labelColor}`}>
                      📞 {booking.customerPhone || 'No Phone'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-500 text-white'
                        : booking.status === 'Declined'
                        ? 'bg-red-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}>
                      {booking.status || 'Pending'}
                    </div>

                    {/* Edit Button — only for Pending */}
                    {booking.status === 'Pending' && (
                      <button
                        onClick={() => openEdit(booking)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all active:scale-95 ${isDarkMode ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30' : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'}`}
                      >
                        <Edit2 size={9} /> Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${isDarkMode ? 'bg-violet-500/20 border-violet-500/30 text-violet-400' : 'bg-violet-50 border-violet-100 text-violet-600'}`}>
                      <Package size={12} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.packageName || 'Selected Package'}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${isDarkMode ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-sky-50 border-sky-100 text-sky-600'}`}>
                      <Calendar size={12} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.date || 'TBD'}</span>
                    <div className={`ml-1 w-6 h-6 rounded-md flex items-center justify-center border transition-all ${isDarkMode ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-sky-50 border-sky-100 text-sky-600'}`}>
                      <Clock size={12} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.time || 'TBD'}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${isDarkMode ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-pink-50 border-pink-100 text-pink-600'}`}>
                      <MapPin size={12} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest truncate ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{booking.location || 'Location Not Set'}</span>
                  </div>
                </div>
              </div>

              {/* Dotted Divider */}
              <div className={`relative h-5 flex items-center border-x ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                <div className={`absolute left-[-10px] w-5 h-5 rounded-full border transition-all ${sideCircleBg} ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}></div>
                <div className={`flex-1 border-t-2 border-dashed mx-5 ${dividerColor}`}></div>
                <div className={`absolute right-[-10px] w-5 h-5 rounded-full border transition-all ${sideCircleBg} ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}></div>
              </div>

              {/* Ticket Bottom */}
              <div className={`${ticketBottomBg} border border-t-0 rounded-b-[1.8rem] p-5 pt-4 flex items-center justify-start relative z-10 transition-all duration-300`}>
                <div>
                  <p className={`text-[8px] font-black uppercase tracking-[0.2em] mb-0.5 ${labelColor}`}>Total Amount</p>
                  <p className={`text-xl font-black tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>₱{(booking.packagePrice || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @media print {
          .no-print, nav, button, .blur-xl { display: none !important; }
          body { background: white !important; color: black !important; }
          .min-h-full { background: white !important; }
        }
      `}</style>
    </div>
  );
}
