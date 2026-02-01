import React from 'react';
import {
  LayoutDashboard, Briefcase, DollarSign, Users, Star,
  BarChart3, Settings, Sun, Moon, LogOut, Wrench
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MechanicSidebarProps {
  onLogout?: () => void;
}

export const MechanicSidebar: React.FC<MechanicSidebarProps> = ({ onLogout }) => {
  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Aperçu', active: true },
    { id: 'missions', icon: Briefcase, label: 'Missions', badge: 3 },
    { id: 'earnings', icon: DollarSign, label: 'Revenus' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'reviews', icon: Star, label: 'Avis' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'tools', icon: Settings, label: 'Outils' }
  ];

  return (
    <aside className="w-20 lg:w-64 bg-slate-900/80 border-r border-slate-800 flex flex-col py-6 backdrop-blur-md">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
          <Wrench size={24} />
        </div>
        <span className="font-bold text-xl hidden lg:block">ProCenter</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800/50 group"
          >
            <item.icon size={20} className="text-slate-400 group-hover:text-amber-500" />
            <span className="font-medium hidden lg:block text-slate-300 group-hover:text-white">
              {item.label}
            </span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
            MB
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold">Moussa B.</p>
            <p className="text-xs text-slate-400">Expert Mécanicien</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-slate-300">4.9</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
