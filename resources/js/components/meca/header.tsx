import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userName: string;
  subscription: string;
  notifications: number;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  subscription,
  notifications,
  onSettingsClick
}) => {
  return (
    <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-8 shrink-0 transition-colors duration-300">
      <div>
        <h2 className="font-bold text-xl text-slate-800 dark:text-white">
          Bonjour, {userName.split(' ')[0]} !
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Votre abonnement {subscription} est actif
          {subscription === 'gold' && ' 🏆'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher une aide..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-amber-500 dark:text-white"
          />
        </div>

        <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full relative hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>

        <button
          onClick={onSettingsClick}
          className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};
