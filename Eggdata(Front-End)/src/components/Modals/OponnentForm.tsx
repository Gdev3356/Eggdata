import { useState } from 'react';
import type { Opponent, OpponentLevel, OpponentStatus } from '../../types/opponents';

interface FormProps {
  mode: 'ADD' | 'EDIT';
  initialData?: Partial<Opponent>;
  onClose: () => void;
  onSave: (data: Partial<Opponent>) => void;
}

export const OpponentForm = ({ mode, initialData, onClose, onSave }: FormProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [formData, setFormData] = useState<Partial<Opponent>>(initialData || {
    name: '',
    species: '',
    status: 'ALIVE' as OpponentStatus,
    powers: '',
    weakness: '',
    age: 0,
    personality: '',
    friends: '',
    gender: 'UNKNOWN',
    level: 'UNKNOWN' as OpponentLevel,
  });

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 150);
  };

  const inputStyle = "w-full bg-black border border-white/10 p-2 text-white sonic-ui focus:border-yellow-500 outline-none transition-colors";
  const labelStyle = "sonic-ui text-[8px] text-gray-500 uppercase block mb-1";

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-150 ${
        isExiting ? 'opacity-0' : 'opacity-100 animate-in fade-in'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-[#0a0a0a] border-2 border-yellow-600 w-full max-w-xl shadow-[0_0_40px_rgba(202,138,4,0.2)] ${
          isExiting ? 'animate-egg-out' : 'animate-egg-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-yellow-600/10 border-b border-yellow-600/50">
          <h3 className="sonic-ui text-yellow-500 tracking-[0.3em] uppercase text-sm">
            {mode === 'ADD' ? 'Initialize_New_Scan' : 'Modify_Target_Intel'}
          </h3>
        </div>
        
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelStyle}>Subject Name</label>
            <input 
              className={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className={labelStyle}>Species</label>
            <input 
              className={inputStyle}
              value={formData.species}
              onChange={(e) => setFormData({...formData, species: e.target.value})}
            />
          </div>

          <div>
            <label className={labelStyle}>Status</label>
            <select 
              className={inputStyle}
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as OpponentStatus})}
            >
              <option value="ALIVE">ALIVE</option>
              <option value="CAPTURED">CAPTURED</option>
              <option value="ELIMINATED">ELIMINATED</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Threat Level</label>
            <select 
              className={inputStyle}
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value as OpponentLevel})}
            >
              <option value="EXTREME">EXTREME</option>
              <option value="SERIOUS">SERIOUS</option>
              <option value="NUISANCE">NUISANCE</option>
              <option value="MINOR">MINOR</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className={labelStyle}>Abilities Assessment</label>
            <textarea 
              className={`${inputStyle} h-20 resize-none`}
              value={formData.powers}
              onChange={(e) => setFormData({...formData, powers: e.target.value})}
            />
          </div>

          <div>
            <label className={labelStyle}>Subject Age</label>
            <input 
              type="number"
              className={inputStyle}
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
            />
          </div>

         <div>
            <label className={labelStyle}>Gender</label>
            <input 
              className={inputStyle}
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            />
          </div>

          <div className="col-span-2">
            <label className={labelStyle}>Subject Weaknesses</label>
            <input 
              className={inputStyle}
              value={formData.weakness}
              onChange={(e) => setFormData({...formData, weakness: e.target.value})}
            />
          </div>
        </div>

        <div className="p-4 bg-black/50 flex gap-4 border-t border-white/5">
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black font-black sonic-ui py-3 transition-colors uppercase tracking-widest text-xs"
          >
            {mode === 'ADD' ? 'Upload_to_EggNet' : 'Sync_Target_Updates'}
          </button>
          <button 
            onClick={handleClose}
            className="px-8 border border-white/20 text-gray-400 sonic-ui hover:text-white hover:bg-white/5 transition-all uppercase text-[10px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};