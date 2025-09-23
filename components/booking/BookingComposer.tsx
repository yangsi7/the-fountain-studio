'use client';

import { createContext, useContext, useState, type FC } from 'react';
import {
  type BookingComposerProps,
  type BookingComposerContextValue,
  type BookingViewMode
} from './types';

const BookingComposerContext = createContext<BookingComposerContextValue | null>(null);

export const useBookingComposer = () => {
  const context = useContext(BookingComposerContext);
  if (!context) {
    throw new Error('useBookingComposer must be used within BookingComposer');
  }
  return context;
};

export const BookingComposer: FC<BookingComposerProps> = ({
  username,
  eventSlug,
  view = 'MONTH_VIEW',
  onSuccess,
  onError,
  dictionary,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue: BookingComposerContextValue = {
    username,
    eventSlug,
    view: view as BookingViewMode,
    isOpen,
    setIsOpen,
    onSuccess,
    onError,
    dictionary,
  };

  return (
    <BookingComposerContext.Provider value={contextValue}>
      {children}
    </BookingComposerContext.Provider>
  );
};