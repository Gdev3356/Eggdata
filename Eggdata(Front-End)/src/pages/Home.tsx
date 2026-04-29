import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import type { Opponent } from '../types/opponents';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { user, canRegister, logout } = useAuth();
  const [stats, setStats] = useState({ opponents: 0, plans: 0 });
  const [recentOpponents, setRecentOpponents] = useState<Opponent[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [oppResponse, planResponse] = await Promise.all([
          api.get('/opponents?size=3&sort=id,desc'),
          api.get('/plans?size=1')
        ]);

        setStats({
          opponents: oppResponse.data.totalElements,
          plans: planResponse.data.totalElements
        });

        setRecentOpponents(oppResponse.data.content || oppResponse.data);
        
      } catch (err) {
        console.error("Failed to sync with Egg-Net", err);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <nav className="shrink-0 bg-black border-b-2 border-red-900 p-4 flex justify-between items-center z-10">
        <h2 className="sonic-title text-2xl text-red-600 tracking-tighter">EGG-COMMAND</h2>
        <div className="flex items-center gap-4">
          <span className="sonic-ui text-[10px] text-yellow-500 border border-yellow-500 px-2 py-1 rounded">
            {user?.rank}
          </span>
          <button onClick={logout} className="text-red-500 hover:scale-110 transition-transform">
            <span className="sonic-ui text-xs">TERMINATE</span>
          </button>
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] p-6 rounded-lg border-b-4 border-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.1)]">
            <h3 className="sonic-ui text-blue-500 text-sm mb-4 tracking-widest uppercase">Active Targets</h3>
            <div className="flex justify-between items-end">
              <div className="sonic-ui text-6xl font-bold italic text-white">{stats.opponents}</div>
              <div className="text-right pb-1">
                {recentOpponents.map(opp => (
                  <p key={opp.id} className="text-[9px] text-blue-400 sonic-ui uppercase tracking-tighter leading-tight">
                    {opp.name} <span className="animate-pulse">_DETECTED</span>
                  </p>
                ))}
              </div>
            </div>
            <p className="text-gray-600 sonic-ui text-[9px] mt-4 uppercase tracking-[0.3em]">Resistance Identified</p>
          </div>
          <div className="bg-[#111] p-6 rounded-lg border-b-4 border-red-600 shadow-[0_10px_30px_rgba(220,38,38,0.1)]">
            <h3 className="sonic-ui text-red-600 text-sm mb-4 tracking-widest uppercase">Operations</h3>
            <div className="sonic-ui text-6xl font-bold italic text-white">{stats.plans}</div>
            <p className="text-gray-600 sonic-ui text-[9px] mt-4 uppercase tracking-[0.3em]">Domination plans in progress</p>
          </div>
          
          {canRegister && (
            <button 
              onClick={() => navigate('/users')}
              className="bg-gradient-to-br from-yellow-600 to-yellow-800 p-6 rounded-lg border-b-4 border-yellow-900 text-left hover:brightness-110 active:scale-95 transition-all group relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="sonic-ui text-yellow-100 text-sm mb-4 tracking-widest uppercase">Recruitment</h3>
               <div className="text-xl sonic-ui font-black uppercase text-white group-hover:translate-x-2 transition-transform italic">
                 New Personnel →
               </div>
            </button>
          )}
          
        </div>
      </main>
       <footer className="shrink-0 p-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <p className="sonic-ui text-[8px] text-center text-gray-500 tracking-[1em] uppercase">
          EGG-DATA OS V.2.0.26 ALPHA
        </p>
      </footer>
    </div>
  );
};