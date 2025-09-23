'use client';

import { type FC } from 'react';
import { Booker } from '@calcom/atoms';
import { useBookingComposer } from './BookingComposer';
import { type BookingCalendarProps } from './types';

interface CalcomBookingResponse {
  data?: {
    id?: string;
    uid?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    attendees?: Array<{
      email: string;
      name?: string;
    }>;
  };
}

interface CalcomErrorResponse {
  code?: string;
  message?: string;
}

export const BookingCalendar: FC<BookingCalendarProps> = ({
  customClassNames,
}) => {
  const { username, eventSlug, onSuccess, onError } = useBookingComposer();

  return (
    <div className="bg-silk rounded-lg p-4 min-h-[500px]">
      <Booker
        username={username}
        eventSlug={eventSlug}
        customClassNames={{
          bookerContainer: `border-subtle border ${customClassNames?.bookerContainer || ''}`,
        }}
        onCreateBookingSuccess={(booking: unknown) => {
          console.log('Booking created successfully:', booking);
          // Transform the booking data to match our interface
          const bookingData = booking as CalcomBookingResponse;
          if (onSuccess && bookingData?.data) {
            onSuccess({
              id: bookingData.data.id || '',
              uid: bookingData.data.uid || '',
              title: bookingData.data.title || '',
              start: bookingData.data.startTime || '',
              end: bookingData.data.endTime || '',
              attendees: bookingData.data.attendees || [],
            });
          }
        }}
        onCreateBookingError={(error: unknown) => {
          console.error('Booking error:', error);
          // Transform the error to match our interface
          const errorData = error as CalcomErrorResponse;
          if (onError) {
            onError({
              code: errorData?.code || 'UNKNOWN_ERROR',
              message: errorData?.message || 'An error occurred',
              details: error,
            });
          }
        }}
      />
    </div>
  );
};