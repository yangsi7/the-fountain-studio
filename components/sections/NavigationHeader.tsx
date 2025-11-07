'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface NavigationHeaderProps {
  dict: Dictionary;
  lang: string;
  currentPath: string; // Pass from server component to avoid hydration mismatch
}

export function NavigationHeader({ dict, lang, currentPath }: NavigationHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === `/${lang}${path}` || pathname === `/${lang}${path}/`;
  };

  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  return (
    <nav className="sticky top-0 z-50 bg-silk/95 backdrop-blur-sm border-b border-charcoal/10">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${lang}`} className="text-2xl font-serif text-charcoal">
          The Fountain Studio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex gap-8">
            <Link
              href={`/${lang}`}
              className={`transition-colors ${
                isHomePage
                  ? 'text-gold font-semibold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              Home
            </Link>
            <Link
              href={`/${lang}/services`}
              className={`transition-colors ${
                isActive('/services')
                  ? 'text-gold font-semibold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              {dict.nav.services}
            </Link>
            <Link
              href={`/${lang}/learn`}
              className={`transition-colors ${
                isActive('/learn')
                  ? 'text-gold font-semibold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              {dict.nav.learn}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={`transition-colors ${
                isActive('/about')
                  ? 'text-gold font-semibold'
                  : 'text-charcoal hover:text-gold'
              }`}
            >
              {dict.nav.about}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 ml-4">
            <Link href={`/de${currentPath}`} data-testid="lang-switcher-de">
              <Button
                size="default"
                variant={lang === 'de' ? 'default' : 'outline'}
                className="px-3"
              >
                DE
              </Button>
            </Link>
            <Link href={`/en${currentPath}`} data-testid="lang-switcher-en">
              <Button
                size="default"
                variant={lang === 'en' ? 'default' : 'outline'}
                className="px-3"
              >
                EN
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[280px] sm:w-[320px]">
            {/* Swiss minimalism: no header title, let content speak */}
            <div className="mt-12 flex flex-col gap-8">
              <Link
                href={`/${lang}`}
                onClick={() => setOpen(false)}
                className={`py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
                  isHomePage
                    ? 'text-gold font-semibold'
                    : 'text-charcoal hover:text-gold hover:underline underline-offset-4'
                }`}
              >
                Home
              </Link>
              <Link
                href={`/${lang}/services`}
                onClick={() => setOpen(false)}
                className={`py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
                  isActive('/services')
                    ? 'text-gold font-semibold'
                    : 'text-charcoal hover:text-gold hover:underline underline-offset-4'
                }`}
              >
                {dict.nav.services}
              </Link>
              <Link
                href={`/${lang}/learn`}
                onClick={() => setOpen(false)}
                className={`py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
                  isActive('/learn')
                    ? 'text-gold font-semibold'
                    : 'text-charcoal hover:text-gold hover:underline underline-offset-4'
                }`}
              >
                {dict.nav.learn}
              </Link>
              <Link
                href={`/${lang}/about`}
                onClick={() => setOpen(false)}
                className={`py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
                  isActive('/about')
                    ? 'text-gold font-semibold'
                    : 'text-charcoal hover:text-gold hover:underline underline-offset-4'
                }`}
              >
                {dict.nav.about}
              </Link>

              <Separator className="my-4" />

              {/* Language Switcher - keep full-width buttons for easy thumb reach */}
              <div className="flex gap-3">
                <Link
                  href={`/de${currentPath}`}
                  className="flex-1"
                  data-testid="lang-switcher-de-mobile"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    size="lg"
                    variant={lang === 'de' ? 'default' : 'outline'}
                    className="w-full"
                  >
                    Deutsch
                  </Button>
                </Link>
                <Link
                  href={`/en${currentPath}`}
                  className="flex-1"
                  data-testid="lang-switcher-en-mobile"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    size="lg"
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