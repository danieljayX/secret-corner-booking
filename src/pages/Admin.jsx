import { useState, useContext, useMemo, useEffect } from 'react';
import { BookingContext } from '../context/BookingContext';
import { ThemeContext } from '../context/ThemeContext';
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
  Bell,
  HelpCircle
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StatCard = ({ title, value, icon: Icon, color, bg, trend, isDarkMode }) => {
  return (
    <div className={`rounded-[24px] p-6 shadow-sm border flex flex-col justify-between h-full group hover:shadow-md transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
      <div className="flex justify-between items-center mb-4">
        <p className={`text-[13px] font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>{title}</p>
        <div className={`p-2 rounded-xl ${bg} ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className={`text-[28px] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{value}</h3>
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
            <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>from yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileStatCard = ({ title, value, icon: Icon, color, trend, bg, isDarkMode }) => (
  <div className={`rounded-[24px] p-4 border shadow-sm flex flex-col gap-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
    <div className="flex items-center justify-between">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg} ${color} shrink-0`}>
        <Icon size={18} />
      </div>
      {trend > 0 ? (
        <span className="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">
          <TrendingUp size={10} /> {trend}%
        </span>
      ) : (
        <span className="text-[10px] font-black text-rose-500 flex items-center gap-0.5">
          <TrendingDown size={10} /> {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <h4 className={`text-[22px] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h4>
      <p className={`text-[9px] font-black uppercase tracking-[0.1em] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
    </div>
  </div>
);

const MobileBookingItem = ({ booking, onClick, isDarkMode }) => (
  <div onClick={onClick} className={`flex items-center gap-4 py-4 border-b last:border-0 transition-colors ${isDarkMode ? 'border-slate-800 active:bg-slate-800' : 'border-slate-50 active:bg-slate-50'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
      {booking.packageName?.includes('Bar') ? (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-500'}`}>
           <Package size={24} />
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-rose-900/30 text-rose-400' : 'bg-rose-50 text-rose-500'}`}>
           <User size={24} />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={`text-[14px] font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{booking.customerName}</h4>
      <p className={`text-[11px] font-bold truncate mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{booking.location}</p>
      <p className={`text-[10px] font-black uppercase tracking-wider mt-1.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{booking.date}</p>
    </div>
    <div className="flex flex-col items-end gap-2 shrink-0">
       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
         booking.status === 'Confirmed' ? (isDarkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : 
         booking.status === 'Declined' ? (isDarkMode ? 'bg-rose-900/30 text-rose-400' : 'bg-rose-50 text-rose-600') : (isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600')
       }`}>
         {booking.status === 'Confirmed' ? 'Confirmed' : booking.status === 'Declined' ? 'Cancelled' : 'Pending'}
       </span>
       <ChevronRight size={18} className="text-slate-300" />
    </div>
  </div>
);

export default function Admin({ defaultTab = 'bookings' }) {
  const { myBookings, updateBookingStatus, bookedDates, packages, updatePackage } = useContext(BookingContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync activeTab with defaultTab prop when route changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
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
      { 
        title: 'Total Bookings', 
        value: total, 
        icon: CalendarIcon, 
        color: isDarkMode ? 'text-indigo-400' : 'text-indigo-600', 
        bg: isDarkMode ? 'bg-indigo-950/40' : 'bg-indigo-50', 
        trend: 12 
      },
      { 
        title: 'Confirmed', 
        value: confirmed, 
        icon: CheckCircle, 
        color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600', 
        bg: isDarkMode ? 'bg-emerald-950/40' : 'bg-emerald-50', 
        trend: 8 
      },
      { 
        title: 'Pending', 
        value: pending, 
        icon: Clock, 
        color: isDarkMode ? 'text-orange-400' : 'text-orange-600', 
        bg: isDarkMode ? 'bg-orange-950/40' : 'bg-orange-50', 
        trend: -5 
      },
      { 
        title: 'Cancelled', 
        value: cancelled, 
        icon: XCircle, 
        color: isDarkMode ? 'text-red-400' : 'text-red-600', 
        bg: isDarkMode ? 'bg-red-950/40' : 'bg-red-50', 
        trend: -2 
      },
    ];
  }, [myBookings, isDarkMode]);

  const filteredBookings = myBookings.filter(booking => {
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const name = (booking.customerName || '').toLowerCase();
    const pkg = (booking.packageName || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return matchesStatus && (name.includes(query) || pkg.includes(query));
  });

  const getStatusStyle = (status) => {
    if (status === 'Confirmed') return isDarkMode ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-900/50' : 'text-emerald-600 bg-emerald-50 border border-emerald-100';
    if (status === 'Declined') return isDarkMode ? 'text-red-400 bg-red-950/30 border border-red-900/50' : 'text-red-600 bg-red-50 border border-red-100';
    return isDarkMode ? 'text-orange-400 bg-orange-950/30 border border-orange-900/50' : 'text-orange-600 bg-orange-50 border border-orange-100';
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

  const bg = isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]';
  const textColor = isDarkMode ? 'text-slate-100' : 'text-slate-900';

  return (
    <div className={`max-w-7xl mx-auto pb-24 font-['Plus_Jakarta_Sans',_sans-serif] transition-colors duration-500 min-h-screen overflow-x-hidden ${bg} ${textColor}`}>
      
      {/* ── MOBILE DASHBOARD TAB ── */}
      {activeTab === 'bookings' && (
        <div className="lg:hidden space-y-7 px-4 pt-4">
          {/* Hero Card */}
          <div className={`rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl transition-all ${isDarkMode ? 'bg-gradient-to-br from-[#1e1b4b] to-[#312e81] shadow-indigo-900/20' : 'bg-gradient-to-br from-[#4f46e5] to-[#3b82f6] shadow-indigo-200/50'}`}>
             <div className="relative z-10">
                <p className="text-sm font-medium opacity-80">Welcome back,</p>
                <h2 className="text-3xl font-black mt-1 flex items-center gap-2">Admin 👋</h2>
                <p className="text-[12px] mt-4 font-medium opacity-70">Here's what's happening today.</p>
             </div>
             <div className="absolute right-[-20px] top-4 opacity-20 transform rotate-12 scale-110">
                <div className={`relative w-32 h-32 rounded-2xl shadow-lg flex flex-col overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                   <div className={`h-8 border-b ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-white/20 border-white/10'}`}></div>
                   <div className="flex-1 grid grid-cols-3 gap-2 p-3 opacity-50">
                      {[...Array(9)].map((_, i) => <div key={i} className={`w-4 h-4 rounded-sm ${isDarkMode ? 'bg-slate-600' : 'bg-indigo-100'}`}></div>)}
                   </div>
                </div>
             </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4">
             <h3 className={`text-lg font-black ml-1 ${textColor}`}>Overview</h3>
             <div className="grid grid-cols-2 gap-4">
                {statsData.map((stat, i) => (
                  <MobileStatCard key={i} {...stat} isDarkMode={isDarkMode} />
                ))}
             </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between ml-1">
                <h3 className={`text-lg font-black ${textColor}`}>Recent Bookings</h3>
                <button className={`text-[14px] font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} onClick={() => setActiveTab('bookings')}>View all</button>
             </div>
             <div className={`rounded-[32px] p-6 shadow-sm border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50'}`}>
                {myBookings.length === 0 ? (
                  <p className={`text-center py-6 text-sm font-medium ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>No bookings found</p>
                ) : (
                  myBookings.slice(0, 3).map((booking) => (
                    <MobileBookingItem key={booking.id} booking={booking} onClick={() => setSelectedBooking(booking)} isDarkMode={isDarkMode} />
                  ))
                )}
             </div>
          </div>

          {/* Quick Actions Section */}
          <div className="space-y-4 pb-4">
             <h3 className={`text-lg font-black ml-1 ${textColor}`}>Quick Actions</h3>
             <div className="grid grid-cols-4 gap-4 px-1">
                {[
                  { icon: Plus, label: 'New Booking', bg: isDarkMode ? 'bg-indigo-900/30' : 'bg-indigo-50', color: isDarkMode ? 'text-indigo-400' : 'text-indigo-600', action: () => {} },
                  { icon: LayoutDashboard, label: 'All Bookings', bg: isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50', color: isDarkMode ? 'text-emerald-400' : 'text-emerald-600', action: () => setActiveTab('bookings') },
                  { icon: BarChart3, label: 'Reports', bg: isDarkMode ? 'bg-violet-900/30' : 'bg-violet-50', color: isDarkMode ? 'text-violet-400' : 'text-violet-600', action: () => {} },
                  { icon: Settings, label: 'Settings', bg: isDarkMode ? 'bg-slate-800' : 'bg-slate-100', color: isDarkMode ? 'text-slate-400' : 'text-slate-600', action: () => {} },
                ].map((action, i) => (
                  <div key={i} className="flex flex-col items-center gap-2.5">
                     <button onClick={action.action} className={`w-15 h-15 rounded-[22px] flex items-center justify-center ${action.bg} ${action.color} active:scale-90 transition-all shadow-sm border ${isDarkMode ? 'border-slate-700' : 'border-white'}`}>
                        <action.icon size={26} strokeWidth={2.5} />
                     </button>
                     <span className={`text-[11px] font-bold text-center leading-tight ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{action.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ── SHARED CONTENT ── */}
      <div className="px-4 lg:px-10 pt-4 lg:pt-10">
        
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h2 className={`text-[32px] font-black ${textColor}`}>
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
              autoComplete="off"
              className={`w-full pl-6 pr-12 py-3.5 border rounded-full text-sm placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all relative z-10 pointer-events-auto ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-700'}`}
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {statsData.map((stat, i) => <StatCard key={i} {...stat} isDarkMode={isDarkMode} />)}
            </div>

            <div className={`rounded-[32px] shadow-sm border overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
                  <thead>
                    <tr className={`border-b text-[11px] font-black uppercase tracking-[0.15em] ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                      <th className="py-7 px-8">Customer & Event</th>
                      <th className="py-7 px-4">Status</th>
                      <th className="py-7 px-4 hidden md:table-cell">Venue</th>
                      <th className="py-7 px-4">Date</th>
                      <th className="py-7 px-8 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-20 text-slate-400 text-sm font-semibold italic">No bookings found</td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} onClick={() => setSelectedBooking(booking)} className={`transition-colors group cursor-pointer ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                          <td className="py-6 px-8">
                            <p className={`font-bold text-[15px] ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{booking.eventName || 'Unnamed Event'}</p>
                            <p className={`text-[12px] font-bold mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>👤 {booking.customerName}</p>
                            <p className={`text-[11px] font-black uppercase mt-2 inline-block px-3 py-1 rounded-full border transition-all ${isDarkMode ? 'text-indigo-400 bg-indigo-900/30 border-indigo-800' : 'text-indigo-600 bg-indigo-50 border-indigo-100'}`}>{booking.packageName}</p>
                          </td>
                          <td className="py-6 px-4">
                            <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyle(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className={`py-6 px-4 text-[14px] font-bold hidden md:table-cell truncate max-w-[200px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{booking.location}</td>
                          <td className={`py-6 px-4 text-[14px] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{booking.date}</td>
                          <td className="py-6 px-8 text-right">
                            {booking.status === 'Pending' ? (
                              <button onClick={(e) => { e.stopPropagation(); updateBookingStatus(booking.id, 'Confirmed'); }} className="px-4 py-2 bg-emerald-500 text-white font-bold text-[11px] rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">Approve</button>
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

        {/* PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div className="space-y-12">
            {['mobile_bar', 'coffee_bar', 'pica_pica'].map(cat => (
              <div key={cat} className="space-y-6">
                <h3 className={`text-xl lg:text-2xl font-black uppercase tracking-tight px-2 ${textColor}`}>{cat.replace(/_/g, ' ')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {packages.filter(p => p.category === cat).map(pkg => (
                    <div key={pkg.id} className={`rounded-[32px] p-8 lg:p-10 shadow-sm border flex flex-col justify-between group hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                      <div>
                        <h4 className={`text-[20px] lg:text-[24px] font-black uppercase italic tracking-tight mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pkg.name}</h4>
                        <p className={`text-[28px] lg:text-[32px] font-black mb-6 lg:mb-8 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>₱{pkg.price.toLocaleString()}</p>
                        <ul className="space-y-4 mb-8 lg:mb-10">
                          {pkg.features.map((f, i) => (
                            <li key={i} className={`text-[13px] lg:text-[14px] font-bold flex items-center gap-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className={`w-full py-4 rounded-2xl border font-black text-[12px] lg:text-[13px] uppercase tracking-widest transition-colors flex justify-center items-center gap-3 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
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

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className={`p-6 lg:p-10 rounded-[32px] shadow-sm border max-w-4xl mx-auto overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
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

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h3 className={`text-2xl font-black uppercase tracking-tight ${textColor}`}>Customer Database</h3>
            <div className={`rounded-[32px] border overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`border-b text-[12px] font-bold uppercase tracking-widest ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-50 text-slate-400'}`}>
                      <th className="py-6 px-8">Name</th>
                      <th className="py-6 px-4">Contact</th>
                      <th className="py-6 px-4">Bookings</th>
                      <th className="py-6 px-8 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
                    {[...new Set(myBookings.map(b => b.customerName))].map((name, i) => {
                      const customerBookings = myBookings.filter(b => b.customerName === name);
                      return (
                        <tr key={i} className={`transition-all ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                          <td className={`py-5 px-8 font-bold ${textColor}`}>{name}</td>
                          <td className="py-5 px-4 text-sm text-slate-400">{customerBookings[0]?.customerPhone || 'N/A'}</td>
                          <td className="py-5 px-4"><span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-black">{customerBookings.length} Events</span></td>
                          <td className="py-5 px-8 text-right"><span className="text-[10px] font-black uppercase text-emerald-500">Active Guest</span></td>
                        </tr>
                      )
                    })}
                    {myBookings.length === 0 && (
                      <tr><td colSpan="4" className="py-10 text-center text-slate-500 font-bold uppercase italic">No customers found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h3 className={`text-2xl font-black uppercase tracking-tight ${textColor}`}>Performance Insights</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`p-8 rounded-[32px] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Monthly Revenue</h4>
                <div className="h-64 flex items-end gap-3 px-4">
                  {[40, 65, 45, 90, 55, 80, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                      <div className={`w-full rounded-t-xl transition-all duration-500 group-hover:scale-y-110 ${isDarkMode ? 'bg-indigo-500/30 group-hover:bg-indigo-500' : 'bg-indigo-100 group-hover:bg-indigo-600'}`} style={{ height: `${h}%` }}></div>
                      <span className="text-[10px] font-black text-slate-500">M0{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-8 rounded-[32px] border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Booking Distribution</h4>
                <div className="space-y-6">
                  {['Mobile Bar', 'Coffee Bar', 'Pica Pica'].map((cat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span className={textColor}>{cat}</span>
                        <span className="text-indigo-500">{[75, 45, 30][i]}%</span>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${[75, 45, 30][i]}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className={`h-[70vh] rounded-[32px] border overflow-hidden flex transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className={`w-1/3 border-r ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} p-6 hidden md:block`}>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Messages</h4>
              <div className="space-y-4">
                {['Juan Dela Cruz', 'Maria Santos', 'Robert Garcia'].map((name, i) => (
                  <div key={i} className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all ${i === 0 ? (isDarkMode ? 'bg-slate-800' : 'bg-indigo-50') : 'hover:bg-slate-800/30'}`}>
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black">{name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${textColor}`}>{name}</p>
                      <p className="text-[10px] text-slate-500 truncate">I'd like to ask about...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-8 items-center justify-center text-center">
               <div className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <MessageSquare size={32} className="text-indigo-500" />
               </div>
               <h3 className={`text-xl font-black uppercase italic tracking-widest ${textColor}`}>Message Portal</h3>
               <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed uppercase font-bold tracking-widest">Secure customer communication module coming soon in the next update.</p>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <h3 className={`text-2xl font-black uppercase tracking-tight ${textColor}`}>System Settings</h3>
            <div className={`p-8 rounded-[32px] border space-y-8 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Business Profile</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Business Name</label>
                    <input type="text" defaultValue="Secret Corner" className={`w-full px-5 py-3.5 border rounded-2xl font-bold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Email</label>
                    <input type="email" defaultValue="admin@secretcorner.com" className={`w-full px-5 py-3.5 border rounded-2xl font-bold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'}`} />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">Save Configuration</button>
              </div>
            </div>
          </div>
        )}

        {/* HELP TAB */}
        {activeTab === 'help' && (
          <div className="space-y-8 max-w-3xl mx-auto text-center py-12">
            <div className={`w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center ${isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
               <HelpCircle size={40} className="text-indigo-500" />
            </div>
            <h3 className={`text-3xl font-black uppercase tracking-tight ${textColor}`}>How can we help?</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Explore our documentation or contact support.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
               {[
                 { title: 'User Manual', desc: 'Step-by-step guide to management' },
                 { title: 'Video Tutorials', desc: 'Visual walk-through of features' },
                 { title: 'Direct Support', desc: 'Chat with our technical team' },
                 { title: 'System Logs', desc: 'Monitor application health' }
               ].map((item, i) => (
                 <div key={i} className={`p-8 rounded-[32px] border text-left cursor-pointer transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500' : 'bg-white border-slate-100 hover:border-indigo-500'}`}>
                    <h4 className={`font-black uppercase italic ${textColor}`}>{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-bold">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* SHARED MODALS */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md" onClick={() => setSelectedBooking(null)}>
          <div className={`rounded-[32px] lg:rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-indigo-950/20' : 'bg-white border-slate-100 shadow-indigo-500/10'}`} onClick={e => e.stopPropagation()}>
            <div className={`p-8 lg:p-10 border-b flex items-center justify-between ${isDarkMode ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50/50 border-slate-50'}`}>
              <h3 className={`text-xl lg:text-2xl font-black tracking-tight italic uppercase ${textColor}`}>Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-slate-400 hover:text-rose-500 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 overflow-y-auto max-h-[75vh]">
               <div className="flex items-center justify-between">
                <div>
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Status</p>
                  <span className={`px-4 py-1.5 rounded-full text-[12px] font-black ${getStatusStyle(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ID</p>
                  <p className={`text-sm font-black ${textColor}`}>#{String(selectedBooking.id).padStart(6, '0')}</p>
                </div>
              </div>
              <div className={`rounded-2xl p-5 border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Customer & Event</p>
                <p className={`font-black text-lg ${textColor}`}>{selectedBooking.eventName}</p>
                <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>👤 {selectedBooking.customerName}</p>
                <p className={`text-sm font-bold mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>📞 {selectedBooking.customerPhone || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4">
                  <Package size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Package</p>
                    <p className={`font-bold ${textColor}`}>{selectedBooking.packageName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CalendarIcon size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Schedule</p>
                    <p className={`font-bold ${textColor}`}>{selectedBooking.date} at {selectedBooking.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-slate-400 mt-1" />
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Venue</p>
                    <p className={`font-bold ${textColor}`}>{selectedBooking.location}</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedBooking.status === 'Pending' && (
              <div className={`p-6 lg:p-8 border-t flex gap-4 ${isDarkMode ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50/50 border-slate-50'}`}>
                <button onClick={() => { updateBookingStatus(selectedBooking.id, 'Confirmed'); setSelectedBooking(null); }} className="flex-1 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
                  Approve
                </button>
                <button onClick={() => { updateBookingStatus(selectedBooking.id, 'Declined'); setSelectedBooking(null); }} className={`px-6 py-4 border font-black rounded-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 border-rose-900 text-rose-400 hover:bg-rose-950' : 'bg-white border-rose-200 text-rose-500 hover:bg-rose-50'}`}>
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {activeTab === 'edit_package' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
           <div className={`max-w-xl w-full shadow-2xl border rounded-[32px] p-8 lg:p-12 space-y-8 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-indigo-950/20' : 'bg-white border-slate-100 shadow-indigo-500/10'}`}>
              <h3 className={`text-[24px] lg:text-[28px] font-black tracking-tight ${textColor}`}>Edit {editingPackage?.name}</h3>
              <form onSubmit={handleSavePackage} className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-[12px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Package Name</label>
                  <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} className={`w-full px-5 py-4 border rounded-xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-[12px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Price (₱)</label>
                  <input type="number" value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} className={`w-full px-5 py-4 border rounded-xl text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`} />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">Save Changes</button>
                  <button type="button" onClick={() => setActiveTab('packages')} className={`px-8 py-4 border font-black rounded-2xl active:scale-95 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>Cancel</button>
                </div>
              </form>
           </div>
        </div>
      )}

      <style>{`
        .react-calendar { background: transparent !important; border: none !important; width: 100% !important; color: ${isDarkMode ? '#f1f5f9' : '#1e293b'} !important; font-family: 'Inter', sans-serif !important; }
        .react-calendar__tile { padding: 1.5em 0.5em !important; border-radius: 15px !important; color: ${isDarkMode ? '#64748b' : '#64748b'} !important; font-weight: 800 !important; font-size: 13px !important; transition: all 0.3s; }
        .react-calendar__tile:enabled:hover { background: ${isDarkMode ? '#1e293b' : '#f1f5f9'} !important; color: #4f46e5 !important; }
        .react-calendar__tile--active { background: #4f46e5 !important; color: white !important; box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4) !important; }
        .booked-date { background: #10b981 !important; color: white !important; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4) !important; }
        .react-calendar__navigation button { color: ${isDarkMode ? 'white' : '#0f172a'} !important; font-weight: 900 !important; font-size: 18px !important; }
        .react-calendar__month-view__weekdays__weekday { color: ${isDarkMode ? '#475569' : '#94a3b8'} !important; }
      `}</style>
    </div>
  );
}
