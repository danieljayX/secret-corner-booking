import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-[380px] w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white p-2 rounded-full border border-slate-100 shadow-sm flex items-center justify-center mb-6">
            <Box size={48} className="text-[#1a4d2e]" />
          </div>
          
          <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase text-center leading-none mb-1">
            Barangay
          </h1>
          <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase text-center mb-8">
            Inventory System
          </h2>

          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-[10px] font-bold border border-red-100 uppercase">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight ml-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-all"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-all"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a4d2e] text-white font-bold py-3.5 rounded-lg shadow-lg shadow-green-900/10 hover:bg-[#2d6a4f] active:scale-[0.98] transition-all disabled:opacity-70 text-xs uppercase tracking-widest mt-4"
            >
              {isLoading ? 'Processing...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="pb-8 text-center text-slate-300 text-[10px] font-bold uppercase tracking-tighter">
          <p>&copy; 2026 Barangay Inventory System</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
