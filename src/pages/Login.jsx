import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid Credentials');
    }
  };

  // Theme-aware styles
  const bg = isDarkMode ? 'bg-[#030014]' : 'bg-[#F8FAFC]';
  const textColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200';
  const inputTextColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const labelColor = isDarkMode ? 'text-slate-500' : 'text-slate-400';
  const portalLabel = isDarkMode ? 'text-slate-500' : 'text-slate-500';

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',_sans-serif] transition-colors duration-500 ${textColor}`}>
      {/* Background Ambient Glows */}
      <div className={`absolute top-[-100px] right-[-100px] w-[500px] h-[500px] ${isDarkMode ? 'bg-violet-600/10' : 'bg-indigo-500/5'} blur-[120px] rounded-full`}></div>
      <div className={`absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] ${isDarkMode ? 'bg-cyan-500/10' : 'bg-pink-500/5'} blur-[120px] rounded-full`}></div>

      <div className="w-full max-w-[400px] relative z-10">
        <div className="text-center mb-10">
          <div className={`w-20 h-20 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border ${isDarkMode ? 'border-white/10 shadow-violet-500/30' : 'border-indigo-100 shadow-indigo-500/20'}`}>
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className={`text-3xl font-black uppercase tracking-[0.2em] italic mb-1 ${textColor}`}>
            Admin <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-violet-400 to-cyan-400' : 'from-indigo-600 to-pink-500'}`}>Portal</span>
          </h1>
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] ${portalLabel}`}>Secret Corner Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${labelColor}`}>Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                className={`block w-full pl-12 pr-4 py-4 ${inputBg} rounded-2xl ${inputTextColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all relative z-20 pointer-events-auto`}
                placeholder="Admin ID"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${labelColor}`}>Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-12 pr-12 py-4 ${inputBg} rounded-2xl ${inputTextColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all relative z-20 pointer-events-auto`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 text-xs font-bold text-center py-2">{error}</div>}

          <button
            type="submit"
            className={`w-full font-black uppercase tracking-widest py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl group ${isDarkMode ? 'bg-white text-black hover:bg-violet-600 hover:text-white shadow-white/5' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20'}`}
          >
            <span>Authorize Session</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className={`w-full mt-8 text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-indigo-600'}`}
        >
          ← Return to Customer Site
        </button>
      </div>
    </div>
  );
}
