import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StatCard } from '@/components/ui/stat-card';
import {
  Brain, Sparkles, Loader2, Mic, Clock, Package, AlertTriangle,
  Wrench, Search, ChevronRight, Star, Wrench as WrenchIcon,
  Calendar, Gauge
} from 'lucide-react';
import type { AiDiagnosis, UserData } from './types';

interface DashboardTabProps {
  userData: UserData;
  aiInput: string;
  setAiInput: (input: string) => void;
  isAnalyzing: boolean;
  handleDeepDiagnosis: () => void;
  diagnosis: AiDiagnosis | null;
  setShowVehicleModal: (show: boolean) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  userData,
  aiInput,
  setAiInput,
  isAnalyzing,
  handleDeepDiagnosis,
  diagnosis,
  setShowVehicleModal
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="xl:col-span-2 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assistances"
            value="12"
            change={15}
            icon={WrenchIcon}
            color="amber"
          />
          <StatCard
            title="Dépenses"
            value="45.8K"
            change={-5}
            icon={Gauge}
            color="emerald"
          />
          <StatCard
            title="Garages"
            value="8"
            change={25}
            icon={Gauge}
            color="blue"
          />
          <StatCard
            title="Satisfaction"
            value="4.8"
            change={2}
            icon={Star}
            color="purple"
          />
        </div>

        {/* AI Assistant Banner */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-lg">
                <Badge variant="warning" className="mb-4">
                  <Sparkles size={14} /> IA PRÉMIUM : Diagnostic Expert
                </Badge>
                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  Des soucis avec votre véhicule ? Notre IA vous aide en 30 secondes
                </h3>
                <p className="text-slate-300 mb-6">
                  Décrivez les symptômes et recevez un diagnostic précis avec estimation de coût
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
                  <Brain size={40} className="text-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ex: Mon moteur fait un bruit bizarre quand j'accélère, et il y a une fumée bleue..."
                    className="w-full h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={isAnalyzing ? Loader2 : Brain}
                    loading={isAnalyzing}
                    onClick={handleDeepDiagnosis}
                    disabled={!aiInput.trim() || isAnalyzing}
                    className="whitespace-nowrap"
                  >
                    {isAnalyzing ? 'Analyse...' : 'Analyser avec IA'}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    icon={Mic}
                    onClick={() => setAiInput(prev => prev + ' (test vocal)')}
                  >
                    Dictée vocale
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Diagnosis Result */}
        {diagnosis && (
          <Card className="animate-in fade-in slide-in-from-left-4 border-l-4 border-l-amber-500">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant={
                        diagnosis.severity === 'Critique'
                          ? 'danger'
                          : diagnosis.severity === 'Modéré'
                            ? 'warning'
                            : 'info'
                      }
                      size="lg"
                    >
                      {diagnosis.severity}
                    </Badge>
                    <Badge variant="purple" size="lg">
                      <Clock size={12} /> {diagnosis.time_estimate}
                    </Badge>
                    <Badge variant="gray" size="lg">
                      Risque: {diagnosis.risk_level}
                    </Badge>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {diagnosis.issue_title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {diagnosis.recommended_action}
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl min-w-[180px]">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">
                    Estimation de coût
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {diagnosis.estimated_cost}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Inclut main d'œuvre
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} /> Étapes de sécurité
                  </p>
                  <ul className="space-y-2">
                    {diagnosis.safety_steps.map((step, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Package size={16} /> Pièces potentielles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.parts_needed.map((part, i) => (
                      <Badge key={i} variant="gray" size="sm">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Wrench size={16} /> Expert recommandé
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {diagnosis.mechanic_type}
                  </p>
                  <Button variant="primary" size="sm" icon={Search} className="w-full">
                    Trouver un expert
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Activities */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white">Activités récentes</h3>
            <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right">
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                id: 1,
                type: 'Pneu Crevé',
                date: 'Hier, 14:20',
                price: '4.500F',
                status: 'completed',
                mechanic: 'Moussa B.',
                vehicle: 'Toyota Corolla'
              },
              {
                id: 2,
                type: 'Batterie à plat',
                date: '12 Jan 2024',
                price: '20.000F',
                status: 'completed',
                mechanic: 'Fatou D.',
                vehicle: 'Renault Duster'
              },
              {
                id: 3,
                type: 'Diagnostic électronique',
                date: '10 Jan 2024',
                price: '8.000F',
                status: 'completed',
                mechanic: 'Koffi A.',
                vehicle: 'Toyota Corolla'
              }
            ].map(item => (
              <Card key={item.id} hover className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        item.type.includes('Pneu')
                          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                          : item.type.includes('Batterie')
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      <WrenchIcon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white">{item.type}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.date} • {item.mechanic} • {item.vehicle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800 dark:text-white">{item.price}</p>
                    <Badge
                      variant={item.status === 'completed' ? 'success' : 'warning'}
                      size="sm"
                      className="mt-1"
                    >
                      {item.status === 'completed' ? 'Terminé' : 'En cours'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Vehicle Fleet */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-800 dark:text-white">Mes véhicules</h4>
              <Button variant="ghost" size="sm" icon={Plus} onClick={() => setShowVehicleModal(true)}>
                Ajouter
              </Button>
            </div>
            <div className="space-y-3">
              {userData.vehicles.map(vehicle => (
                <div
                  key={vehicle.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center gap-4 hover:border-amber-200 dark:hover:border-amber-700 transition-colors"
                >
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400">
                    <Car size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {vehicle.plate} • {vehicle.color}
                        </p>
                      </div>
                      <Badge
                        variant={
                          vehicle.status === 'excellent'
                            ? 'success'
                            : vehicle.status === 'good'
                              ? 'info'
                              : vehicle.status === 'needs_attention'
                                ? 'warning'
                                : 'danger'
                        }
                        size="sm"
                      >
                        {vehicle.status === 'excellent'
                          ? 'Parfait'
                          : vehicle.status === 'good'
                            ? 'Bon'
                            : vehicle.status === 'needs_attention'
                              ? 'Attention'
                              : 'Critique'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> Prochaine révision: {vehicle.nextService}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge size={12} /> {vehicle.mileage.toLocaleString()} km
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Coverage Map */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
            <span className="font-bold text-slate-800 dark:text-white">Couverture en direct</span>
            <Badge variant="info">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                LIVE
              </div>
            </Badge>
          </div>
          <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>

            {/* Simulated map points */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>

            {/* User location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full border-2 border-amber-500 flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-amber-500/10 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 text-xs text-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span>Votre position</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Mécaniciens disponibles</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <MapPin size={16} className="text-amber-500" />
            Cotonou, Akpakpa - Quartier JAK
          </div>
        </Card>

        {/* Subscription Card */}
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/30 border-0">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="warning" className="bg-white/20 backdrop-blur-sm border-white/30 mb-2">
                  <Award size={12} /> GOLD
                </Badge>
                <h4 className="text-xl font-bold">AutoAssist Gold</h4>
              </div>
              <div className="text-3xl">🏆</div>
            </div>
            <p className="text-sm opacity-90 mb-6">
              Dépannage illimité, diagnostic IA Premium, et assistance 24/7 inclus pour 12 mois.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="opacity-80" />
                <span>Assistance prioritaire</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="opacity-80" />
                <span>Diagnostic IA avancé</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="opacity-80" />
                <span>Couverture nationale</span>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full mt-6 bg-white text-amber-600 hover:bg-slate-100">
              Gérer l'abonnement
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

import { Car, Plus, MapPin, Award, CheckCircle } from 'lucide-react';
