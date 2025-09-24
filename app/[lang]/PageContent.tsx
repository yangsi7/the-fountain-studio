'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CalBookingModal } from '@/components/booking/CalBookingModal';
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AboutSection } from '@/components/sections/AboutSection';
import { LearnAccordion } from '@/components/sections/LearnAccordion';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { FAQSection } from '@/components/sections/FAQSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { Footer } from '@/components/sections/Footer';
import { type Dictionary } from './dictionaries';

interface PageContentProps {
  dict: Dictionary;
  lang: string;
}

export function PageContent({ dict, lang }: PageContentProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-silk">
      <NavigationHeader dict={dict} lang={lang} />

      <HeroSection
        dict={dict.hero}
        onBookingClick={() => setBookingModalOpen(true)}
        onLearnMoreClick={() => scrollToSection('services')}
      />

      <ServicesGrid
        dict={dict.services}
        onLearnClick={() => scrollToSection('learn')}
        onContactClick={() => scrollToSection('contact')}
      />

      <AboutSection
        dict={dict.about}
        onContactClick={() => scrollToSection('contact')}
      />

      <LearnAccordion dict={dict.learn} />

      <TestimonialsCarousel dict={dict.testimonials} />

      <FAQSection dict={dict.faq} />

      <BookingSection
        dict={dict}
        onBookingClick={() => setBookingModalOpen(true)}
      />

      <Footer dict={dict.footer} onNavigate={scrollToSection} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/41787950009?text=Hi%20Kristen,%20I'm%20interested%20in%20booking%20a%20session"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>

      {/* Cal.com Booking Modal */}
      <CalBookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </div>
  );
}