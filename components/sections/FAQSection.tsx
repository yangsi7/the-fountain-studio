'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface FAQSectionProps {
  dict: Dictionary['faq'];
}

export function FAQSection({ dict }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 lg:py-[140px] px-6 bg-background-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            {dict.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {dict.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left text-charcoal hover:text-gold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/70 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}