import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Plus, Star } from 'lucide-react';
import { mockGuests } from '@/data/mockData';

const vipColors = {
  none: '',
  silver: 'bg-gray-100 text-gray-700',
  gold: 'bg-amber-100 text-amber-700',
  platinum: 'bg-purple-100 text-purple-700',
};

export default function Guests() {
  return (
    <DashboardLayout title="Guests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search guests by name, email, or phone..." className="pl-9" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </div>

        {/* Guests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGuests.map((guest) => (
            <Card key={guest.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {guest.firstName} {guest.lastName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{guest.nationality}</p>
                  </div>
                  {guest.vipLevel !== 'none' && (
                    <Badge className={vipColors[guest.vipLevel]}>
                      <Star className="w-3 h-3 mr-1" />
                      {guest.vipLevel.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{guest.email}</p>
                <p className="text-sm text-muted-foreground">{guest.phone}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {guest.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {guest.isRepeatGuest && (
                  <Badge variant="outline" className="text-xs text-primary border-primary">
                    Repeat Guest
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
