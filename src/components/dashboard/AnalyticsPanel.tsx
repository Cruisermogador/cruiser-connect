import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyStats, dashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Star, AlertCircle, Calendar } from 'lucide-react';

type ChartView = 'revenue' | 'guests' | 'occupancy';

export function AnalyticsPanel() {
  const [chartView, setChartView] = useState<ChartView>('revenue');

  const getChartData = () => {
    return weeklyStats.map((day) => ({
      name: day.day,
      value:
        chartView === 'revenue'
          ? day.revenue / 1000
          : chartView === 'guests'
          ? day.guests
          : day.occupancy,
    }));
  };

  const getYAxisLabel = () => {
    switch (chartView) {
      case 'revenue':
        return 'k MAD';
      case 'guests':
        return 'Guests';
      case 'occupancy':
        return '%';
    }
  };

  return (
    <div className="space-y-4">
      {/* Today's Activities Summary */}
      <div className="bg-card rounded-xl p-4 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Activités du jour</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-info-light">
            <p className="text-2xl font-bold text-info">8</p>
            <p className="text-xs text-info/80">Réservations</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary-lighter">
            <p className="text-2xl font-bold text-primary">32</p>
            <p className="text-xs text-primary/80">Guests</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-success-light">
            <p className="text-2xl font-bold text-success">45.6k</p>
            <p className="text-xs text-success/80">MAD</p>
          </div>
        </div>
      </div>

      {/* Weekly Stats Chart */}
      <div className="bg-card rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Stats hebdo</h3>
          <div className="flex gap-1">
            {(['revenue', 'guests', 'occupancy'] as ChartView[]).map((view) => (
              <button
                key={view}
                onClick={() => setChartView(view)}
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-md transition-colors',
                  chartView === view
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent'
                )}
              >
                {view === 'revenue' ? 'Revenu' : view === 'guests' ? 'Guests' : 'Occ.'}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value} ${getYAxisLabel()}`, '']}
              />
              <Bar
                dataKey="value"
                fill="url(#purpleGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(262 83% 58%)" />
                  <stop offset="100%" stopColor="hsl(262 83% 68%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card rounded-xl p-4 shadow-card space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Alertes</h3>
        
        <div className="flex items-center gap-3 p-2 rounded-lg bg-warning-light">
          <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-warning" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{dashboardStats.pendingPayments} paiements</p>
            <p className="text-xs text-muted-foreground">en attente</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-primary-lighter">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Star className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{dashboardStats.vipInHouse} VIP</p>
            <p className="text-xs text-muted-foreground">in-house</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-info-light">
          <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-info" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{dashboardStats.specialRequests} demandes</p>
            <p className="text-xs text-muted-foreground">spéciales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
