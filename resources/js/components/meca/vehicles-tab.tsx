import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import {
  Car, Plus, Eye, Edit, Calendar, Fuel, Gauge
} from 'lucide-react';
import type { Vehicle } from './types';

interface VehiclesTabProps {
  vehicles: Vehicle[];
  onAddClick: () => void;
}

export const VehiclesTab: React.FC<VehiclesTabProps> = ({ vehicles, onAddClick }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mes véhicules</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Gérez votre flotte de véhicules
          </p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={onAddClick}
        >
          Ajouter un véhicule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <Card key={vehicle.id} hover className="overflow-hidden">
            <div className="relative">
              {/* Vehicle Image/Placeholder */}
              <div className="h-48 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <Car size={64} className="text-slate-300 dark:text-slate-600" />
                <div className="absolute top-4 right-4">
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
                  >
                    {vehicle.status === 'excellent'
                      ? 'Parfait'
                      : vehicle.status === 'good'
                        ? 'Bon'
                        : vehicle.status === 'needs_attention'
                          ? 'À surveiller'
                          : 'Attention'}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {vehicle.brand} {vehicle.model}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {vehicle.year} • {vehicle.plate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {vehicle.color}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Vehicle Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Fuel size={16} className="text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {vehicle.fuelType === 'gasoline'
                          ? 'Essence'
                          : vehicle.fuelType === 'diesel'
                            ? 'Diesel'
                            : vehicle.fuelType === 'electric'
                              ? 'Électrique'
                              : 'Hybride'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge size={16} className="text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {vehicle.mileage.toLocaleString()} km
                      </span>
                    </div>
                  </div>

                  {/* Service Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-400">
                        Prochaine révision
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {vehicle.nextService}
                      </span>
                    </div>
                    <ProgressBar
                      value={30}
                      max={100}
                      color="emerald"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="ghost" size="sm" icon={Eye} className="flex-1">
                      Détails
                    </Button>
                    <Button variant="ghost" size="sm" icon={Edit} className="flex-1">
                      Modifier
                    </Button>
                    <Button variant="ghost" size="sm" icon={Calendar} className="flex-1">
                      RDV
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
