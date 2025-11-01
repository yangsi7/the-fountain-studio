'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface TestimonialsCarouselProps {
  dict: Dictionary['testimonials'];
}

export function TestimonialsCarousel({ dict }: TestimonialsCarouselProps) {
  return (
    <section id="testimonials" className="py-20 lg:py-[140px] px-6 bg-silk relative">
      {/* Background Image with Low Opacity */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/testimonials-bg-sunset.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            {dict.title}
          </h2>
          <p className="text-xl text-charcoal/70">
            {dict.subtitle}
          </p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {dict.items.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 bg-card/90 backdrop-blur">
                  <CardContent className="pt-8 pb-8 px-12">
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-lg text-charcoal/80 mb-6 italic text-center">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <p className="text-center font-semibold text-charcoal">
                      - {testimonial.name}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}