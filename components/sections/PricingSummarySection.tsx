import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface PricingSummarySectionProps {
  dict: Dictionary['services']['pricingSummary'];
  lang: string;
}

export function PricingSummarySection({ dict, lang }: PricingSummarySectionProps) {
  return (
    <section
      id="pricing"
      className="w-full bg-silk py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-charcoal tracking-tight">
            {dict.title}
          </h2>
          <div className="w-24 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto font-light leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Service Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dict.categories.map((category) => (
            <Link
              key={category.name}
              href={`/${lang}/services${category.anchor}`}
              scroll={false}
              className="group relative bg-background-white rounded-sm overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              {/* Gold accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="p-8 space-y-6">
                {/* Category Name */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-light text-charcoal tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed min-h-[4.5rem]">
                    {category.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-sm text-gold group-hover:gap-3 transition-all duration-300">
                  <span className="font-light tracking-wide">Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-charcoal/50 font-light">
            All sessions include complimentary consultation and personalized wellness plan
          </p>
        </div>
      </div>
    </section>
  );
}
