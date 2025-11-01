import { type Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { NavigationHeader } from '@/components/sections/NavigationHeader';
import { Footer } from '@/components/sections/Footer';
import { WaveDivider } from '@/components/ui/wave-divider';
import { Button } from '@/components/ui/button';

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

// SEO Metadata
export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const isGerman = lang === 'de';

  return {
    title: isGerman
      ? 'Über Kristen | The Fountain Studio'
      : 'About Kristen | The Fountain Studio',
    description: isGerman
      ? 'Treffen Sie Kristen Slabaugh, Ihre Bio-Elektrikerin. Zertifizierte Biofield Tuning Praktikerin, Gyrotonic® Trainerin und Atemarbeit-Facilitatorin in Au bei Zürich.'
      : 'Meet Kristen Slabaugh, your bio-electrician. Certified Biofield Tuning Practitioner, Gyrotonic® Instructor, and Breathwork Facilitator in Au near Zurich.',
    openGraph: {
      title: isGerman
        ? 'Über Kristen | The Fountain Studio'
        : 'About Kristen | The Fountain Studio',
      description: isGerman
        ? 'Ihre Reise nach Hause zu sich selbst durch sanfte, traumabewusste Praktiken.'
        : 'Your journey home to yourself through gentle, trauma-aware practices.',
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <NavigationHeader dict={dict} lang={lang} />
      <main className="min-h-screen bg-silk">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              {dict.about.hero.title}
            </h1>
            <p className="text-xl text-charcoal-secondary mb-8">
              {dict.about.hero.subtitle}
            </p>
            <p className="text-lg">
              {dict.about.hero.intro}
            </p>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* You Are Your Own Healer */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {dict.about.healer.title}
            </h2>
            <div className="space-y-6 text-lg">
              <p>{dict.about.healer.content}</p>
              <p className="text-2xl font-serif text-gold text-center italic py-6">
                {dict.about.healer.quote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="cream" flip />

      {/* Mission & Journey */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8 text-center">
              {dict.about.mission.title}
            </h2>
            <p className="text-2xl font-serif text-gold text-center mb-12">
              {dict.about.mission.statement}
            </p>
            <p className="text-lg mb-8">
              {dict.about.mission.description}
            </p>

            <h3 className="text-2xl font-serif mb-6 text-gold">
              {dict.about.journey.title}
            </h3>
            <p className="text-lg">
              {dict.about.journey.content}
            </p>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Approach: Bio-Electrician */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {dict.about.approach.title}
            </h2>
            <p className="text-lg mb-8">
              {dict.about.approach.intro}
            </p>

            <div className="space-y-6">
              {dict.about.approach.points.map((point: { title: string; description: string }, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="text-gold mr-3 text-2xl">•</span>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                    <p className="text-charcoal-secondary">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg mt-8 italic text-charcoal-secondary">
              {dict.about.approach.emphasis}
            </p>
          </div>
        </div>
      </section>

      <WaveDivider variant="medium" color="cream" flip />

      {/* Credentials */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
              {dict.about.credentials.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {dict.about.credentials.items.map((credential: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  className="bg-silk p-6 rounded-lg border border-stone-200"
                >
                  <h3 className="text-xl font-serif mb-3 text-gold">
                    {credential.title}
                  </h3>
                  <p className="text-charcoal-secondary">
                    {credential.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="silk" />

      {/* Studio Space */}
      <section className="py-24 bg-silk">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">
              {dict.about.studio.title}
            </h2>
            <p className="text-lg mb-8">
              {dict.about.studio.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif mb-4 text-gold">
                  {dict.about.studio.locationTitle}
                </h3>
                <p className="text-charcoal-secondary mb-2">
                  {dict.about.studio.address}
                </p>
                <p className="text-charcoal-secondary">
                  {dict.about.studio.access}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-serif mb-4 text-gold">
                  {dict.about.studio.environmentTitle}
                </h3>
                <p className="text-charcoal-secondary mb-4">
                  {dict.about.studio.environment}
                </p>
                <p className="text-charcoal-secondary">
                  {dict.about.studio.options}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="subtle" color="cream" flip />

      {/* How I Work With You */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
              {dict.about.workWith.title}
            </h2>

            <div className="space-y-8">
              {dict.about.workWith.principles.map((principle: { title: string; description: string; quote?: string }, index: number) => (
                <div key={index}>
                  <h3 className="text-xl font-serif mb-3 text-gold">
                    {principle.title}
                  </h3>
                  <p className="text-lg text-charcoal-secondary">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xl font-serif text-center italic mt-12 text-charcoal-secondary">
              {dict.about.workWith.quote}
            </p>
          </div>
        </div>
      </section>

      <WaveDivider variant="medium" color="silk" />

      {/* Final CTA */}
      <section className="py-24 bg-silk">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            {dict.about.finalCta.title}
          </h2>
          <p className="text-xl mb-12 text-charcoal-secondary">
            {dict.about.finalCta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <a
                data-cal-namespace="15min"
                data-cal-link="simon-yang-z2fy7e/15min"
                data-cal-config='{"layout":"month_view"}'
              >
                {dict.about.finalCta.primaryCta}
              </a>
            </Button>
            <Button variant="gold-outline" size="lg" asChild>
              <a href={`/${lang}/services`}>
                {dict.about.finalCta.secondaryCta}
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
