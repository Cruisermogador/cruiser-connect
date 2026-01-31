import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, CheckCircle, XCircle, Wrench } from 'lucide-react';

const rooms = [
  { number: '101', type: 'Deluxe Room', status: 'occupied', floor: 1 },
  { number: '102', type: 'Family Apartment', status: 'occupied', floor: 1 },
  { number: '103', type: 'Garden Room', status: 'available', floor: 1 },
  { number: '201', type: 'Ocean Suite', status: 'available', floor: 2 },
  { number: '202', type: 'Pool Suite', status: 'maintenance', floor: 2 },
  { number: '205', type: 'Executive Suite', status: 'occupied', floor: 2 },
  { number: '301', type: 'Ocean Suite', status: 'occupied', floor: 3 },
  { number: '302', type: 'Penthouse', status: 'available', floor: 3 },
];

const statusConfig = {
  available: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
  occupied: { color: 'bg-primary/20 text-primary', icon: Bed },
  maintenance: { color: 'bg-amber-100 text-amber-700', icon: Wrench },
};

export default function Rooms() {
  const stats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === 'available').length,
    occupied: rooms.filter((r) => r.status === 'occupied').length,
    maintenance: rooms.filter((r) => r.status === 'maintenance').length,
  };

  return (
    <DashboardLayout title="Rooms">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{stats.occupied}</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-amber-600">{stats.maintenance}</p>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Rooms Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rooms.map((room) => {
                const config = statusConfig[room.status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <div
                    key={room.number}
                    className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{room.number}</span>
                      <Badge className={config.color}>
                        <Icon className="w-3 h-3 mr-1" />
                        {room.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                    <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
