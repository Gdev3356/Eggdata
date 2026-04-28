import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Opponent, OpponentStatus } from '../types/opponents';
import eggmanLaugh from '../assets/icons/eggman_laugh.gif';
import eggmanAngry from '../assets/icons/eggman_angry.gif';
import eggmanFall from '../assets/icons/eggman_fall.gif';

export const Opponents = () => {
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpenDetails = (target: Opponent) => {
    setSelectedOpponent(target);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
      setSelectedOpponent(null);
    }, 150); 
  };

  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const response = await api.get('/opponents');
        setOpponents(response.data.content);
      } catch (error) {
        console.error("Failed to retrieve target data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOpponents();
  }, []);

  const getStatusIcon = (status: OpponentStatus) => {
    const iconClass = "w-32 h-32 object-contain [image-rendering:pixelated] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] max-w-none";
    
    switch (status) {
        case 'ALIVE': 
        return <img src={eggmanAngry} alt="Target Active" className={iconClass} />;
        case 'CAPTURED': 
        case 'ELIMINATED': 
        return <img src={eggmanLaugh} alt="Victory" className={iconClass} />;
        case 'UNKNOWN': 
        default: 
        return <img src={eggmanFall} alt="Data Lost" className={iconClass} />;
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="sonic-ui text-3xl text-red-600 tracking-tighter">Priority Targets</h2>
        <p className="sonic-ui text-[10px] text-gray-500 uppercase tracking-[0.4em]">Global Threat Assessment Index</p>
      </div>

      <div className="bg-[#121212] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black/50 border-b border-white/10">
            <tr>
              <th className="p-4 sonic-ui text-[10px] text-yellow-500 uppercase tracking-widest">Target</th>
              <th className="p-4 sonic-ui text-[10px] text-yellow-500 uppercase tracking-widest">Species</th>
              <th className="p-4 sonic-ui text-[10px] text-yellow-500 uppercase tracking-widest">Status</th>
              <th className="p-4 sonic-ui text-[10px] text-yellow-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="p-10 text-center sonic-ui text-gray-600 animate-pulse">Scanning Egg-Net...</td></tr>
            ) : opponents.map((target) => (
              <tr key={target.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="font-bold sonic-title text-white uppercase tracking-tight">{target.name}</div>
                  <div className="text-[10px] sonic-ui text-gray-500 font-mono italic">{target.powers}</div>
                </td>
                <td className="p-4 sonic-ui text-gray-400 text-sm italic">{target.species}</td>
                <td className="p-4">
                  <div className="flex flex-row-reverse items-center justify-end gap-6 h-16 relative">
                    <div className="relative w-24 h-full flex items-center -translate-y-4 translate-x-2">
                    {getStatusIcon(target.status)}
                    </div>
                    <span className={`text-[9px] ...`}>
                    {target.status}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleOpenDetails(target)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/10 hover:bg-red-600 sonic-title text-red-600 hover:text-white text-[9px] font-bold py-1 px-3 rounded border border-red-600/20"
                    >
                    DETAILS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedOpponent && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity duration-150 ${
            isExiting ? 'opacity-0' : 'opacity-100 animate-in fade-in'
          }`}
          onClick={handleCloseModal}
        >
          <div 
            className={`bg-[#0f0f0f] border-2 border-red-900 w-full max-w-2xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] ${
              isExiting ? 'animate-egg-out' : 'animate-egg-in'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-red-900/30 border-b-2 border-red-900 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                <h3 className="sonic-ui text-xl text-white tracking-widest uppercase relative z-10">
                  Target_Dossier: <span className="text-red-500 font-black">{selectedOpponent.name}</span>
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-red-600 sonic-title hover:text-white transition-colors text-2xl font-black relative z-10"
                >
                  x
                </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center bg-black/60 p-6 border border-red-900/20 relative">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('./assets/icons/static.gif')] bg-cover" />
                  <div className="h-48 flex items-center justify-center mb-6 relative scale-125">
                      {getStatusIcon(selectedOpponent.status)}
                  </div>
                  
                  <div className="w-full space-y-3 relative z-10 border-t border-white/5 pt-4">
                      <div className="flex justify-between">
                        <span className="sonic-ui text-[9px] text-gray-500 uppercase">Threat_Level</span>
                        <span className="sonic-ui text-[9px] text-red-500 font-bold">EXTREME</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="sonic-ui text-[9px] text-gray-500 uppercase">Specie_Origin</span>
                        <span className="sonic-ui text-[9px] text-white uppercase">{selectedOpponent.species}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="sonic-ui text-[9px] text-gray-500 uppercase">Bio_Age</span>
                        <span className="sonic-ui text-[9px] text-white">{selectedOpponent.age} cycles</span>
                      </div>
                  </div>
                </div>
                <div className="space-y-5">
                  <section>
                      <h4 className="text-yellow-500 sonic-ui text-[10px] uppercase tracking-[0.2em] mb-2 border-l-2 border-yellow-600 pl-2">
                        Ability Assessment
                      </h4>
                      <p className="text-sm text-gray-300 sonic-ui italic leading-relaxed">
                        {selectedOpponent.powers}
                      </p>
                  </section>

                  <section>
                      <h4 className="text-red-600 sonic-ui text-[10px] uppercase tracking-[0.2em] mb-2 border-l-2 border-red-600 pl-2">
                        Confirmed Weakness
                      </h4>
                      <p className="text-sm text-red-400 font-bold sonic-ui uppercase tracking-tighter">
                        {selectedOpponent.weakness || "DATA_PENDING_FURTHER_ANALYSIS"}
                      </p>
                  </section>

                  <section>
                      <h4 className="text-gray-500 sonic-ui text-[10px] uppercase tracking-[0.2em] mb-2 border-l-2 border-gray-700 pl-2">
                        Psychological Notes
                      </h4>
                      <p className="text-xs text-gray-400 sonic-ui leading-tight">
                        {selectedOpponent.personality || "No recorded behavioral deviations."}
                      </p>
                  </section>

                  <div className="pt-4 border-t border-white/5">
                      <h4 className="text-gray-600 sonic-ui text-[8px] uppercase mb-1">Affiliated Rebel Groups</h4>
                      <p className="text-[10px] text-gray-500 sonic-ui truncate italic">
                        {selectedOpponent.friends || "No known accomplices."}
                      </p>
                  </div>
                </div>
            </div>

            <div className="p-4 bg-black/80 flex justify-end border-t border-red-900/50">
                <button 
                  onClick={handleCloseModal}
                  className="sonic-ui text-[10px] border-2 border-red-900 text-red-600 px-10 py-2 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all uppercase font-black tracking-widest"
                >
                  ACKNOWLEDGE DATA
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};