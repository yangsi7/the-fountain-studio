'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getCalApi } from '@calcom/embed-react';
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AboutSection } from '@/components/sections/AboutSection';
import { LearnAccordion } from '@/components/sections/LearnAccordion';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { FAQSection } from '@/components/sections/FAQSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { Footer } from '@/components/sections/Footer';
import { WaveDivider } from '@/components/ui/wave-divider';
import { type Dictionary } from './dictionaries';

interface PageContentProps {
  dict: Dictionary;
  lang: string;
}

export function PageContent({ dict, lang }: PageContentProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

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
        onLearnMoreClick={() => scrollToSection('services')}
      />
      <WaveDivider variant="subtle" color="cream" />

      <ServicesGrid
        dict={dict.servicesSummary}
        onLearnClick={() => scrollToSection('learn')}
        onContactClick={() => scrollToSection('contact')}
      />
      <WaveDivider variant="subtle" color="silk" flip />

      <AboutSection
        dict={dict.aboutSummary}
        onContactClick={() => scrollToSection('contact')}
      />
      <WaveDivider variant="subtle" color="cream" />

      <LearnAccordion dict={dict.learnSummary} />
      <WaveDivider variant="subtle" color="silk" flip />

      <TestimonialsCarousel dict={dict.testimonials} />
      <WaveDivider variant="subtle" color="cream" />

      <FAQSection dict={dict.faq} />
      <WaveDivider variant="medium" color="silk" flip />

      <BookingSection
        dict={dict}
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

    </div>
  );
}