import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import {
  CheckCircle, Star, Heart, DollarSign, Clock, Eye, Phone,
  MessageSquare, X, Radar, Moon, Sun, Calculator, FileText,
  Map as MapIcon, Message as MessageIcon, MoreVertical
} from 'lucide-react';
import type { MechanicStats, MechanicEarnings, MissionData } from './types';

interface MechanicDashboardContentProps {
  online: boolean;
  earnings: MechanicEarnings;
  stats: MechanicStats;
  missions: MissionData[];
  activeMission: MissionData | null;
  onAcceptMission: (missionId: string) => void;
  onCompleteMission: () => void;
  notifications: number;
}

export const MechanicDashboardContent: React.FC<MechanicDashboardContentProps> = ({
  online,
  earnings,
  stats,
  missions,
  activeMission,
  onAcceptMission,
  onCompleteMission,
  notifications
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-400 mb-2">Missions terminées</p>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle size={24} className="text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={75} max={100} color="amber" label="Objectif mensuel" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-400 mb-2">Note moyenne</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-white">{stats.rating}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">Basé sur {stats.completed} évaluations</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-400 mb-2">Satisfaction client</p>
                <p className="text-3xl font-bold text-white">{stats.satisfaction}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Heart size={24} className="text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={stats.satisfaction} max={100} color="blue" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-400 mb-2">Revenus totaux</p>
                <p className="text-3xl font-bold text-emerald-400">{earnings.total.toLocaleString()}F</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <DollarSign size={24} className="text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">+12% ce mois</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Missions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Missions List */}
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Missions disponibles</h3>
                <Badge variant="info">{missions.length} disponibles</Badge>
              </div>

              <div className="space-y-4">
                {missions.map(mission => (
                  <div key={mission.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-white">{mission.type}</h4>
                          <Badge
                            variant={
                              mission.status === 'completed'
                                ? 'success'
                                : mission.status === 'in_progress'
                                  ? 'warning'
                                  : 'info'
                            }
                            size="sm"
                          >
                            {mission.status === 'completed'
                              ? 'Terminé'
                              : mission.status === 'in_progress'
                                ? 'En cours'
                                : 'En attente'}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">
                          {mission.client} • {mission.vehicle} • {mission.location}
                        </p>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-slate-300 flex items-center gap-1">
                            <DollarSign size={14} /> {mission.price.toLocaleString()}F
                          </span>
                          {mission.duration && (
                            <span className="text-slate-300 flex items-center gap-1">
                              <Clock size={14} /> {mission.duration} min
                            </span>
                          )}
                          {mission.rating && (
                            <span className="text-amber-400 flex items-center gap-1">
                              <Star size={14} /> {mission.rating}.0
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {mission.status === 'pending' && online && (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={CheckCircle}
                            onClick={() => onAcceptMission(mission.id)}
                          >
                            Accepter
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                        >
                          Détails
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Earnings Chart */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Revenus hebdomadaires</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[12000, 18000, 15000, 22000, 19000, 24000, 24500].map((amount, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-amber-500 to-orange-500 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(amount / 25000) * 100}%` }}
                    ></div>
                    <span className="text-xs text-slate-400 mt-2">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                    </span>
                    <span className="text-xs font-bold text-white mt-1">
                      {amount.toLocaleString()}F
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Online Status Card */}
          <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-500/20">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    online
                      ? 'bg-amber-500/20 border border-amber-500/50'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {online ? (
                    <div className="relative">
                      <Radar size={32} className="text-amber-400 animate-spin" />
                      <div className="absolute inset-0 w-16 h-16 bg-amber-500/10 rounded-2xl animate-ping"></div>
                    </div>
                  ) : (
                    <Zap size={32} className="text-slate-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {online ? 'Mode Radar Actif' : 'Mode Veille'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {online
                      ? 'Recherche de missions dans votre zone'
                      : 'Activez pour recevoir des missions'}
                  </p>
                </div>
              </div>

              <Button
                variant={online ? 'outline' : 'primary'}
                size="lg"
                icon={online ? Moon : Sun}
                className="w-full"
              >
                {online ? 'Mettre en veille' : 'Activer le radar'}
              </Button>

              {online && (
                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-sm text-slate-400 mb-2">Zone de couverture</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Dakar - 15km</span>
                    <Badge variant="success">Optimal</Badge>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Tools & Resources */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Outils rapides</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors flex flex-col items-center gap-2">
                  <Calculator size={24} className="text-amber-400" />
                  <span className="text-sm font-medium text-white">Estimateur</span>
                </button>
                <button className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors flex flex-col items-center gap-2">
                  <FileText size={24} className="text-blue-400" />
                  <span className="text-sm font-medium text-white">Factures</span>
                </button>
                <button className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors flex flex-col items-center gap-2">
                  <MapIcon size={24} className="text-emerald-400" />
                  <span className="text-sm font-medium text-white">Carte</span>
                </button>
                <button className="p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700 transition-colors flex flex-col items-center gap-2">
                  <MessageIcon size={24} className="text-purple-400" />
                  <span className="text-sm font-medium text-white">Messages</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Top Clients */}
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Top Clients</h3>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Sarr', visits: 8, total: 64000 },
                  { name: 'Mme. Diop', visits: 5, total: 45000 },
                  { name: 'M. Ndiaye', visits: 4, total: 32000 }
                ].map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{client.name}</p>
                        <p className="text-xs text-slate-400">{client.visits} interventions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-400">{client.total.toLocaleString()}F</p>
                      <Badge variant="success" size="sm">
                        Fidèle
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
