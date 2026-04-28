import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const success = await login(username, password); 
    
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError(true);
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="relative p-[2px] bg-linear-to-b from-red-600 to-yellow-500 rounded-lg shadow-[0_0_30px_rgba(211,0,0,0.2)]">
        <div className="bg-[#121212] p-10 rounded-lg w-96 border border-white/5">
          <div className="text-center mb-10">
            <h1 className="sonic-title text-5xl text-red-600 mb-2 drop-shadow-md">EGG-DATA</h1>
            <div className="h-1 w-20 bg-yellow-500 mx-auto mb-2"></div>
            <p className="sonic-ui text-[9px] text-gray-500 tracking-[0.3em] uppercase">Logistics & Control</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-[10px] sonic-ui text-yellow-500/70 mb-2 uppercase tracking-widest">Unit Designation</label>
                <input 
                type="text" 
                className="w-full bg-black border border-white/10 p-3 text-white rounded outline-none focus:border-red-600 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>

            <div>
                <label className="block text-[10px] sonic-ui text-yellow-500/70 mb-2 uppercase tracking-widest">Access Code</label>
                <input 
                type="password" 
                className="w-full bg-black border border-white/10 p-3 text-white rounded outline-none focus:border-red-600 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            {error && <p className="text-red-500 text-[10px] italic">IDENTIFICATION FAILED. ACCESS DENIED.</p>}

            <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 rounded sonic-ui text-xs tracking-[0.2em] transition-all"
            >
                {loading ? 'SYNCHRONIZING...' : 'INITIALIZE LOGIN'}
            </button>
        </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
             <span className="text-[8px] text-gray-600 sonic-ui uppercase tracking-widest text-center">
               Egg-Net Connection: Secure
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};