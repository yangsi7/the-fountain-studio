'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { type Dictionary } from '@/app/[lang]/dictionaries';

interface FooterProps {
  dict: Dictionary['footer'];
  onNavigate: (sectionId: string) => void;
}

export function Footer({ dict, onNavigate }: FooterProps) {
  return (
    <footer className="bg-charcoal text-white py-12 px-6 relative">
      {/* Sacred Geometry Watermark */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <Image
          src="/images/sacred-totem.png"
          alt="Sacred geometry"
          width={200}
          height={200}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl mb-4">The Fountain Studio</h3>
            <p className="text-white/70">
              {dict.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white">
                  {dict.links.services}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white">
                  {dict.links.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white">
                  {dict.links.contact}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  {dict.links.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  {dict.links.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="bg-white/20 mb-6" />
        <div className="text-center text-white/60 text-sm">
          {dict.copyright}
        </div>
      </div>
    </footer>
  );
}