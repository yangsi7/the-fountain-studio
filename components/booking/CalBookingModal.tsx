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
      const cal = await getCalApi({ namespace: 'secret' });
      cal('floatingButton', {
        calLink: 'simon-yang-z2fy7e/secret',
        config: { layout: 'month_view' }
      });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

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
          {/* Cal.com will be triggered by the button with data attributes */}
          <button
            data-cal-namespace="secret"
            data-cal-link="simon-yang-z2fy7e/secret"
            data-cal-config='{"layout":"month_view"}'
            className="hidden"
            aria-hidden="true"
          >
            Click me
          </button>
          <div className="bg-silk rounded-lg p-4 min-h-[500px] flex items-center justify-center">
            <p className="text-charcoal/50 text-sm">Loading calendar...</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}