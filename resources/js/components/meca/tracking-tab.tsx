import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText, Users, Navigation, MapPin, CheckCircle, Clock,
  User, Car, Phone, MessageSquare, X, Eye, MoreVertical
} from 'lucide-react';

interface TrackingTabProps {
  activeRequest: any;
}

export const TrackingTab: React.FC<TrackingTabProps> = ({ activeRequest }) => {
  if (!activeRequest) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Suivi de votre assistance
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Votre mécanicien est en route vers votre position
          </p>
        </div>
        <Badge variant="info" size="lg">
          <Clock size={14} /> 15-20 min
        </Badge>
      </div>

      <Card className="mb-8">
        <div className="p-8">
          {/* Progress Steps */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2"></div>

            <div className="flex justify-between relative z-10">
              {[
                { status: 'Demande', icon: FileText, active: true },
                { status: 'Assigné', icon: Users, active: true },
                { status: 'En route', icon: Navigation, active: true },
                { status: 'Arrivé', icon: MapPin, active: false },
                { status: 'Terminé', icon: CheckCircle, active: false }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-4 ${
                      step.active
                        ? 'bg-amber-500 border-white dark:border-slate-900 shadow-lg shadow-amber-500/50'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <step.icon size={20} className={step.active ? 'text-white' : 'text-slate-400'} />
                  </div>
                  <span className={`text-sm font-bold ${step.active ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mechanic Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <User size={20} /> Votre mécanicien
              </h4>
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa"
                  className="w-16 h-16 rounded-full border-4 border-amber-500"
                  alt="mechanic"
                />
                <div>
                  <p className="font-bold text-xl text-slate-900 dark:text-white">Moussa B.</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye size={16} className="text-amber-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">4.9</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">(124 missions)</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    Spécialiste moteur et transmission • 5 ans d'expérience
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Car size={20} /> Véhicule concerné
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Car size={32} />
                </div>
                <div>
                  <p className="font-bold text-xl text-slate-900 dark:text-white">
                    Toyota Corolla
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ABC-1234 • Gris Métal
                  </p>
                  <Badge variant="warning" size="sm" className="mt-2">
                    Pneu crevé - avant droit
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              variant="primary"
              size="lg"
              icon={Phone}
              className="flex-1"
            >
              Appeler le mécanicien
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={MessageSquare}
              className="flex-1"
            >
              Envoyer un message
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={X}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Card>

      {/* Live Map */}
      <Card className="overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-slate-900 to-slate-800 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"></div>

          {/* User location */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full border-4 border-amber-500 flex items-center justify-center animate-pulse">
                <MapPin size={24} className="text-amber-500" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">
                Vous
              </div>
            </div>
          </div>

          {/* Mechanic moving */}
          <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <Car size={24} className="text-emerald-500" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">
                Moussa B. • 8 min
              </div>
            </div>
          </div>

          {/* Route line */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-amber-500/30 -translate-y-1/2">
            <div className="h-full w-1/2 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};
