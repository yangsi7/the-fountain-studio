import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // Fallback to 'de' if locale is not supported
  const lang = locale === 'en' ? 'en' : 'de';
  return dictionaries[lang]();
};

// Type for the dictionary - matches the structure of our JSON files
export type Dictionary = {
  nav: {
    services: string;
    about: string;
    learn: string;
    testimonials: string;
    faq: string;
    contact: string;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: {
      book: string;
      learn: string;
    };
    scroll: string;
  };
  servicesSummary: {
    title: string;
    subtitle: string;
    biofield: {
      title: string;
      description: string;
      benefits: string;
      duration: string;
      price: string;
      cta: string;
    };
    gyrotonic: {
      title: string;
      description: string;
      benefits: string;
      duration: string;
      price: string;
      cta: string;
    };
    breathwork: {
      title: string;
      description: string;
      benefits: string;
      duration: string;
      price: string;
      cta: string;
    };
    integration: {
      title: string;
      description: string;
      benefits: string;
      duration: string;
      price: string;
      cta: string;
    };
    viewAllCta: string;
  };
  services: {
    title: string;
    subtitle: string;
    hero: {
      title: string;
      subtitle: string;
    };
    pricingSummary: {
      title: string;
      subtitle: string;
      categories: Array<{
        name: string;
        description: string;
        anchor: string;
      }>;
    };
    integration: {
      title: string;
      price: string;
      duration: string;
      componentsTitle: string;
      components: string[];
      benefits: string;
      cta: string;
    };
    biofield: {
      title: string;
      packages: Array<{
        name: string;
        price: string;
        duration: string;
        description: string;
        savings: string | null;
      }>;
      perfectForTitle: string;
      perfectFor: string;
    };
    movement: {
      title: string;
      packages: Array<{
        name: string;
        price: string;
        duration: string;
        features: string[];
        savings: string | null;
      }>;
      perfectForTitle: string;
      perfectFor: string;
    };
    breathwork: {
      title: string;
      price: string;
      duration: string;
      badge: string;
      techniquesTitle: string;
      techniques: string[];
      benefitsTitle: string;
      benefits: string;
      whyTitle: string;
      why: string;
      cta: string;
    };
    massage: {
      title: string;
      price: string;
      duration: string;
      description: string;
      includesTitle: string;
      includes: string[];
    };
    expect: {
      title: string;
      locationTitle: string;
      location: string;
      bookingTitle: string;
      booking: string;
      paymentTitle: string;
      payment: string;
      remoteTitle: string;
      remote: string;
      gettingStartedTitle: string;
      gettingStarted: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  learnSummary: {
    title: string;
    subtitle: string;
    biofield: {
      title: string;
      content: string;
    };
    gyrotonic: {
      title: string;
      content: string;
    };
    breathwork: {
      title: string;
      content: string;
    };
    exploreAllCta: string;
  };
  aboutSummary: {
    title: string;
    subtitle: string;
    intro: string;
    description: string;
    quote: string;
    mission: string;
    credentials: {
      title: string;
      items: string[];
    };
    cta: string;
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
      intro: string;
    };
    healer: {
      title: string;
      content: string;
      quote: string;
    };
    mission: {
      title: string;
      statement: string;
      description: string;
    };
    journey: {
      title: string;
      content: string;
    };
    approach: {
      title: string;
      intro: string;
      points: Array<{
        title: string;
        description: string;
      }>;
      emphasis: string;
    };
    credentials: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    studio: {
      title: string;
      description: string;
      locationTitle: string;
      address: string;
      access: string;
      environmentTitle: string;
      environment: string;
      options: string;
    };
    workWith: {
      title: string;
      principles: Array<{
        title: string;
        description: string;
      }>;
      quote: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  learn: {
    title: string;
    subtitle: string;
    hero: {
      title: string;
      subtitle: string;
      intro: string;
      quote: string;
      modalities: string[];
    };
    biofield: {
      title: string;
      whatItIsTitle: string;
      whatItIs: string;
      howItWorksTitle: string;
      howItWorks: string;
      benefitsTitle: string;
      benefits: string;
    };
    gyrotonic: {
      title: string;
      whatItIsTitle: string;
      whatItIs: string;
      howItWorksTitle: string;
      howItWorks: string;
      benefitsTitle: string;
      benefits: string;
    };
    breathwork: {
      title: string;
      whatItIsTitle: string;
      whatItIs: string;
      howItWorksTitle: string;
      howItWorks: string[];
      benefitsTitle: string;
      benefits: string;
    };
    comparison: {
      title: string;
      focusLabel: string;
      roleLabel: string;
      effectLabel: string;
      chooseLabel: string;
      modalities: Array<{
        name: string;
        focus: string;
        role: string;
        effect: string;
        choose: string;
      }>;
      note: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      text: string;
      rating: number;
    }>;
  };
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
    info: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    alternatives: {
      whatsapp: string;
      calendar: string;
    };
    booking: {
      title: string;
      description: string;
      loading: string;
    };
  };
  booking: {
    title: string;
    subtitle: string;
    benefits: {
      time: string;
      confirmation: string;
      secure: string;
    };
    cta: string;
    details: {
      duration: string;
      location: string;
      cancellation: string;
    };
    modal: {
      title: string;
      description: string;
    };
  };
  footer: {
    tagline: string;
    links: {
      services: string;
      about: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
};