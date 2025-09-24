'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CalBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function CalBookingModal({
  open,
  onOpenChange,
  title = 'Book Your Session',
  description = 'Select a time that works best for you',
}: CalBookingModalProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'booking-modal' });
      cal('ui', {
        styles: { branding: { brandColor: '#2C2B29' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  useEffect(() => {
    if (open) {
      // Trigger Cal.com modal when our dialog opens
      (async function () {
        const cal = await getCalApi({ namespace: 'booking-modal' });
        cal('modal', {
          calLink: 'simon-yang-z2fy7e/secret',
        });
      })();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-serif text-charcoal">
            {title}
          </DialogTitle>
          <DialogDescription className="text-charcoal/70">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-auto px-6 pb-6">
          {/* Cal.com inline embed */}
          <div
            data-cal-link="simon-yang-z2fy7e/secret"
            data-cal-namespace="booking-modal"
            data-cal-config='{"layout":"month_view","theme":"light"}'
            style={{ width: '100%', height: '100%', minHeight: '500px' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}