'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface NavigationHeaderProps {
  dict: Dictionary;
  lang: string;
}

export function NavigationHeader({ dict, lang }: NavigationHeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-silk/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="text-2xl font-serif text-charcoal">
          The Fountain Studio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex gap-8">
            <button onClick={() => scrollToSection('services')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.services}
            </button>
            <button onClick={() => scrollToSection('about')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.about}
            </button>
            <button onClick={() => scrollToSection('learn')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.learn}
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.testimonials}
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.faq}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-charcoal hover:text-charcoal/70 transition-colors">
              {dict.nav.contact}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 ml-4">
            <Link href="/de">
              <Button
                size="sm"
                variant={lang === 'de' ? 'default' : 'outline'}
                className="h-8 px-3"
              >
                DE
              </Button>
            </Link>
            <Link href="/en">
              <Button
                size="sm"
                variant={lang === 'en' ? 'default' : 'outline'}
                className="h-8 px-3"
              >
                EN
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <button onClick={() => scrollToSection('services')} className="text-left">{dict.nav.services}</button>
              <button onClick={() => scrollToSection('about')} className="text-left">{dict.nav.about}</button>
              <button onClick={() => scrollToSection('learn')} className="text-left">{dict.nav.learn}</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left">{dict.nav.testimonials}</button>
              <button onClick={() => scrollToSection('faq')} className="text-left">{dict.nav.faq}</button>
              <button onClick={() => scrollToSection('contact')} className="text-left">{dict.nav.contact}</button>
              <Separator className="my-2" />
              <div className="flex gap-2">
                <Link href="/de" className="flex-1">
                  <Button
                    size="sm"
                    variant={lang === 'de' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    Deutsch
                  </Button>
                </Link>
                <Link href="/en" className="flex-1">
                  <Button
                    size="sm"
                    variant={lang === 'en' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    English
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}