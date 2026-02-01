import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Navigation, Battery, Cpu, Fuel, Truck, HelpCircle, PhoneCall,
  Circle
} from 'lucide-react';

interface RequestTabProps {
  onCreateRequest: (type: string) => void;
}

export const RequestTab: React.FC<RequestTabProps> = ({ onCreateRequest }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-4xl mx-auto">
      <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-amber-500/20">
        <Navigation size={48} className="text-white" />
      </div>

      <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Besoin d'assistance routière ?
      </h3>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl">
        Sélectionnez le type d'assistance dont vous avez besoin. Nous enverrons l'expert le plus proche de votre position.
      </p>

      <div className="w-full space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { type: 'tire', label: 'Pneu crevé', icon: Circle, color: 'amber' },
            { type: 'battery', label: 'Batterie', icon: Battery, color: 'blue' },
            { type: 'engine', label: 'Problème moteur', icon: Cpu, color: 'red' },
            { type: 'fuel', label: 'Carburant', icon: Fuel, color: 'purple' },
            { type: 'towing', label: 'Remorquage', icon: Truck, color: 'emerald' },
            { type: 'other', label: 'Autre problème', icon: HelpCircle, color: 'gray' }
          ].map(item => (
            <button
              key={item.type}
              onClick={() => onCreateRequest(item.type)}
              className="group p-8 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 dark:text-${item.color}-400 flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <item.icon size={32} />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
                Assistance d'urgence 24/7
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Appelez notre centre d'appels pour une assistance immédiate
              </p>
            </div>
            <Button variant="danger" size="lg" icon={PhoneCall} className="whitespace-nowrap">
              <span className="font-mono font-bold">Appeler le 1313</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
