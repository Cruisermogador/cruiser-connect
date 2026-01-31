import { useState } from 'react';
import { Plus, Search, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockReservations } from '@/data/mockData';
import { Reservation, TabType } from '@/types/crm';
import { cn } from '@/lib/utils';

const tabs: { key: TabType; label: string }[] = [
  { key: 'arrivals', label: 'Arrivées' },
  { key: 'departures', label: 'Départs' },
  { key: 'stayovers', label: 'Séjours' },
  { key: 'in-house', label: 'In-House' },
  { key: 'options', label: 'Options' },
  { key: 'groups', label: 'Groupes' },
];

interface ReservationsTableProps {
  onGuestClick: (reservation: Reservation) => void;
}

export function ReservationsTable({ onGuestClick }: ReservationsTableProps) {
  const [activeTab, setActiveTab] = useState<TabType>('arrivals');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: Reservation['status']) => {
    const styles = {
      confirmed: 'status-confirmed',
      'checked-in': 'bg-primary-lighter text-primary',
      'checked-out': 'bg-muted text-muted-foreground',
      option: 'status-option',
      cancelled: 'status-cancelled',
      'no-show': 'status-cancelled',
      inquiry: 'status-pending',
    };
    
    const labels = {
      confirmed: 'Confirmé',
      'checked-in': 'In-House',
      'checked-out': 'Parti',
      option: 'Option',
      cancelled: 'Annulé',
      'no-show': 'No-show',
      inquiry: 'Demande',
    };

    return (
      <span className={cn('status-badge', styles[status])}>
        {labels[status]}
      </span>
    );
  };

  const getPaymentBadge = (status: Reservation['paymentStatus']) => {
    const styles = {
      paid: 'status-confirmed',
      deposit: 'status-option',
      pending: 'status-pending',
      refunded: 'bg-muted text-muted-foreground',
    };
    
    const labels = {
      paid: 'Payé',
      deposit: 'Acompte',
      pending: 'En attente',
      refunded: 'Remboursé',
    };

    return (
      <span className={cn('status-badge', styles[status])}>
        {labels[status]}
      </span>
    );
  };

  const getSourceLabel = (source: Reservation['source']) => {
    const labels = {
      direct: 'Direct',
      booking: 'Booking.com',
      expedia: 'Expedia',
      agency: 'Agence',
      airbnb: 'Airbnb',
    };
    return labels[source];
  };

  const filteredReservations = mockReservations.filter((res) => {
    const matchesSearch =
      res.guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-card rounded-xl shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Réservations</h2>
          <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 text-primary-foreground shadow-soft">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher nom, chambre, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors',
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Chambre</TableHead>
              <TableHead>Pax</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                className="table-row-hover"
                onClick={() => onGuestClick(reservation)}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {reservation.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {reservation.guest.firstName} {reservation.guest.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {reservation.guest.nationality}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{reservation.roomType}</p>
                    {reservation.roomNumber && (
                      <p className="text-xs text-muted-foreground">#{reservation.roomNumber}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {reservation.adults}A
                    {reservation.children > 0 && ` + ${reservation.children}C`}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {getSourceLabel(reservation.source)}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                <TableCell>{getPaymentBadge(reservation.paymentStatus)}</TableCell>
                <TableCell>
                  <span className="text-sm">{reservation.checkIn}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {reservation.guest.vipLevel !== 'none' && (
                      <Badge variant="outline" className="guest-tag text-xs">
                        VIP
                      </Badge>
                    )}
                    {reservation.guest.tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem>Envoyer message</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Annuler</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
