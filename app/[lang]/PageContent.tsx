'use client';

import { MessageCircle } from 'lucide-react';
import { BookingComposer, useBookingComposer } from '@/components/booking';
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

function PageContentInner({ dict, lang }: PageContentProps) {
  const { setIsOpen } = useBookingComposer();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openBookingModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <NavigationHeader dict={dict} lang={lang} />

      <HeroSection
        dict={dict.hero}
        onBookingClick={openBookingModal}
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
        onBookingClick={openBookingModal}
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

      {/* BookingComposer Modal */}
      <BookingComposer.Modal>
        <BookingComposer.Calendar />
      </BookingComposer.Modal>
    </>
  );
}

export function PageContent({ dict, lang }: PageContentProps) {
  const handleBookingSuccess = (booking: { uid: string; title: string }) => {
    console.log('Booking successful:', booking);
    // Could show a toast notification here
  };

  return (
    <div className="min-h-screen bg-silk">
      <BookingComposer
        username="simon-yang-z2fy7e"
        eventSlug="secret"
        view="MONTH_VIEW"
        onSuccess={handleBookingSuccess}
        dictionary={{
          title: dict.booking?.title || 'Book Your Session',
          description: dict.booking?.subtitle || 'Select a time that works best for you',
        }}
      >
        <PageContentInner dict={dict} lang={lang} />
      </BookingComposer>
    </div>
  );
}