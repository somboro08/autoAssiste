import React from 'react';
import { Bell, Settings, Radar, Zap, Moon, Sun } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { MechanicStats, MechanicEarnings } from './types';

interface MechanicHeaderProps {
  online: boolean;
  setOnline: (online: boolean) => void;
  earnings: MechanicEarnings;
  stats: MechanicStats;
  notifications: number;
}

export const MechanicHeader: React.FC<MechanicHeaderProps> = ({
  online,
  setOnline,
  earnings,
  stats,
  notifications
}) => {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer ${
            online
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
          }`}
          onClick={() => setOnline(!online)}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${online ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
          {online ? 'DISPONIBLE • Recherche de missions' : 'HORS LIGNE'}
        </div>

        <div className="hidden lg:block text-sm text-slate-400">
          <span className="font-bold text-emerald-400">{stats.responseTime} min</span> de temps de réponse moyen
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:block text-right">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Aujourd'hui</p>
          <p className="text-xl font-bold text-amber-500">{earnings.today.toLocaleString()}F</p>
        </div>

        <button className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors relative">
          <Bell size={20} className="text-slate-400" />
        </button>

        <button className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
          <Settings size={20} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
};
