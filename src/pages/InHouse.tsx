import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Clock } from 'lucide-react';
import { mockReservations } from '@/data/mockData';

const inHouseGuests = mockReservations.filter((r) => r.status === 'checked-in');

export default function InHouse() {
  return (
    <DashboardLayout title="In-House Guests">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inHouseGuests.length}</p>
                  <p className="text-sm text-muted-foreground">Currently In-House</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {inHouseGuests.filter((g) => g.guest.vipLevel !== 'none').length}
                  </p>
                  <p className="text-sm text-muted-foreground">VIP Guests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Late Checkouts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* In-House List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Guests</CardTitle>
          </CardHeader>
          <CardContent>
            {inHouseGuests.length > 0 ? (
              <div className="space-y-4">
                {inHouseGuests.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {res.guest.firstName} {res.guest.lastName}
                        </span>
                        {res.guest.vipLevel !== 'none' && (
                          <Badge className="bg-amber-100 text-amber-700">
                            {res.guest.vipLevel.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Room {res.roomNumber} • {res.roomType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Check-out: {res.checkOut}</p>
                      <p className="text-sm text-muted-foreground">
                        {res.adults} adults{res.children > 0 && `, ${res.children} children`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No guests currently in-house</p>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
