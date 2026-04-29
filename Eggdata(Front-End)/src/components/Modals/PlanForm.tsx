import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import type { Plan } from '../../types/plan';
import type { Opponent } from '../../types/opponents';
import type { UserRank } from '../../types/user';

interface PlanFormProps {
  mode: 'ADD' | 'EDIT';
  initialData?: Partial<Plan>;
  onClose: () => void;
  onSave: (data: Partial<Plan>) => void;
}

export const PlanForm = ({ mode, initialData, onClose, onSave }: PlanFormProps) => {
  const { user } = useAuth(); // 2. Acesso ao usuário logado
  const [isExiting, setIsExiting] = useState(false);
  const [availableOpponents, setAvailableOpponents] = useState<Opponent[]>([]);
  const [formData, setFormData] = useState<Partial<Plan>>(initialData || {
    codeName: '',
    description: '',
    rank: 'E' as UserRank,
    targets: []
  });
  
  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const response = await api.get('/opponents');
        setAvailableOpponents(response.data.content || response.data);
      } catch (err) {
        console.error("Failed to fetch targets for operation", err);
      }
    };
    fetchOpponents();
  }, []);

  const toggleTarget = (opponent: Opponent) => {
    const isSelected = formData.targets?.some(t => t.id === opponent.id);
    if (isSelected) {
      setFormData({
        ...formData,
        targets: formData.targets?.filter(t => t.id !== opponent.id)
      });
    } else {
      setFormData({
        ...formData,
        targets: [...(formData.targets || []), opponent]
      });
    }
  };

  const handleInternalSave = () => {
    const finalData = {
      ...formData,
      creator: mode === 'ADD' ? { id: user?.id } : formData.creator
    };
    onSave(finalData);
  };

  const inputStyle = "w-full bg-black border border-white/10 p-2 text-white sonic-ui focus:border-red-500 outline-none transition-colors";
  const labelStyle = "sonic-ui text-[8px] text-gray-500 uppercase block mb-1";

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 ${isExiting ? 'opacity-0' : 'opacity-100 animate-in fade-in'}`}>
      <div className={`bg-[#0a0a0a] border-2 border-red-600 w-full max-w-2xl shadow-[0_0_40px_rgba(220,38,38,0.2)] ${isExiting ? 'animate-egg-out' : 'animate-egg-in'}`}>
        
        <div className="p-4 bg-red-600/10 border-b border-red-600/50 flex justify-between items-center">
          <h3 className="sonic-ui text-red-500 tracking-[0.3em] uppercase text-sm">
            {mode === 'ADD' ? 'Initialize_Operation' : 'Modify_Tactical_Plan'}
          </h3>
          <span className="text-[10px] text-gray-600 sonic-ui uppercase">System_ID: {formData.id || 'NEW'}</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={labelStyle}>Authorized Officer</label>
              <div className="w-full bg-red-900/5 border border-red-900/20 p-2 text-red-600 sonic-ui text-[10px] italic">
                {mode === 'ADD' ? user?.userName : (formData.creator?.name || 'LOADING...')}
              </div>
            </div>

            <div>
              <label className={labelStyle}>Codename</label>
              <input 
                className={`${inputStyle} text-red-500 font-black tracking-widest`}
                value={formData.codeName}
                onChange={(e) => setFormData({...formData, codeName: e.target.value})}
                placeholder="EX: OPERATION_GENESIS"
              />
            </div>
            <div>
              <label className={labelStyle}>Security Clearance</label>
              <select 
                className={inputStyle}
                value={formData.rank}
                onChange={(e) => setFormData({...formData, rank: e.target.value as UserRank})}
              >
                {['E', 'D', 'C', 'B', 'A', 'S', 'EGG_MASTER'].map(r => (
                  <option key={r} value={r}>RANK_{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyle}>Objectives</label>
              <textarea 
                className={`${inputStyle} h-24 resize-none text-xs`}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className={labelStyle}>Target_Lock (Select Opponents)</label>
            <div className="flex-1 bg-black border border-white/5 p-2 overflow-y-auto max-h-[280px] custom-scrollbar">
              {availableOpponents.map(opp => (
                <div 
                    key={opp.id}
                    onClick={() => toggleTarget(opp)}
                    className={`flex items-center justify-between p-2 mb-1 cursor-pointer border transition-all ${
                    formData.targets?.some(t => t.id === opp.id) // Usando 'opp' corretamente
                        ? 'border-red-600 bg-red-900/20'
                        : 'border-transparent hover:bg-white/5'
                    }`}
                >
                    <span className="sonic-ui text-[10px] text-white uppercase">{opp.name}</span>
                    <div className={`w-3 h-3 border ${
                    formData.targets?.some(t => t.id === opp.id) 
                        ? 'bg-red-600 border-red-400' 
                        : 'border-white/20'
                    }`} />
                </div>
                ))}
              </div>
            <p className="text-[8px] text-gray-600 sonic-ui mt-2 uppercase tracking-tighter">
              {formData.targets?.length || 0} Targets linked to this operation
            </p>
          </div>
        </div>

        <div className="p-4 bg-black/50 flex gap-4 border-t border-white/5">
          <button 
            onClick={handleInternalSave} // 4. Chama a função que injeta o criador
            className="flex-1 bg-red-700 hover:bg-red-600 text-white font-black sonic-ui py-3 transition-colors uppercase tracking-widest text-xs"
          >
            {mode === 'ADD' ? 'Finalize_and_Deploy' : 'Update_Tactical_Data'}
          </button>
          <button onClick={() => { setIsExiting(true); setTimeout(onClose, 150); }} className="px-8 border border-white/20 text-gray-400 sonic-ui text-[10px] uppercase">Cancel</button>
        </div>
      </div>
    </div>
  );
};