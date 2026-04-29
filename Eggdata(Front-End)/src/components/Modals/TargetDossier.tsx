import type { JSX } from 'react';
import type { Opponent, OpponentStatus } from '../../types/opponents';

interface DossierProps {
  opponent: Opponent;
  isExiting: boolean;
  onClose: () => void;
  onEdit: (opponent: Opponent) => void;
  onDelete: (id: number) => void;
  getStatusIcon: (status: OpponentStatus) => JSX.Element;
}

export const TargetDossier = ({ opponent, isExiting, onClose, onEdit, onDelete, getStatusIcon }: DossierProps) => {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-opacity duration-150 ${
        isExiting ? 'opacity-0' : 'opacity-100 animate-in fade-in'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-[#0f0f0f] border-2 border-red-900 w-full max-w-2xl overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] ${
          isExiting ? 'animate-egg-out' : 'animate-egg-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-red-900/30 border-b-2 border-red-900 flex justify-between items-center relative">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          <h3 className="sonic-ui text-xl text-white tracking-widest uppercase relative z-10">
            Target_Dossier: <span className="text-red-500 font-black">{opponent.name}</span>
          </h3>
          <button onClick={onClose} className="text-red-600 sonic-ui hover:text-white text-2xl font-black relative z-10">×</button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/60 p-6 border border-red-900/20 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('./assets/icons/static.gif')] bg-cover" />
            <div className="h-48 flex items-center justify-center mb-6 scale-125 relative">
              {getStatusIcon(opponent.status)}
            </div>
            <div className="w-full space-y-3 relative z-10 border-t border-white/5 pt-4">
               <p className="sonic-ui text-[9px] text-gray-500 uppercase flex justify-between">Threat: <span className="text-red-500 font-bold">{opponent.level}</span></p>
               <p className="sonic-ui text-[9px] text-gray-500 uppercase flex justify-between">Origin: <span className="text-white">{opponent.species}</span></p>
               <p className="sonic-ui text-[9px] text-gray-500 uppercase flex justify-between">Bio_Age: <span className="text-white">{opponent.age} cycles</span></p>
               <p className="sonic-ui text-[9px] text-gray-500 uppercase flex justify-between">Bio_Age: <span className="text-white">{opponent.gender} bio</span></p>
            </div>
          </div>

          <div className="space-y-5">
            <section>
              <h4 className="text-yellow-500 sonic-ui text-[10px] uppercase mb-2 border-l-2 border-yellow-600 pl-2">Ability Assessment</h4>
              <p className="text-sm text-gray-300 sonic-ui italic leading-relaxed">{opponent.powers}</p>
            </section>
            <section>
              <h4 className="text-red-600 sonic-ui text-[10px] uppercase mb-2 border-l-2 border-red-600 pl-2">Confirmed Weakness</h4>
              <p className="text-sm text-red-400 font-bold sonic-ui uppercase">{opponent.weakness || "DATA_PENDING_ANALYSIS"}</p>
            </section>
          </div>
        </div>

        <div className="p-4 bg-black/80 flex justify-between items-center border-t border-red-900/50">
          <button 
            onClick={() => onDelete(opponent.id)}
            className="text-red-800 hover:text-red-500 sonic-ui text-[9px] underline underline-offset-4"
          >
            PURGE_RECORDS
          </button>
          <div className="flex gap-4">
            <button 
              onClick={() => onEdit(opponent)}
              className="sonic-ui text-[10px] border border-yellow-600 text-yellow-600 px-6 py-2 hover:bg-yellow-600 hover:text-black transition-all uppercase tracking-tighter font-bold"
            >
              MODIFY_INTEL
            </button>
            <button onClick={onClose} className="sonic-ui text-[10px] border-2 border-red-900 text-red-600 px-10 py-2 hover:bg-red-600 hover:text-white transition-all uppercase font-black tracking-widest">
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};