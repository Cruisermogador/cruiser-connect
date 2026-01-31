// Core CRM Types for Cruiser Mogador

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  language: 'FR' | 'EN' | 'AR';
  isRepeatGuest: boolean;
  vipLevel: 'none' | 'silver' | 'gold' | 'platinum';
  tags: string[];
  preferences: GuestPreferences;
  createdAt: string;
  notes: string[];
}

export interface GuestPreferences {
  roomPreference?: string;
  floorPreference?: 'low' | 'high' | 'any';
  viewPreference?: 'sea' | 'garden' | 'pool' | 'any';
  dietary?: string[];
  pillowType?: string;
  bedType?: 'king' | 'twin' | 'queen';
  birthday?: string;
  anniversary?: string;
}

export interface Reservation {
  id: string;
  guestId: string;
  guest: Guest;
  status: 'inquiry' | 'option' | 'confirmed' | 'cancelled' | 'no-show' | 'checked-in' | 'checked-out';
  checkIn: string;
  checkOut: string;
  roomType: string;
  roomNumber?: string;
  adults: number;
  children: number;
  source: 'direct' | 'booking' | 'expedia' | 'agency' | 'airbnb';
  ratePlan: string;
  totalAmount: number;
  currency: 'MAD' | 'EUR';
  paymentStatus: 'pending' | 'deposit' | 'paid' | 'refunded';
  depositAmount?: number;
  supplements: string[];
  specialRequests?: string;
  agencyId?: string;
}

export interface Agency {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  commissionRate: number;
  contractStart: string;
  contractEnd: string;
  rateType: 'net' | 'gross';
  paymentTerms: string;
  totalBookings: number;
  outstandingBalance: number;
}

export interface Communication {
  id: string;
  guestId: string;
  type: 'whatsapp' | 'email' | 'note' | 'call';
  direction: 'inbound' | 'outbound' | 'internal';
  subject?: string;
  content: string;
  timestamp: string;
  staffMember: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'guest-request' | 'maintenance' | 'housekeeping' | 'follow-up';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  relatedGuestId?: string;
  relatedRoomNumber?: string;
  dueDate?: string;
  createdAt: string;
}

export type TabType = 'arrivals' | 'departures' | 'stayovers' | 'in-house' | 'options' | 'groups';
