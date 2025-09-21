import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans3 = Source_Sans_3({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'The Fountain Studio - Healing Through Sound & Movement',
  description: 'A boutique healing studio in Au, Zurich helping you clear the static and reconnect with your natural flow through Biofield Tuning, Gyrotonic®, and Breathwork.',
  keywords: 'sound healing, biofield tuning, gyrotonic, breathwork, wellness, zurich, switzerland, healing, therapy',
  authors: [{ name: 'The Fountain Studio' }],
  openGraph: {
    title: 'The Fountain Studio',
    description: 'Healing Through Sound & Movement',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'de_CH',
    siteName: 'The Fountain Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Fountain Studio',
    description: 'Healing Through Sound & Movement',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      'en': '/en',
      'de': '/de',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${sourceSans3.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}