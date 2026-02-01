import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User, Bell, Sun, Moon, Monitor, Save, Edit, X,
  Trash2, ChevronRight
} from 'lucide-react';
import type { UserData } from './types';

interface SettingsTabProps {
  userData: UserData;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onUserDataChange: (data: Partial<UserData>) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  userData,
  darkMode,
  setDarkMode,
  onUserDataChange
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Paramètres</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="p-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User size={20} /> Profil utilisateur
              </h4>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={userData.avatar}
                        className="w-24 h-24 rounded-2xl border-4 border-slate-100 dark:border-slate-700"
                        alt="avatar"
                      />
                      <button className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition-colors">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => onUserDataChange({ name: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={userData.email}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                          disabled
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => onUserDataChange({ phone: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" icon={Save}>
                    Enregistrer les modifications
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card>
            <div className="p-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell size={20} /> Notifications
              </h4>

              <div className="space-y-4">
                {Object.entries(userData.preferences.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white capitalize">
                        {key === 'sms' ? 'SMS' : key === 'email' ? 'Email' : 'Notifications push'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Recevoir des notifications par {key}
                      </p>
                    </div>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                        value ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                          value ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Preferences Sidebar */}
        <div className="space-y-8">
          {/* Theme */}
          <Card>
            <div className="p-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                Apparence
              </h4>

              <div className="space-y-3">
                {[
                  { value: 'light', label: 'Mode clair', icon: Sun },
                  { value: 'dark', label: 'Mode sombre', icon: Monitor },
                  { value: 'auto', label: 'Automatique', icon: Monitor }
                ].map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => setDarkMode(theme.value === 'dark')}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      (theme.value === 'dark' && darkMode) || (theme.value === 'light' && !darkMode)
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <theme.icon size={20} />
                    <span className="font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Language */}
          <Card>
            <div className="p-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                Langue
              </h4>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  <span className="font-medium">Français</span>
                  <CheckCircle size={20} />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="font-medium text-slate-700 dark:text-slate-300">English</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <div className="p-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                Sécurité
              </h4>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Changer le mot de passe</span>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Authentification à deux facteurs</span>
                  <div className="w-10 h-6 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-red-500">
                  <span className="font-medium">Supprimer le compte</span>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { CheckCircle } from 'lucide-react';
