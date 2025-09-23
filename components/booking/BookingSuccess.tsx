'use client';

import { type FC, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useBookingComposer } from './BookingComposer';
import { type BookingSuccessHandlerProps } from './types';

export const BookingSuccess: FC<BookingSuccessHandlerProps> = ({
  message,
  onClose,
}) => {
  const { dictionary, setIsOpen } = useBookingComposer();

  const successMessage = message || dictionary?.successMessage || 'Your booking has been confirmed!';

  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
        setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onClose, setIsOpen]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-silk rounded-lg">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold text-charcoal mb-2">Booking Confirmed!</h3>
      <p className="text-charcoal/70 text-center max-w-md">
        {successMessage}
      </p>
    </div>
  );
};