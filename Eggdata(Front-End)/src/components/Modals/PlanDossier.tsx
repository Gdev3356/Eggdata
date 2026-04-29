import type { Plan } from '../../types/plan';

interface PlanDossierProps {
  plan: Plan;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const PlanDossier = ({ plan, onClose, onEdit, onDelete }: PlanDossierProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-[#0f0f0f] border-2 border-blue-900 w-full max-w-2xl shadow-[0_0_60px_rgba(30,58,138,0.4)] animate-egg-in" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-4 bg-blue-900/30 border-b-2 border-blue-900 flex justify-between items-center">
          <h3 className="sonic-ui text-xl text-white tracking-[0.2em] uppercase">
            Operation: <span className="text-blue-400 font-black">{plan.codeName}</span>
          </h3>
          <span className="bg-blue-600 text-black px-3 py-1 text-xs font-black sonic-ui">RANK_{plan.rank}</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h4 className="text-blue-500 sonic-ui text-[10px] uppercase mb-2 border-l-2 border-blue-600 pl-2">Executive Summary</h4>
              <p className="text-gray-300 sonic-ui text-sm leading-relaxed bg-white/5 p-4 rounded italic border border-white/5">
                "{plan.description}"
              </p>
            </section>

            <section>
              <h4 className="text-yellow-500 sonic-ui text-[10px] uppercase mb-2 border-l-2 border-yellow-600 pl-2">Primary Targets</h4>
              <div className="flex flex-wrap gap-2">
                {plan.targets?.length > 0 ? plan.targets.map(t => (
                  <span key={t.id} className="bg-red-950/40 border border-red-900 text-red-400 px-3 py-1 text-[10px] sonic-ui uppercase">
                    {t.name}
                  </span>
                )) : <span className="text-gray-600 text-[10px] sonic-ui">NO_TARGETS_ASSIGNED</span>}
              </div>
            </section>
          </div>

          <div className="bg-black/40 p-4 border border-white/5 space-y-4">
             <div className="text-center pb-4 border-b border-white/5">
                <p className="text-[8px] text-gray-500 sonic-ui uppercase">Authored_By</p>
                <p className="text-xs text-white sonic-ui font-bold">{plan.creator?.name || 'UNKNOWN_UNIT'}</p>
             </div>
             <div className="text-center">
                <p className="text-[8px] text-gray-500 sonic-ui uppercase">Deployment_Date</p>
                <p className="text-xs text-blue-400 sonic-ui">{new Date(plan.creationDate).toLocaleDateString()}</p>
             </div>
          </div>
        </div>

        <div className="p-4 bg-black/80 flex justify-between items-center border-t border-blue-900/50">
          <button onClick={onDelete} className="text-red-900 hover:text-red-500 sonic-ui text-[9px] underline">ABORT_OPERATION</button>
          <div className="flex gap-4">
            <button onClick={onEdit} className="sonic-ui text-[10px] border border-blue-600 text-blue-400 px-6 py-2 hover:bg-blue-600 hover:text-white transition-all">REVISE_INTEL</button>
            <button onClick={onClose} className="sonic-ui text-[10px] bg-blue-900 text-white px-10 py-2 hover:bg-blue-700 transition-all font-black uppercase">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};