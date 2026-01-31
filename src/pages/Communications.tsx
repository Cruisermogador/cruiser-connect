import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Mail, StickyNote, Phone } from 'lucide-react';
import { mockCommunications, mockGuests } from '@/data/mockData';

const typeIcons = {
  whatsapp: MessageCircle,
  email: Mail,
  note: StickyNote,
  call: Phone,
};

const typeColors = {
  whatsapp: 'bg-green-100 text-green-700',
  email: 'bg-blue-100 text-blue-700',
  note: 'bg-amber-100 text-amber-700',
  call: 'bg-purple-100 text-purple-700',
};

export default function Communications() {
  const getGuestName = (guestId: string) => {
    const guest = mockGuests.find((g) => g.id === guestId);
    return guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown';
  };

  return (
    <DashboardLayout title="Communications">
      <div className="space-y-6">
        {/* Header */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search communications..." className="pl-9" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCommunications.map((comm) => {
                    const Icon = typeIcons[comm.type];
                    return (
                      <div
                        key={comm.id}
                        className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 rounded-full h-fit ${typeColors[comm.type]}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{getGuestName(comm.guestId)}</span>
                            <Badge variant="outline" className="text-xs">
                              {comm.direction}
                            </Badge>
                          </div>
                          {comm.subject && (
                            <p className="text-sm font-medium">{comm.subject}</p>
                          )}
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {comm.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comm.timestamp).toLocaleString()} • {comm.staffMember}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  WhatsApp messages will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Email communications will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Internal notes will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
