import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { UserRank } from '../types/user';

export const Recruitment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rank: 'RECRUIT' as UserRank,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await api.post('/users', formData);
      setStatus('success');
      
      // Limpa o formulário após 2 segundos e volta ao estado normal
      setTimeout(() => {
        setStatus('idle');
        setFormData({ userName: '', password: '', rank: 'RECRUIT' });
      }, 2000);
      
    } catch (err: any) {
      setStatus('error');
      // Tenta pegar a mensagem de erro que vem do seu GlobalExceptionHandler do Java
      setErrorMessage(
        err.response?.data?.error || 
        'ERRO DE CONEXÃO COM A EGG-NET. TENTE NOVAMENTE.'
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-10 animate-egg-in">
      <div className="max-w-2xl mx-auto w-full">
        <div className="border-b-2 border-yellow-600 mb-8 pb-4">
          <h1 className="sonic-title text-4xl text-yellow-500 tracking-tighter">
            PERSONNEL RECRUITMENT
          </h1>
          <p className="sonic-ui text-gray-500 text-xs tracking-[0.3em] uppercase mt-2">
            Register new operatives to the Eggman Empire
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-lg border border-white/10 shadow-[0_10px_30px_rgba(202,138,4,0.05)]">
          
          <div className="space-y-6">
            {/* User Name */}
            <div>
              <label className="block sonic-ui text-yellow-600 text-[10px] tracking-widest uppercase mb-2">
                Operative Codename
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className="w-full bg-black border border-white/20 text-white p-3 font-outfit focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Ex: Metal_Sonic_02"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block sonic-ui text-yellow-600 text-[10px] tracking-widest uppercase mb-2">
                Security Passcode
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-black border border-white/20 text-white p-3 font-outfit focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Rank Selection */}
            <div>
              <label className="block sonic-ui text-yellow-600 text-[10px] tracking-widest uppercase mb-2">
                Assigned Rank
              </label>
              <select
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value as UserRank })}
                className="w-full bg-black border border-white/20 text-white p-3 font-outfit focus:border-yellow-500 focus:outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat cursor-pointer"
              >
                {/* As classes bg-black text-white aqui evitam que o dropdown fique branco no Windows ao clicar */}
                <option value="RECRUIT" className="bg-black text-white">RECRUIT (Novato)</option>
                <option value="ROBOT" className="bg-black text-white">ROBOT (Peão/Badnik)</option>
                <option value="GENERAL" className="bg-black text-white">GENERAL (Comandante)</option>
                <option value="EGG_MASTER" className="bg-black text-white">EGG_MASTER (Líder Supremo)</option>
              </select>
            </div>
          </div>

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="mt-6 p-3 bg-green-900/30 border border-green-500 text-green-400 sonic-ui text-xs text-center uppercase">
              Operative successfully registered to Egg-Net!
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 p-3 bg-red-900/30 border border-red-500 text-red-400 sonic-ui text-xs text-center uppercase">
              {errorMessage}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="mt-10 flex gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black font-black sonic-ui text-sm p-4 uppercase tracking-widest transition-colors disabled:opacity-50 cursor-pointer"
            >
              {status === 'loading' ? 'PROCESSING...' : 'AUTHORIZE_REGISTRATION'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 border border-white/20 hover:border-white/50 text-white font-black sonic-ui text-sm uppercase tracking-widest transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};