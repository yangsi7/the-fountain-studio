'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface HeroSectionProps {
  dict: Dictionary['hero'];
  onLearnMoreClick: () => void;
}

export function HeroSection({ dict, onLearnMoreClick }: HeroSectionProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-swiss-alps.jpg"
          alt="Swiss Alps healing space"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ=="
          data-testid="hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
          variants={fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {dict.title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
          variants={fadeInUp}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {dict.subtitle}
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center"
          variants={fadeInUp}
          transition={{ delay: 0.7, duration: 0.8 }}>
          <Button
            size="lg"
            variant="gold"
            data-cal-namespace="15min"
            data-cal-link="simon-yang-z2fy7e/15min"
            data-cal-config='{"layout":"month_view"}'
          >
            {dict.cta.book}
          </Button>
          <Button
            size="lg"
            variant="charcoal"
            onClick={onLearnMoreClick}
          >
            {dict.cta.learn}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </motion.section>
  );
}