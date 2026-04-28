import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import type { Opponent, OpponentStatus } from '../types/opponents';
import { TargetDossier } from '../components/Modals/TargetDossier';
import { OpponentForm } from '../components/Modals/OponnentForm';

// Assets
import eggmanLaugh from '../assets/icons/eggman_laugh.gif';
import eggmanAngry from '../assets/icons/eggman_angry.gif';
import eggmanFall from '../assets/icons/eggman_fall.gif';

export const Opponents = () => {
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(null);
  
  // Modal States
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'ADD' | 'EDIT'>('ADD');

  const fetchOpponents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/opponents');
      setOpponents(response.data.content || response.data);
    } catch (error) {
      console.error("Egg-Net Link Severed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpponents();
  }, [fetchOpponents]);

  const getStatusIcon = (status: OpponentStatus) => {
    const iconClass = "w-32 h-32 object-contain [image-rendering:pixelated] drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] max-w-none";
    switch (status) {
      case 'ALIVE': return <img src={eggmanAngry} alt="Active" className={iconClass} />;
      case 'CAPTURED': 
      case 'ELIMINATED': return <img src={eggmanLaugh} alt="Victory" className={iconClass} />;
      default: return <img src={eggmanFall} alt="Lost" className={iconClass} />;
    }
  };

  const handleOpenDossier = (target: Opponent) => {
    setSelectedOpponent(target);
    setIsDossierOpen(true);
  };

  const handleCloseDossier = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsDossierOpen(false);
      setIsExiting(false);
      setSelectedOpponent(null);
    }, 150);
  };

  const handleOpenForm = (mode: 'ADD' | 'EDIT', target?: Opponent) => {
    setFormMode(mode);
    if (target) setSelectedOpponent(target);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("PERMANENTLY ERASE TARGET DATA?")) return;
    try {
      await api.delete(`/opponents/${id}`);
      fetchOpponents();
      handleCloseDossier();
    } catch (error) {
      console.error("Deletion Failed:", error);
    }
  };

  const handleSave = async (data: Partial<Opponent>) => {
    try {
      if (formMode === 'ADD') {
        await api.post('/opponents', data);
      } else {
        await api.put(`/opponents/${data.id}`, data);
      }
      fetchOpponents();
      setIsFormOpen(false);
      if (isDossierOpen) handleCloseDossier();
    } catch (error) {
      console.error("Data Sync Failed:", error);
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="sonic-ui text-3xl text-red-600 tracking-tighter">Priority Targets</h2>
          <p className="sonic-ui text-[10px] text-gray-500 uppercase tracking-[0.4em]">Global Threat Assessment Index</p>
        </div>
        <button 
          onClick={() => handleOpenForm('ADD')}
          className="bg-red-600 hover:bg-red-500 text-white sonic-ui text-[10px] px-6 py-2 rounded font-black tracking-widest transition-all border border-red-400/20"
        >
          + INITIALIZE_SCAN
        </button>
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
                  <div className="text-[10px] sonic-ui text-gray-500 font-mono italic truncate max-w-[200px]">{target.powers}</div>
                </td>
                <td className="p-4 sonic-ui text-gray-400 text-sm italic">{target.species}</td>
                <td className="p-4">
                  <div className="flex flex-row-reverse items-center justify-end gap-6 h-16 relative">
                    <div className="relative w-24 h-full flex items-center -translate-y-4 translate-x-2">
                       {getStatusIcon(target.status)}
                    </div>
                    <span className={`text-[9px] sonic-ui font-bold px-2 py-0.5 rounded border whitespace-nowrap ${
                      target.status === 'ALIVE' ? 'border-green-500/30 text-green-500 bg-green-950/20' :
                      target.status === 'ELIMINATED' ? 'border-red-500/30 text-red-600 bg-red-950/20' :
                      target.status === 'CAPTURED' ? 'border-blue-500/30 text-blue-500 bg-blue-950/20' :
                      'border-gray-500/30 text-gray-500 bg-gray-900/40'
                    }`}>
                      {target.status}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleOpenDossier(target)}
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

      {/* MODAL LAYER */}
      {isDossierOpen && selectedOpponent && (
        <TargetDossier 
          opponent={selectedOpponent}
          isExiting={isExiting}
          onClose={handleCloseDossier}
          onEdit={() => handleOpenForm('EDIT', selectedOpponent)}
          onDelete={handleDelete}
          getStatusIcon={getStatusIcon}
        />
      )}

      {isFormOpen && (
        <OpponentForm 
          mode={formMode}
          initialData={formMode === 'EDIT' ? selectedOpponent || {} : {}}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};