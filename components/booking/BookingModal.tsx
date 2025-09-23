'use client';

import { type FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBookingComposer } from './BookingComposer';
import { type BookingModalProps } from './types';
import { cn } from '@/lib/utils';

export const BookingModal: FC<BookingModalProps> = ({
  title,
  description,
  children,
  className,
}) => {
  const { isOpen, setIsOpen, dictionary } = useBookingComposer();

  const modalTitle = title || dictionary?.title || 'Book Your Session';
  const modalDescription = description || dictionary?.description || 'Select a time that works best for you';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn('max-w-4xl h-[80vh] p-0', className)}>
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-serif text-charcoal">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-charcoal/70">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-auto px-6 pb-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};