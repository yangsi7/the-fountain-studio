'use client';

import { useState } from 'react';
import { CalBookingModal } from '@/components/booking/CalBookingModal';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      {children}
      <CalBookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </>
  );
}