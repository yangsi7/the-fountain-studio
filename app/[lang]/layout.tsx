import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Fountain Studio - Healing Through Sound & Movement',
  description: 'A boutique healing studio in Au, Zurich helping you clear the static and reconnect with your natural flow through Biofield Tuning, Gyrotonic®, and Breathwork.',
};

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }];
}

export default function LanguageLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  return <>{children}</>;
}