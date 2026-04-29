import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import type { Plan } from '../types/plan';
import { PlanDossier } from '../components/Modals/PlanDossier';
import { PlanForm } from '../components/Modals/PlanForm';

export const Plans = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'ADD' | 'EDIT'>('ADD');

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/plans');
      setPlans(response.data.content || response.data);
    } catch (error) {
      console.error("Failed to retrieve tactical data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPlans(); }, [fetchPlans]);

  const handleSave = async (data: Partial<Plan>) => {
    try {
      const payload = {
        ...data,
        creator: { id: user?.id }
      };

      if (formMode === 'ADD') {
        await api.post('/plans', payload);
      } else {
        await api.put(`/plans/${data.id}`, payload);
      }
      
      fetchPlans();
      setIsFormOpen(false);
    } catch (error) {
      alert("RANK INSUFFICIENT OR CONNECTION LOST");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("ABORT OPERATION AND PURGE DATA?")) return;
    try {
      await api.delete(`/plans/${id}`);
      fetchPlans();
      setIsDossierOpen(false);
    } catch (error) {
      console.error("Abort sequence failed", error);
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="sonic-ui text-3xl text-blue-500 tracking-tighter italic">Global Conquest Plans</h2>
          <p className="sonic-ui text-[10px] text-gray-500 uppercase tracking-[0.4em]">Strategic Operations Command</p>
        </div>
        <button 
          onClick={() => { setFormMode('ADD'); setIsFormOpen(true); }}
          className="bg-blue-600 hover:bg-blue-500 text-white sonic-ui text-[10px] px-6 py-2 rounded font-black tracking-widest transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          + NEW_OPERATION
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center sonic-ui text-blue-900 animate-pulse py-20">Accessing encrypted archives...</div>
        ) : plans.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => { setSelectedPlan(plan); setIsDossierOpen(true); }}
            className="bg-[#111] border border-blue-900/30 p-6 rounded cursor-pointer hover:border-blue-500 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-900/20 px-3 py-1 text-[8px] text-blue-400 sonic-ui border-b border-l border-blue-900/30">
              RANK {plan.rank}
            </div>
            <h3 className="sonic-title text-xl text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{plan.codeName}</h3>
            <p className="text-[10px] text-gray-500 sonic-ui mt-2 line-clamp-2 italic">"{plan.description}"</p>
            
            <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-4">
              <span className="text-[9px] text-blue-800 sonic-ui uppercase">{plan.targets?.length || 0} Targets Locked</span>
              <span className="text-[9px] text-gray-600 sonic-ui">{new Date(plan.creationDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      {isDossierOpen && selectedPlan && (
        <PlanDossier 
          plan={selectedPlan}
          onClose={() => setIsDossierOpen(false)}
          onEdit={() => { setIsDossierOpen(false); setFormMode('EDIT'); setIsFormOpen(true); }}
          onDelete={() => handleDelete(selectedPlan.id)}
        />
      )}

      {isFormOpen && (
        <PlanForm 
          mode={formMode}
          initialData={formMode === 'EDIT' ? selectedPlan || {} : {}}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};