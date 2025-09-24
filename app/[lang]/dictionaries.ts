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
  services: {
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
  };
  about: {
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
  learn: {
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