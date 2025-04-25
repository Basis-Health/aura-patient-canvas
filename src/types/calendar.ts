
export interface Attendee {
  id: string;
  name: string;
  email?: string;
  status: 'organizer' | 'confirmed' | 'pending' | 'declined';
}

export interface Event {
  id: string;
  title: string;
  start: string;  // Format: "HH:MM AM/PM"
  end: string;    // Format: "HH:MM AM/PM"
  date?: Date;
  type: string;  // 'work', 'appointment', 'meeting', 'busy', etc.
  description?: string;
  location?: string;
  meetingLink?: string;
  attendees?: Attendee[];
  recurring?: boolean;
  recurrencePattern?: string;
}

export type ViewType = 'individual' | 'team';
