// Dictionary type definition matching our JSON structure
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
    biofield: ServiceItem;
    gyrotonic: ServiceItem;
    breathwork: ServiceItem;
    integration: ServiceItem;
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
    biofield: ModalityItem;
    gyrotonic: ModalityItem;
    breathwork: ModalityItem;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    title: string;
    items: FAQItem[];
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

type ServiceItem = {
  title: string;
  description: string;
  benefits: string;
  duration: string;
  price: string;
  cta: string;
};

type ModalityItem = {
  title: string;
  content: string;
};

type TestimonialItem = {
  name: string;
  text: string;
  rating: number;
};

type FAQItem = {
  question: string;
  answer: string;
};

// Dictionary loader function
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  de: () => import('../dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Default to English if locale not found
  const loader = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
  return loader() as Promise<Dictionary>;
};