import { type Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import { Footer } from '@/components/sections/Footer';
import { WaveDivider } from '@/components/ui/wave-divider';
import { Button } from '@/components/ui/button';

interface ServicesPageProps {
  params: Promise<{ lang: string }>;
}

// SEO Metadata
export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isGerman = lang === 'de';

  return {
    title: isGerman
      ? 'Services & Preise | The Fountain Studio'
      : 'Services & Pricing | The Fountain Studio',
    description: isGerman
      ? 'Biofield Tuning, Gyrotonic, Breathwork und Kombinationspakete für ganzheitliche Heilung. Transparent Preise und flexible Optionen in Au bei Zürich.'
      : 'Biofield Tuning, Gyrotonic, Breathwork and combination packages for holistic healing. Transparent pricing and flexible options in Au near Zurich.',
    openGraph: {
      title: isGerman
        ? 'Services & Preise | The Fountain Studio'
        : 'Services & Pricing | The Fountain Studio',
      description: isGerman
        ? 'Biofield Tuning, Gyrotonic, Breathwork und Kombinationspakete für ganzheitliche Heilung.'
        : 'Biofield Tuning, Gyrotonic, Breathwork and combination packages for holistic healing.',
      type: 'website',
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <NavigationHeader dict={dict} lang={lang} />
      <main className="min-h-screen bg-silk">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6">
            {dict.services.hero.title}
          </h1>
          <p className="text-xl text-center text-charcoal-secondary max-w-3xl mx-auto">
            {dict.services.hero.subtitle}
          </p>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Complete Integration Experience */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              {dict.services.integration.title}
            </h2>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-serif text-gold">
                {dict.services.integration.price}
              </span>
              <span className="text-lg text-charcoal-secondary">
                {dict.services.integration.duration}
              </span>
            </div>

            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-serif">
                {dict.services.integration.componentsTitle}
              </h3>
              <ul className="space-y-3 pl-6">
                {dict.services.integration.components.map((component: string, index: number) => (
                  <li key={index} className="text-lg flex items-start">
                    <span className="text-gold mr-3">•</span>
                    <span>{component}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg mb-8">
              {dict.services.integration.benefits}
            </p>

            <Button variant="gold" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.services.integration.cta}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="cream" flip />

      {/* Biofield Tuning Packages */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
            {dict.services.biofield.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {dict.services.biofield.packages.map((pkg: { name: string; price: string; duration: string; description: string; savings: string | null }, index: number) => (
              <div
                key={index}
                className="bg-silk p-8 rounded-lg border border-stone-200 hover:border-gold-muted transition-colors"
              >
                <h3 className="text-2xl font-serif mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-serif text-gold">{pkg.price}</span>
                  <span className="text-charcoal-secondary">{pkg.duration}</span>
                </div>
                <p className="text-lg mb-6">{pkg.description}</p>
                {pkg.savings && (
                  <p className="text-gold font-medium mb-4">{pkg.savings}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-serif mb-4">
              {dict.services.biofield.perfectForTitle}
            </h3>
            <p className="text-lg">{dict.services.biofield.perfectFor}</p>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Gyrotonic Movement Packages */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
            {dict.services.movement.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dict.services.movement.packages.map((pkg: { name: string; price: string; duration: string; features: string[]; savings: string | null }, index: number) => (
              <div
                key={index}
                className="bg-cream p-8 rounded-lg border border-stone-200 hover:border-gold-muted transition-colors"
              >
                <h3 className="text-xl font-serif mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-serif text-gold">{pkg.price}</span>
                  <span className="text-charcoal-secondary">{pkg.duration}</span>
                </div>
                <ul className="space-y-2 text-lg">
                  {pkg.features.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {pkg.savings && (
                  <p className="text-gold font-medium mt-4">{pkg.savings}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-serif mb-4">
              {dict.services.movement.perfectForTitle}
            </h3>
            <p className="text-lg">{dict.services.movement.perfectFor}</p>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="cream" flip />

      {/* Breathwork */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              {dict.services.breathwork.title}
            </h2>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-serif text-gold">
                {dict.services.breathwork.price}
              </span>
              <span className="text-lg text-charcoal-secondary">
                {dict.services.breathwork.duration}
              </span>
              <span className="text-sm bg-gold-muted px-3 py-1 rounded-full">
                {dict.services.breathwork.badge}
              </span>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-serif mb-3">
                  {dict.services.breathwork.techniquesTitle}
                </h3>
                <ul className="space-y-2 pl-6">
                  {dict.services.breathwork.techniques.map((technique: string, index: number) => (
                    <li key={index} className="text-lg flex items-start">
                      <span className="text-gold mr-3">•</span>
                      <span>{technique}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3">
                  {dict.services.breathwork.benefitsTitle}
                </h3>
                <p className="text-lg">{dict.services.breathwork.benefits}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-3">
                  {dict.services.breathwork.whyTitle}
                </h3>
                <p className="text-lg">{dict.services.breathwork.why}</p>
              </div>
            </div>

            <Button variant="gold" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.services.breathwork.cta}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Frequency Massage */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              {dict.services.massage.title}
            </h2>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-serif text-gold">
                {dict.services.massage.price}
              </span>
              <span className="text-lg text-charcoal-secondary">
                {dict.services.massage.duration}
              </span>
            </div>

            <p className="text-lg mb-8">{dict.services.massage.description}</p>

            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-serif">
                {dict.services.massage.includesTitle}
              </h3>
              <ul className="space-y-2 pl-6">
                {dict.services.massage.includes.map((item: string, index: number) => (
                  <li key={index} className="text-lg flex items-start">
                    <span className="text-gold mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="medium" color="cream" flip />

      {/* What to Expect */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
              {dict.services.expect.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                  <span className="text-gold text-2xl">📍</span>
                  {dict.services.expect.locationTitle}
                </h3>
                <p className="text-lg">{dict.services.expect.location}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                  <span className="text-gold text-2xl">📅</span>
                  {dict.services.expect.bookingTitle}
                </h3>
                <p className="text-lg">{dict.services.expect.booking}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                  <span className="text-gold text-2xl">💳</span>
                  {dict.services.expect.paymentTitle}
                </h3>
                <p className="text-lg">{dict.services.expect.payment}</p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-4 flex items-center gap-3">
                  <span className="text-gold text-2xl">🌐</span>
                  {dict.services.expect.remoteTitle}
                </h3>
                <p className="text-lg">{dict.services.expect.remote}</p>
              </div>
            </div>

            <div className="bg-gold-muted p-8 rounded-lg">
              <h3 className="text-xl font-serif mb-4">
                {dict.services.expect.gettingStartedTitle}
              </h3>
              <p className="text-lg mb-6">{dict.services.expect.gettingStarted}</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Final CTA */}
      <section className="py-24 bg-silk">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            {dict.services.finalCta.title}
          </h2>
          <p className="text-xl mb-12 text-charcoal-secondary">
            {dict.services.finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.services.finalCta.primaryCta}
              </a>
            </Button>
            <Button variant="gold-outline" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.services.finalCta.secondaryCta}
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
