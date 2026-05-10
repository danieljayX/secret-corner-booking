import { useState, useContext, useMemo } from 'react';
import { BookingContext } from '../context/BookingContext';
import { 
  Search, 
  ChevronDown,
  Edit3,
  Calendar as CalendarIcon,
  X,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  User,
  Package,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Plus,
  BarChart3,
  Settings,
  ChevronRight,
  LayoutDashboard,
  Bell
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[13px] font-semibold text-slate-400">{title}</p>
        <div className={`p-2 rounded-xl bg-slate-50 ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-[28px] font-black text-slate-800 leading-none">{value}</h3>
          <div className="flex items-center gap-1 mt-2">
            {trend > 0 ? (
              <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-0.5">
                <TrendingUp size={10} /> {trend}%
              </span>
            ) : (
              <span className="text-[11px] font-bold text-red-500 flex items-center gap-0.5">
                <TrendingDown size={10} /> {Math.abs(trend)}%
              </span>
            )}
            <span className="text-[11px] font-medium text-slate-400">from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileStatCard = ({ title, value, icon: Icon, color, trend, bg }) => (
  <div className="bg-white rounded-[28px] p-5 border border-slate-50 shadow-sm flex items-start gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color} shrink-0`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{title}</p>
      <h4 className="text-2xl font-black text-slate-800 mt-0.5">{value}</h4>
      <div className="flex items-center gap-1 mt-1">
        {trend > 0 ? (
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
            <TrendingUp size={10} /> {trend}%
          </span>
        ) : (
          <span className="text-[10px] font-bold text-red-500 flex items-center gap-0.5">
            <TrendingDown size={10} /> {Math.abs(trend)}%
          </span>
        )}
        <span className="text-[10px] font-medium text-slate-400">from yesterday</span>
      </div>
    </div>
  </div>
);

const MobileBookingItem = ({ booking, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0 active:bg-slate-50 transition-colors">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
      {booking.packageName?.includes('Bar') ? (
        <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-500">
           <Package size={24} />
        </div>
      ) : (
        <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-500">
           <User size={24} />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[14px] font-bold text-slate-800 truncate">Guest: {booking.customerName}</h4>
      <p className="text-[12px] text-slate-500 font-medium truncate mt-0.5">{booking.location}</p>
      <p className="text-[11px] text-slate-400 font-semibold mt-1">{booking.date} • {booking.time}</p>
    </div>
    <div className="flex flex-col items-end gap-2 shrink-0">
       <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
         booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
         booking.status === 'Declined' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'
       }`}>
         {booking.status === 'Confirmed' ? 'Confirmed' : booking.status === 'Declined' ? 'Cancelled' : 'Pending'}
       </span>
       <ChevronRight size={18} className="text-slate-300" />
    </div>
  </div>
);

export default function Admin({ defaultTab = 'bookings' }) {
  const { myBookings, updateBookingStatus, bookedDates, packages, updatePackage } = useContext(BookingContext);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [editingPackage, setEditingPackage] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', features: [] });
  const [selectedBooking, setSelectedBooking] = useState(null);

  const statsData = useMemo(() => {
    const total = myBookings.length;
    const confirmed = myBookings.filter(b => b.status === 'Confirmed').length;
    const pending = myBookings.filter(b => b.status === 'Pending').length;
    const cancelled = myBookings.filter(b => b.status === 'Declined').length;
    
    return [
      { title: 'Total Bookings', value: total, icon: CalendarIcon, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 12 },
      { title: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 8 },
      { title: 'Pending', value: pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', trend: -5 },
      { title: 'Cancelled', value: cancelled, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', trend: -2 },
    ];
  }, [myBookings]);

  const filteredBookings = myBookings.filter(booking => {
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const name = (booking.customerName || '').toLowerCase();
    const pkg = (booking.packageName || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return matchesStatus && (name.includes(query) || pkg.includes(query));
  });

  const getStatusStyle = (status) => {
    if (status === 'Confirmed') return 'text-emerald-500 bg-emerald-50 border border-emerald-200';
    if (status === 'Declined') return 'text-red-500 bg-red-50 border border-red-200';
    return 'text-orange-500 bg-orange-50 border border-orange-200';
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setEditFormData({ name: pkg.name, price: pkg.price, features: [...pkg.features] });
    setActiveTab('edit_package');
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    updatePackage(editingPackage.id, {
      name: editFormData.name,
      price: parseInt(editFormData.price),
      features: editFormData.features
    });
    setEditingPackage(null);
    setActiveTab('packages');
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 font-['Inter',sans-serif] text-slate-800 bg-slate-50 min-h-screen">
      
      {/* ── MOBILE DASHBOARD TAB (HOME) ── */}
      {activeTab === 'bookings' && (
        <div className="lg:hidden space-y-7 px-4 pt-4">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-[#4f46e5] to-[#3b82f6] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200/50">
             <div className="relative z-10">
                <p className="text-sm font-medium opacity-80">Welcome back,</p>
                <h2 className="text-3xl font-black mt-1 flex items-center gap-2">Admin 👋</h2>
                <p className="text-[12px] mt-4 font-medium opacity-70">Here's what's happening today.</p>
             </div>
             <div className="absolute right-[-20px] top-4 opacity-20 transform rotate-12 scale-110">
                <div className="relative w-32 h-32 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
                   <div className="h-8 bg-white/20 border-b border-white/10"></div>
                   <div className="flex-1 grid grid-cols-3 gap-2 p-3 opacity-50">
                      {[...Array(9)].map((_, i) => <div key={i} className="w-4 h-4 bg-white/40 rounded-sm"></div>)}
                   </div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className="text-white" size={48} strokeWidth={3} />
                   </div>
                </div>
             </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4">
             <h3 className="text-lg font-black text-slate-800 ml-1">Overview</h3>
             <div className="grid grid-cols-2 gap-4">
                {statsData.map((stat, i) => (
                  <MobileStatCard key={i} {...stat} />
                ))}
             </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between ml-1">
                <h3 className="text-lg font-black text-slate-800">Recent Bookings</h3>
                <button className="text-[14px] font-bold text-indigo-600" onClick={() => setActiveTab('bookings')}>View all</button>
             </div>
             <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50">
                {myBookings.length === 0 ? (
                  <p className="text-center py-6 text-slate-400 text-sm font-medium">No bookings found</p>
                ) : (
                  myBookings.slice(0, 3).map((booking) => (
                    <MobileBookingItem key={booking.id} booking={booking} onClick={() => setSelectedBooking(booking)} />
                  ))
                )}
             </div>
          </div>

          {/* Quick Actions Section */}
          <div className="space-y-4 pb-4">
             <h3 className="text-lg font-black text-slate-800 ml-1">Quick Actions</h3>
             <div className="grid grid-cols-4 gap-4 px-1">
                {[
                  { icon: Plus, label: 'New Booking', bg: 'bg-indigo-50', color: 'text-indigo-600', action: () => {} },
                  { icon: LayoutDashboard, label: 'All Bookings', bg: 'bg-emerald-50', color: 'text-emerald-600', action: () => setActiveTab('bookings') },
                  { icon: BarChart3, label: 'Reports', bg: 'bg-violet-50', color: 'text-violet-600', action: () => {} },
                  { icon: Settings, label: 'Settings', bg: 'bg-slate-100', color: 'text-slate-600', action: () => {} },
                ].map((action, i) => (
                  <div key={i} className="flex flex-col items-center gap-2.5">
                     <button onClick={action.action} className={`w-15 h-15 rounded-[22px] flex items-center justify-center ${action.bg} ${action.color} active:scale-90 transition-all shadow-sm border border-white`}>
                        <action.icon size={26} strokeWidth={2.5} />
                     </button>
                     <span className="text-[11px] font-bold text-slate-500 text-center leading-tight">{action.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ── SHARED CONTENT (MOBILE & DESKTOP) ── */}
      <div className="px-4 lg:px-10 pt-4 lg:pt-10">
        
        {/* DESKTOP HEADER (Hidden on Mobile Dashboard Tab) */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h2 className="text-[32px] font-black text-slate-800">
            {activeTab === 'bookings' ? 'Reservation Dashboard' : 
             activeTab === 'packages' ? 'Package Management' : 
             activeTab === 'calendar' ? 'Event Calendar' : 'Dashboard'}
          </h2>
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-12 py-3.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {/* BOOKINGS TABLE (Visible on Desktop & Mobile if Bookings tab active) */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {statsData.map((stat, i) => <StatCard key={i} {...stat} />)}
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
                  <thead>
                    <tr className="border-b border-slate-50 text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                      <th className="py-7 px-8">Customer & Event</th>
                      <th className="py-7 px-4">Status</th>
                      <th className="py-7 px-4 hidden md:table-cell">Venue</th>
                      <th className="py-7 px-4">Date</th>
                      <th className="py-7 px-8 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-20 text-slate-400 text-sm font-semibold italic">No bookings found</td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} onClick={() => setSelectedBooking(booking)} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                          <td className="py-6 px-8">
                            <p className="font-bold text-slate-800 text-[15px]">{booking.eventName || 'Unnamed Event'}</p>
                            <p className="text-[12px] text-slate-500 font-bold mt-1">👤 {booking.customerName}</p>
                            <p className="text-[11px] text-indigo-600 font-black uppercase mt-2 bg-indigo-50 inline-block px-3 py-1 rounded-full border border-indigo-100">{booking.packageName}</p>
                          </td>
                          <td className="py-6 px-4">
                            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyle(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-6 px-4 text-[14px] text-slate-600 font-bold hidden md:table-cell truncate max-w-[200px]">{booking.location}</td>
                          <td className="py-6 px-4 text-[14px] text-slate-600 font-bold">{booking.date}</td>
                          <td className="py-6 px-8 text-right">
                            {booking.status === 'Pending' ? (
                              <button onClick={(e) => { e.stopPropagation(); updateBookingStatus(booking.id, 'Confirmed'); }} className="px-4 py-2 bg-emerald-500 text-white font-bold text-[11px] rounded-xl shadow-lg shadow-emerald-100">Approve</button>
                            ) : (
                              <ChevronRight className="inline-block text-slate-300" size={20} />
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PACKAGES TAB (Responsive) */}
        {activeTab === 'packages' && (
          <div className="space-y-12">
            {['mobile_bar', 'coffee_bar', 'pica_pica'].map(cat => (
              <div key={cat} className="space-y-6">
                <h3 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-tight px-2">{cat.replace(/_/g, ' ')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {packages.filter(p => p.category === cat).map(pkg => (
                    <div key={pkg.id} className="bg-white rounded-[32px] p-8 lg:p-10 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                      <div>
                        <h4 className={`text-[20px] lg:text-[24px] font-black text-indigo-600 uppercase italic tracking-tight mb-2`}>{pkg.name}</h4>
                        <p className="text-[28px] lg:text-[32px] font-black text-slate-800 mb-6 lg:mb-8">₱{pkg.price.toLocaleString()}</p>
                        <ul className="space-y-4 mb-8 lg:mb-10">
                          {pkg.features.map((f, i) => (
                            <li key={i} className="text-[13px] lg:text-[14px] text-slate-500 font-bold flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="w-full py-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-black text-[12px] lg:text-[13px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3"
                      >
                        <Edit3 size={18} /> Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR TAB (Responsive) */}
        {activeTab === 'calendar' && (
          <div className="bg-white p-6 lg:p-10 rounded-[32px] shadow-sm border border-slate-100 max-w-4xl mx-auto overflow-hidden">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date }) => {
                const dateStr = date.toISOString().split('T')[0];
                return bookedDates.includes(dateStr) ? 'booked-date' : '';
              }}
            />
          </div>
        )}
      </div>

      {/* ── SHARED MODALS ── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-[32px] lg:rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border border-slate-100" onClick={e => e.stopPropagation()}>
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-slate-400 hover:text-slate-800 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-y-auto max-h-[75vh]">
               {/* Content identical to previous version but with better mobile spacing */}
               <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                  <span className={`px-4 py-1.5 rounded-full text-[12px] font-black ${getStatusStyle(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ID</p>
                  <p className="text-sm font-black text-slate-800">#{String(selectedBooking.id).padStart(6, '0')}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customer & Event</p>
                <p className="font-black text-slate-800 text-lg">{selectedBooking.eventName}</p>
                <p className="text-sm text-slate-600 font-bold mt-1">👤 {selectedBooking.customerName}</p>
                <p className="text-sm text-slate-500 font-bold mt-1">📞 {selectedBooking.customerPhone || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4">
                  <Package size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Package</p>
                    <p className="font-bold text-slate-800">{selectedBooking.packageName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CalendarIcon size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Schedule</p>
                    <p className="font-bold text-slate-800">{selectedBooking.date} at {selectedBooking.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Venue</p>
                    <p className="font-bold text-slate-800">{selectedBooking.location}</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedBooking.status === 'Pending' && (
              <div className="p-6 lg:p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
                <button onClick={() => { updateBookingStatus(selectedBooking.id, 'Confirmed'); setSelectedBooking(null); }} className="flex-1 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 active:scale-95 transition-all">
                  Approve
                </button>
                <button onClick={() => { updateBookingStatus(selectedBooking.id, 'Declined'); setSelectedBooking(null); }} className="px-6 py-4 bg-white text-rose-500 border border-rose-200 font-black rounded-2xl active:scale-95 transition-all">
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {activeTab === 'edit_package' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
           <div className="max-w-xl w-full bg-white shadow-2xl border border-slate-100 rounded-[32px] p-8 lg:p-12 space-y-8">
              <h3 className="text-[24px] lg:text-[28px] font-black text-slate-800 tracking-tight">Edit {editingPackage?.name}</h3>
              <form onSubmit={handleSavePackage} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Package Name</label>
                  <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Price (₱)</label>
                  <input type="number" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-all">Save Changes</button>
                  <button type="button" onClick={() => setActiveTab('packages')} className="px-8 py-4 bg-white text-slate-600 font-black rounded-2xl border border-slate-200 active:scale-95 transition-all">Cancel</button>
                </div>
              </form>
           </div>
        </div>
      )}

      <style>{`
        .react-calendar { background: transparent !important; border: none !important; width: 100% !important; color: #1e293b !important; font-family: 'Inter', sans-serif !important; }
        .react-calendar__tile { padding: 1.5em 0.5em !important; border-radius: 15px !important; color: #64748b !important; font-weight: 800 !important; font-size: 13px !important; transition: all 0.3s; }
        .react-calendar__tile:enabled:hover { background: #f1f5f9 !important; color: #4f46e5 !important; }
        .react-calendar__tile--active { background: #4f46e5 !important; color: white !important; box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4) !important; }
        .booked-date { background: #10b981 !important; color: white !important; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4) !important; }
        .react-calendar__navigation button { color: #0f172a !important; font-weight: 900 !important; font-size: 18px !important; }
      `}</style>
    </div>
  );
}
