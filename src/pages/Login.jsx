import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, User, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6 relative overflow-hidden font-['Outfit'] text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[400px] relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-white/10">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-[0.2em] italic mb-1">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Portal</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Secret Corner Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all backdrop-blur-sm"
                placeholder="Admin ID"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all backdrop-blur-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="text-red-400 text-xs font-bold text-center py-2">{error}</div>}

          <button
            type="submit"
            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-violet-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-violet-500/20 group"
          >
            <span>Authorize Session</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white transition-colors"
        >
          ← Return to Customer Site
        </button>
      </div>
    </div>
  );
}
