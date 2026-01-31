import { Briefcase, DoorOpen, Building2, Activity } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Arrivals */}
      <div className="kpi-card cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Arrivées aujourd'hui</p>
            <p className="text-3xl font-bold text-foreground mt-1">{dashboardStats.arrivalsToday}</p>
            <p className="text-xs text-muted-foreground mt-1">cette semaine: 18</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-info" />
          </div>
        </div>
      </div>

      {/* Departures */}
      <div className="kpi-card cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Départs aujourd'hui</p>
            <p className="text-3xl font-bold text-foreground mt-1">{dashboardStats.departuresToday}</p>
            <p className="text-xs text-muted-foreground mt-1">cette semaine: 12</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
            <DoorOpen className="w-5 h-5 text-warning" />
          </div>
        </div>
      </div>

      {/* Occupancy - Primary gradient card */}
      <div className="kpi-card kpi-card-primary cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Chambres occupées</p>
            <p className="text-3xl font-bold text-white mt-1">{dashboardStats.inHouse}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {dashboardStats.occupancyRate}%
              </span>
              <span className="text-xs text-white/70">occupancy</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="kpi-card cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Activités du jour</p>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <p className="text-xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Réservations</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-xl font-bold text-foreground">32</p>
                <p className="text-xs text-muted-foreground">Guests</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-xl font-bold text-success">45.6k</p>
                <p className="text-xs text-muted-foreground">MAD</p>
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
            <Activity className="w-5 h-5 text-success" />
          </div>
        </div>
      </div>
    </div>
  );
}
