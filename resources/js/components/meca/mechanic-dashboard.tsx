import React from 'react';
import { Sidebar as MechanicSidebar } from './mechanic-sidebar';
import { MechanicHeader } from './mechanic-header';
import { MechanicDashboardContent } from './mechanic-dashboard-content';
import type { MechanicStats, MechanicEarnings, MissionData } from './types';

interface MechanicDashboardProps {
  stats: MechanicStats;
  earnings: MechanicEarnings;
  missions: MissionData[];
  onLogout?: () => void;
}

export const MechanicDashboard: React.FC<MechanicDashboardProps> = ({
  stats,
  earnings,
  missions,
  onLogout
}) => {
  const [online, setOnline] = React.useState(true);
  const [activeMission, setActiveMission] = React.useState<MissionData | null>(null);
  const [notifications, setNotifications] = React.useState(5);

  const handleAcceptMission = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      setActiveMission({ ...mission, status: 'in_progress' });
    }
  };

  const handleCompleteMission = () => {
    if (activeMission) {
      setActiveMission(null);
    }
  };

  return (
    <div className="flex h-full bg-slate-950 text-white">
      <MechanicSidebar onLogout={onLogout} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <MechanicHeader
          online={online}
          setOnline={setOnline}
          earnings={earnings}
          stats={stats}
          notifications={notifications}
        />

        <MechanicDashboardContent
          online={online}
          earnings={earnings}
          stats={stats}
          missions={missions}
          activeMission={activeMission}
          onAcceptMission={handleAcceptMission}
          onCompleteMission={handleCompleteMission}
          notifications={notifications}
        />
      </main>
    </div>
  );
};
