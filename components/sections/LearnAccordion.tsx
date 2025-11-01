'use client';

import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface LearnAccordionProps {
  dict: Dictionary['learnSummary'];
}

export function LearnAccordion({ dict }: LearnAccordionProps) {
  const sections = [
    {
      key: 'biofield',
      data: dict.biofield,
      image: '/images/learn-biofield.jpg',
    },
    {
      key: 'gyrotonic',
      data: dict.gyrotonic,
      image: '/images/learn-gyrotonic.jpg',
    },
    {
      key: 'breathwork',
      data: dict.breathwork,
      image: '/images/learn-breathwork.jpg',
    },
  ];

  return (
    <section id="learn" className="py-20 lg:py-[140px] px-6 bg-background-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            {dict.title}
          </h2>
          <p className="text-xl text-charcoal/70">
            {dict.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section) => (
            <AccordionItem key={section.key} value={section.key} className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold text-charcoal hover:text-gold">
                {section.data.title}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/70 pb-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p>{section.data.content}</p>
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={section.image}
                      alt={section.data.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}