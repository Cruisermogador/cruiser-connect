import { X, Phone, Mail, MessageCircle, Star, MapPin, Calendar, CreditCard, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Reservation, Communication } from '@/types/crm';
import { mockCommunications } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface GuestDrawerProps {
  reservation: Reservation | null;
  onClose: () => void;
}

export function GuestDrawer({ reservation, onClose }: GuestDrawerProps) {
  if (!reservation) return null;

  const { guest } = reservation;
  const communications = mockCommunications.filter((c) => c.guestId === guest.id);

  const getVIPBadge = (level: typeof guest.vipLevel) => {
    if (level === 'none') return null;
    const colors = {
      silver: 'bg-muted text-muted-foreground',
      gold: 'bg-warning-light text-warning',
      platinum: 'bg-primary-lighter text-primary',
    };
    return (
      <Badge className={cn('text-xs font-medium', colors[level])}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  const getCommunicationIcon = (type: Communication['type']) => {
    switch (type) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-success" />;
      case 'email':
        return <Mail className="w-4 h-4 text-info" />;
      case 'call':
        return <Phone className="w-4 h-4 text-primary" />;
      case 'note':
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-card border-l border-border shadow-lg z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {guest.firstName[0]}
                  {guest.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    {guest.firstName} {guest.lastName}
                  </h2>
                  {getVIPBadge(guest.vipLevel)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  {guest.nationality}
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  {guest.language}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Appeler
            </Button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {/* Current Reservation */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Réservation actuelle
            </h3>
            <div className="bg-accent/50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Chambre</span>
                <span className="text-sm font-medium">{reservation.roomType} {reservation.roomNumber && `#${reservation.roomNumber}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dates</span>
                <span className="text-sm font-medium">{reservation.checkIn} → {reservation.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pax</span>
                <span className="text-sm font-medium">{reservation.adults}A {reservation.children > 0 && `+ ${reservation.children}C`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-sm font-semibold text-primary">{reservation.totalAmount.toLocaleString()} {reservation.currency}</span>
              </div>
              {reservation.specialRequests && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Demandes spéciales:</p>
                  <p className="text-sm">{reservation.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Guest Preferences */}
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Préférences
            </h3>
            <div className="flex flex-wrap gap-2">
              {guest.preferences.roomPreference && (
                <Badge variant="outline">{guest.preferences.roomPreference}</Badge>
              )}
              {guest.preferences.viewPreference && (
                <Badge variant="outline">Vue {guest.preferences.viewPreference}</Badge>
              )}
              {guest.preferences.dietary?.map((diet) => (
                <Badge key={diet} variant="outline" className="bg-success-light text-success border-success/30">
                  {diet}
                </Badge>
              ))}
              {guest.preferences.anniversary && (
                <Badge variant="outline" className="bg-destructive-light text-destructive border-destructive/30">
                  Anniversary: {guest.preferences.anniversary}
                </Badge>
              )}
            </div>
            {guest.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {guest.tags.map((tag) => (
                  <span key={tag} className="guest-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Communication Timeline */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Historique
            </h3>
            <div className="space-y-3">
              {communications.map((comm) => (
                <div
                  key={comm.id}
                  className={cn(
                    'p-3 rounded-lg',
                    comm.direction === 'inbound'
                      ? 'bg-accent/50 ml-4'
                      : comm.direction === 'internal'
                      ? 'bg-warning-light border border-warning/20'
                      : 'bg-primary-lighter mr-4'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getCommunicationIcon(comm.type)}
                    <span className="text-xs font-medium text-muted-foreground">
                      {comm.staffMember}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(comm.timestamp).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  {comm.subject && (
                    <p className="text-sm font-medium text-foreground mb-1">{comm.subject}</p>
                  )}
                  <p className="text-sm text-foreground">{comm.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input placeholder="Envoyer un message rapide..." className="flex-1" />
            <Button size="icon" className="bg-gradient-to-r from-primary to-primary-light">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
