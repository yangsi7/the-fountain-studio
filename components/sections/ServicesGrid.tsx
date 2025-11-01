'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface ServicesGridProps {
  dict: Dictionary['servicesSummary'];
  onLearnClick: () => void;
  onContactClick: () => void;
}

export function ServicesGrid({ dict, onLearnClick, onContactClick }: ServicesGridProps) {
  const services = [
    {
      key: 'biofield',
      image: '/images/Kristen-giving-treatment.jpeg',
      data: dict.biofield,
      onClick: onLearnClick,
    },
    {
      key: 'gyrotonic',
      image: '/images/service-gyrotonic-movement.jpg',
      data: dict.gyrotonic,
      onClick: onLearnClick,
    },
    {
      key: 'breathwork',
      image: '/images/service-breathwork.jpg',
      data: dict.breathwork,
      onClick: onLearnClick,
    },
    {
      key: 'integration',
      image: '/images/service-integration.jpg',
      data: dict.integration,
      onClick: onContactClick,
      isPopular: true,
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-[140px] px-6 bg-background-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
            {dict.title}
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card
              className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${
                service.isPopular ? 'border-charcoal/20 bg-gradient-to-br from-white to-silk' : ''
              }`}
            >
              <div className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {service.isPopular && (
                  <Badge className="absolute top-4 right-4 bg-charcoal text-white">
                    Popular
                  </Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-charcoal">{service.data.title}</CardTitle>
                <CardDescription>{service.data.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 mb-4">{service.data.benefits}</p>
                <div className="flex justify-between items-center">
                  <span className="text-charcoal font-semibold">{service.data.price}</span>
                  <Button
                    size="sm"
                    variant={service.isPopular ? 'gold' : 'gold-outline'}
                    onClick={service.onClick}
                  >
                    {service.data.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}