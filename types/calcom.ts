export type CalEventType =
  | 'BOOKING_CREATED'
  | 'BOOKING_RESCHEDULED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_CONFIRMED'

export interface CalAttendee {
  name: string
  email: string
  timeZone: string
  language: { locale: string }
}

export interface CalBookingData {
  uid: string
  title: string
  startTime: string
  endTime: string
  attendees: CalAttendee[]
  organizer: { name: string; email: string; timeZone: string }
  location?: string
  description?: string
  metadata?: Record<string, string>
}

export interface CalWebhookPayload {
  triggerEvent: CalEventType
  createdAt: string
  payload: CalBookingData
}
