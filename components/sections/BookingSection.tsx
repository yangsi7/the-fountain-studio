'use client';

import { Check, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface BookingSectionProps {
  dict: Dictionary;
  onBookingClick: () => void;
}

export function BookingSection({ dict, onBookingClick }: BookingSectionProps) {
  return (
    <section id="contact" className="py-20 lg:py-[140px] px-6 bg-silk">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-xl text-charcoal/70">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Booking Card */}
          <div>
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-serif text-charcoal">
                  {dict.booking.title}
                </CardTitle>
                <CardDescription className="text-lg text-charcoal/70 mt-4">
                  {dict.booking.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-charcoal" />
                    <span className="text-charcoal">{dict.booking.benefits.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-charcoal" />
                    <span className="text-charcoal">{dict.booking.benefits.confirmation}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-charcoal" />
                    <span className="text-charcoal">{dict.booking.benefits.secure}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gold hover:bg-gold-hover text-white transform hover:scale-105 transition-all"
                  onClick={onBookingClick}
                >
                  {dict.booking.cta}
                </Button>

                <div className="text-sm text-charcoal/60 text-center space-y-1">
                  <p>{dict.booking.details.duration} • {dict.booking.details.location}</p>
                  <p className="mt-2">{dict.booking.details.cancellation}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-charcoal mb-4">{dict.contact.info.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-charcoal mt-1" />
                  <div>
                    <p className="font-semibold text-charcoal">Address</p>
                    <p className="text-charcoal/70">{dict.contact.info.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-charcoal mt-1" />
                  <div>
                    <p className="font-semibold text-charcoal">Phone</p>
                    <p className="text-charcoal/70">{dict.contact.info.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-charcoal mt-1" />
                  <div>
                    <p className="font-semibold text-charcoal">Email</p>
                    <p className="text-charcoal/70">{dict.contact.info.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Contact Methods */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(`https://wa.me/41787950009?text=Hi%20Kristen,%20I'm%20interested%20in%20booking%20a%20session`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {dict.contact.alternatives.whatsapp}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}