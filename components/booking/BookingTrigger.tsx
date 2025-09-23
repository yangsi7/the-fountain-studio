'use client';

import { type FC, cloneElement, isValidElement } from 'react';
import { useBookingComposer } from './BookingComposer';
import { type BookingTriggerProps } from './types';

export const BookingTrigger: FC<BookingTriggerProps> = ({ children, asChild = false }) => {
  const { setIsOpen } = useBookingComposer();

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    });
  }

  return (
    <div onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick();
      }
    }}>
      {children}
    </div>
  );
};