import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar } from 'lucide-react';
import { mockReservations } from '@/data/mockData';

const statusColors: Record<string, string> = {
  inquiry: 'bg-blue-100 text-blue-700',
  option: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  'no-show': 'bg-gray-100 text-gray-700',
  'checked-in': 'bg-primary/20 text-primary',
  'checked-out': 'bg-gray-100 text-gray-700',
};

export default function Reservations() {
  return (
    <DashboardLayout title="Reservations">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search reservations..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Reservation
            </Button>
          </div>
        </div>

        {/* Reservations List */}
        <Card>
          <CardHeader>
            <CardTitle>All Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReservations.map((res) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {res.guest.firstName} {res.guest.lastName}
                      </span>
                      <Badge className={statusColors[res.status]}>{res.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {res.id} • {res.roomType} {res.roomNumber && `• Room ${res.roomNumber}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {res.checkIn} → {res.checkOut}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {res.totalAmount.toLocaleString()} {res.currency}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
