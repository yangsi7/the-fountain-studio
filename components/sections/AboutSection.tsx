'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface AboutSectionProps {
  dict: Dictionary['aboutSummary'];
  onContactClick: () => void;
}

export function AboutSection({ dict, onContactClick }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-[140px] px-6 bg-silk">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <Image
              src="/images/Kristen-faceshot.jpeg"
              alt="Kristen Slabaugh"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ=="
              data-testid="about-image"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-4xl font-serif text-charcoal mb-4">{dict.title}</h2>
            <p className="text-xl text-charcoal font-semibold mb-4">{dict.subtitle}</p>
            <p className="text-charcoal/70 mb-6">{dict.intro}</p>
            <p className="text-charcoal/70 mb-6">{dict.description}</p>
            <blockquote className="border-l-4 border-charcoal/20 pl-6 mb-8 italic text-charcoal/80">
              &ldquo;{dict.quote}&rdquo;
            </blockquote>
            <p className="font-semibold text-charcoal mb-6">{dict.mission}</p>

            <div className="mb-8">
              <h3 className="font-semibold text-charcoal mb-3">{dict.credentials.title}:</h3>
              <ul className="space-y-2">
                {dict.credentials.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-charcoal/70">
                    <span className="w-1.5 h-1.5 bg-charcoal rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              size="lg"
              variant="charcoal"
              onClick={onContactClick}
            >
              {dict.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}