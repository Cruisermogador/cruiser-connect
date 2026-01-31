import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICards } from '@/components/dashboard/KPICards';
import { ReservationsTable } from '@/components/dashboard/ReservationsTable';
import { AnalyticsPanel } from '@/components/dashboard/AnalyticsPanel';
import { GuestDrawer } from '@/components/dashboard/GuestDrawer';
import { Reservation } from '@/types/crm';

export default function Dashboard() {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <KPICards />

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reservations table - 2/3 width */}
          <div className="lg:col-span-2">
            <ReservationsTable onGuestClick={setSelectedReservation} />
          </div>

          {/* Analytics panel - 1/3 width */}
          <div className="lg:col-span-1">
            <AnalyticsPanel />
          </div>
        </div>
      </div>

      {/* Guest Drawer */}
      <GuestDrawer
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />
    </DashboardLayout>
  );
}
