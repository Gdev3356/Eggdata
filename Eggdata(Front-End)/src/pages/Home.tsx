import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

export const Home = () => {
  const { user, canRegister, logout } = useAuth();
  const [stats, setStats] = useState({ opponents: 0, plans: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [oppResponse, planResponse] = await Promise.all([
          api.get('/opponents?size=1'),
          api.get('/plans?size=1')
        ]);
        setStats({
          opponents: oppResponse.data.totalElements,
          plans: planResponse.data.totalElements
        });
      } catch (err) {
        console.error("Failed to sync with Egg-Net", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <nav className="bg-black border-b-2 border-red-900 p-4 flex justify-between items-center shadow-lg">
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

      <main className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#111] p-6 rounded-lg border-b-4 border-blue-600">
          <h3 className="sonic-ui text-blue-500 text-sm mb-4">ACTIVE TARGETS</h3>
          <div className="sonic-ui text-5xl font-bold italic">{stats.opponents}</div>
          <p className="text-gray-500 sonic-ui text-[10px] mt-2 uppercase tracking-widest">Resistance identified</p>
        </div>

        <div className="bg-[#111] p-6 rounded-lg border-b-4 border-red-600">
          <h3 className="sonic-ui text-red-600 text-sm mb-4">OPERATIONS</h3>
          <div className="sonic-ui text-5xl font-bold italic">{stats.plans}</div>
          <p className="text-gray-500 sonic-ui text-[10px] mt-2 uppercase tracking-widest">Domination plans in progress</p>
        </div>

        {canRegister && (
          <button className="bg-linear-to-r from-yellow-600 to-yellow-800 p-6 rounded-lg border-b-4 border-yellow-900 text-left hover:brightness-125 transition-all group">
            <h3 className="sonic-ui text-white text-sm mb-4">RECRUITMENT</h3>
            <div className="text-xl sonic-ui font-bold uppercase group-hover:translate-x-2 transition-transform underline">New Personnel →</div>
          </button>
        )}
      </main>
    </div>
  );
};