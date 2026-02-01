import React from 'react';
import {
  LayoutDashboard, Navigation, Map, MessageSquare, FileText, Car,
  CreditCard, Settings, Sun, Moon, LogOut, Bell, User, Star,
  Plus, Edit, Eye, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserData } from './types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: UserData;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeRequest?: boolean;
  notifications: number;
  onLogout?: () => void;
  setShowVehicleModal?: (show: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userData,
  darkMode,
  setDarkMode,
  activeRequest,
  notifications,
  onLogout,
  setShowVehicleModal
}) => {
  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'request', icon: Navigation, label: 'Nouvelle Aide' },
    { id: 'tracking', icon: Map, label: 'Suivi', badge: activeRequest ? 1 : null },
    { id: 'messages', icon: MessageSquare, label: 'Messages', badge: 3 },
    { id: 'history', icon: FileText, label: 'Historique' },
    { id: 'vehicles', icon: Car, label: 'Mes Véhicules' },
    { id: 'payments', icon: CreditCard, label: 'Paiements' },
    { id: 'settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <aside className="w-20 lg:w-64 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 flex flex-col py-6 shrink-0 transition-colors duration-300">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
          <Car size={24} />
        </div>
        <span className="font-bold text-xl hidden lg:block dark:text-white">AutoAssist Pro</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-lg'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium hidden lg:block">{item.label}</span>
            {item.badge && activeTab !== item.id && (
              <span className="ml-auto bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500 p-0.5">
            <img src={userData.avatar} className="rounded-full bg-slate-200 dark:bg-slate-600" alt="avatar" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold dark:text-white">{userData.name}</p>
            <Badge variant={userData.subscription === 'gold' ? 'warning' : 'info'} size="sm">
              {userData.subscription.toUpperCase()}
            </Badge>
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium hidden lg:block">
            {darkMode ? 'Mode clair' : 'Mode sombre'}
          </span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium hidden lg:block">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};
