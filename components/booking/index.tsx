import { BookingComposer as BookingComposerRoot } from './BookingComposer';
import { BookingTrigger } from './BookingTrigger';
import { BookingModal } from './BookingModal';
import { BookingCalendar } from './BookingCalendar';
import { BookingSuccess } from './BookingSuccess';

// Export compound component with subcomponents attached
export const BookingComposer = Object.assign(BookingComposerRoot, {
  Trigger: BookingTrigger,
  Modal: BookingModal,
  Calendar: BookingCalendar,
  Success: BookingSuccess,
});

// Also export individual components for flexibility
export { BookingTrigger } from './BookingTrigger';
export { BookingModal } from './BookingModal';
export { BookingCalendar } from './BookingCalendar';
export { BookingSuccess } from './BookingSuccess';
export { useBookingComposer } from './BookingComposer';

// Export types
export type {
  BookingViewMode,
  BookingSuccess as BookingSuccessType,
  BookingError,
  BookerEmbedProps,
  BookingComposerProps,
  BookingTriggerProps,
  BookingModalProps,
  BookingCalendarProps,
  BookingSuccessHandlerProps,
  BookingComposerContextValue,
} from './types';