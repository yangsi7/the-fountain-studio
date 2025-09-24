import { type ReactNode } from 'react';

export type BookingViewMode = 'MONTH_VIEW' | 'WEEK_VIEW' | 'COLUMN_VIEW';

export interface BookingSuccess {
  id: string;
  uid: string;
  title: string;
  start: string;
  end: string;
  attendees: Array<{
    email: string;
    name?: string;
  }>;
}

export interface BookingError {
  code: string;
  message: string;
  details?: unknown;
}

export interface BookerEmbedProps {
  username: string;
  eventSlug: string;
  view?: BookingViewMode;
  hideEventTypeDetails?: boolean;
  customClassNames?: {
    bookerContainer?: string;
    eventMetaCustomClassNames?: string;
    datePickerCustomClassNames?: string;
    availableTimeSlotsCustomClassNames?: string;
    confirmStep?: string;
  };
  onCreateBookingSuccess?: (booking: BookingSuccess) => void;
  onCreateBookingError?: (error: BookingError) => void;
  onReserveSlotSuccess?: () => void;
  onDeleteSlotSuccess?: () => void;
  timeZones?: string[];
  startTime?: Date;
}

export interface BookingComposerContextValue {
  username: string;
  eventSlug: string;
  view: BookingViewMode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess?: (booking: BookingSuccess) => void;
  onError?: (error: BookingError) => void;
  dictionary?: {
    title?: string;
    description?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

export interface BookingComposerProps {
  username: string;
  eventSlug: string;
  view?: BookingViewMode;
  onSuccess?: (booking: BookingSuccess) => void;
  onError?: (error: BookingError) => void;
  children: ReactNode;
  dictionary?: BookingComposerContextValue['dictionary'];
}

export interface BookingTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface BookingModalProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export interface BookingCalendarProps {
  hideEventTypeDetails?: boolean;
  customClassNames?: BookerEmbedProps['customClassNames'];
  timeZones?: string[];
  startTime?: Date;
}

export interface BookingSuccessHandlerProps {
  message?: string;
  onClose?: () => void;
}