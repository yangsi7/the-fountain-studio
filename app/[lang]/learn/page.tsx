import { type Metadata } from 'next';
import Image from 'next/image';
import { getDictionary } from '../dictionaries';
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import { Footer } from '@/components/sections/Footer';
import { WaveDivider } from '@/components/ui/wave-divider';
import { Button } from '@/components/ui/button';
import { HashScrollHandler } from '@/components/HashScrollHandler';

interface LearnPageProps {
  params: Promise<{ lang: string }>;
}

// SEO Metadata
export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isGerman = lang === 'de';

  return {
    title: isGerman
      ? 'Wie es Funktioniert | The Fountain Studio'
      : 'How It Works | The Fountain Studio',
    description: isGerman
      ? 'Verstehen Sie, wie Biofield Tuning, Gyrotonic und Breathwork zusammenarbeiten, um statische Störungen zu klären und Ihren natürlichen Fluss wiederherzustellen.'
      : 'Understand how Biofield Tuning, Gyrotonic, and Breathwork work together to clear static and restore your natural flow.',
    openGraph: {
      title: isGerman
        ? 'Wie es Funktioniert | The Fountain Studio'
        : 'How It Works | The Fountain Studio',
      description: isGerman
        ? 'Drei Modalitäten für ganzheitliche Heilung: Klangheilung, Bewegung und Atemarbeit.'
        : 'Three modalities for holistic healing: sound healing, movement, and breathwork.',
      type: 'website',
    },
  };
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <NavigationHeader dict={dict} lang={lang} currentPath="/learn" />
      <HashScrollHandler />
      <main className="min-h-screen bg-silk">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6">
            {dict.learn.hero.title}
          </h1>
          <p className="text-xl text-center text-charcoal-secondary max-w-3xl mx-auto mb-8">
            {dict.learn.hero.subtitle}
          </p>
          <div className="max-w-3xl mx-auto space-y-6 text-lg">
            <p>{dict.learn.hero.intro}</p>
            <p className="text-2xl font-serif text-gold text-center italic py-6">
              {dict.learn.hero.quote}
            </p>
            <ul className="space-y-4 pl-6">
              {dict.learn.hero.modalities.map((modality: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>{modality}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Biofield Tuning Section */}
      <section id="biofield" className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            {dict.learn.biofield.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image (Left) - Sticky */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:sticky md:top-24">
              <Image
                src="/images/learn-biofield.jpg"
                alt="Biofield Tuning methodology with tuning forks"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Content (Right) */}
            <div className="space-y-6 text-lg">
              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.biofield.whatItIsTitle}
                </h3>
                <p>{dict.learn.biofield.whatItIs}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.biofield.howItWorksTitle}
                </h3>
                <p>{dict.learn.biofield.howItWorks}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.biofield.benefitsTitle}
                </h3>
                <p>{dict.learn.biofield.benefits}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="cream" flip />

      {/* Gyrotonic Section */}
      <section id="gyrotonic" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            {dict.learn.gyrotonic.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text Content (Left) */}
            <div className="space-y-6 text-lg">
              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.gyrotonic.whatItIsTitle}
                </h3>
                <p>{dict.learn.gyrotonic.whatItIs}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.gyrotonic.howItWorksTitle}
                </h3>
                <p>{dict.learn.gyrotonic.howItWorks}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.gyrotonic.benefitsTitle}
                </h3>
                <p>{dict.learn.gyrotonic.benefits}</p>
              </div>
            </div>

            {/* Image (Right) - Sticky */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:sticky md:top-24">
              <Image
                src="/images/learn-gyrotonic.jpg"
                alt="Gyrotonic Expansion System method"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Breathwork Section */}
      <section id="breathwork" className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            {dict.learn.breathwork.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image (Left) - Sticky */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:sticky md:top-24">
              <Image
                src="/images/learn-breathwork.jpg"
                alt="Breathwork session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Content (Right) */}
            <div className="space-y-6 text-lg">
              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.breathwork.whatItIsTitle}
                </h3>
                <p>{dict.learn.breathwork.whatItIs}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.breathwork.howItWorksTitle}
                </h3>
                <ul className="space-y-2 pl-6">
                  {dict.learn.breathwork.howItWorks.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-3">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3 text-gold">
                  {dict.learn.breathwork.benefitsTitle}
                </h3>
                <p>{dict.learn.breathwork.benefits}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="medium" color="cream" flip />

      {/* How to Choose Your Approach */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
              {dict.learn.comparison.title}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {dict.learn.comparison.modalities.map((modality: { name: string; focus: string; role: string; effect: string; choose: string }, index: number) => (
                <div
                  key={index}
                  className="bg-silk p-8 rounded-lg border border-stone-200 hover:border-gold-muted transition-colors"
                >
                  <h3 className="text-2xl font-serif mb-4 text-gold">{modality.name}</h3>

                  <div className="space-y-4 text-base">
                    <div>
                      <p className="font-semibold mb-1">{dict.learn.comparison.focusLabel}</p>
                      <p>{modality.focus}</p>
                    </div>

                    <div>
                      <p className="font-semibold mb-1">{dict.learn.comparison.roleLabel}</p>
                      <p>{modality.role}</p>
                    </div>

                    <div>
                      <p className="font-semibold mb-1">{dict.learn.comparison.effectLabel}</p>
                      <p>{modality.effect}</p>
                    </div>

                    <div>
                      <p className="font-semibold mb-1">{dict.learn.comparison.chooseLabel}</p>
                      <p>{modality.choose}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6">{dict.learn.comparison.note}</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Final CTA */}
      <section className="py-24 bg-silk">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            {dict.learn.finalCta.title}
          </h2>
          <p className="text-xl mb-12 text-charcoal-secondary">
            {dict.learn.finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.learn.finalCta.primaryCta}
              </a>
            </Button>
            <Button variant="gold-outline" size="lg" asChild>
              <a href={`/${lang}/services`}>
                {dict.learn.finalCta.secondaryCta}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
    <Footer dict={dict.footer} />
    </>
  );
}
