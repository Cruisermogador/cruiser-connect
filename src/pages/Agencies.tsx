import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Building2, DollarSign } from 'lucide-react';
import { mockAgencies } from '@/data/mockData';

export default function Agencies() {
  return (
    <DashboardLayout title="Agencies / B2B">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search agencies..." className="pl-9" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Agency
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockAgencies.length}</p>
                  <p className="text-sm text-muted-foreground">Active Partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAgencies.reduce((sum, a) => sum + a.totalBookings, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAgencies.reduce((sum, a) => sum + a.outstandingBalance, 0).toLocaleString()} MAD
                  </p>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agencies List */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAgencies.map((agency) => (
                <div
                  key={agency.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{agency.name}</span>
                      <Badge variant="outline">{agency.rateType.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {agency.contactPerson} • {agency.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{agency.commissionRate}% commission</p>
                    <p className="text-sm text-muted-foreground">
                      {agency.totalBookings} bookings • {agency.outstandingBalance.toLocaleString()} MAD due
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
