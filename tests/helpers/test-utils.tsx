import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Custom render function that includes providers
export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test data helpers
export const mockDictionary = {
  nav: {
    services: 'Services',
    about: 'About',
    learn: 'Learn',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    contact: 'Contact',
    language: 'EN',
  },
  hero: {
    title: 'Frequency is Everything',
    subtitle: 'A boutique healing studio...',
    cta: {
      book: 'Book Your Session',
      learn: 'Learn More',
    },
    scroll: 'Scroll to explore',
  },
  services: {
    title: 'My Tool Kit',
    subtitle: 'Choose how you want to clear static and find your flow',
    biofield: {
      title: 'Biofield Tuning',
      description: 'Works with your energy field using tuning forks',
      benefits: 'Nervous system regulation, emotional release',
      duration: '60 minutes',
      price: '120 CHF',
      cta: 'Learn More',
    },
    gyrotonic: {
      title: 'Gyrotonic® Movement',
      description: 'Flowing, three-dimensional movement',
      benefits: 'Improved posture, nervous system regulation',
      duration: '60 minutes',
      price: '120 CHF',
      cta: 'Learn More',
    },
    breathwork: {
      title: 'Breathwork',
      description: 'Structured breathing program',
      benefits: 'Stress relief, mental clarity',
      duration: '45 minutes',
      price: '90 CHF',
      cta: 'Learn More',
    },
    integration: {
      title: 'Complete Integration',
      description: '90-minute session combining movement and sound',
      benefits: 'Deep integration, full-system reset',
      duration: '90 minutes',
      price: '180 CHF',
      cta: 'Learn More',
    },
  },
  about: {
    title: 'About The Practitioner',
    subtitle: 'Your Guide to Wellness',
    description: 'Professional bio text...',
    credentials: {
      title: 'Certifications',
      items: ['Biofield Tuning', 'Gyrotonic', 'Breathwork'],
    },
    cta: 'Schedule Consultation',
  },
  learn: {
    title: 'Learn About Our Modalities',
    subtitle: 'Understanding the Science',
    biofield: {
      title: 'What is Biofield Tuning?',
      description: 'Biofield Tuning uses tuning forks...',
      benefits: {
        title: 'Benefits',
        items: ['Stress reduction', 'Emotional clarity', 'Better sleep'],
      },
    },
    gyrotonic: {
      title: 'The Gyrotonic Method',
      description: 'A unique movement system...',
      benefits: {
        title: 'Benefits',
        items: ['Flexibility', 'Strength', 'Coordination'],
      },
    },
    breathwork: {
      title: 'Conscious Breathing',
      description: 'Structured breathing techniques...',
      benefits: {
        title: 'Benefits',
        items: ['Relaxation', 'Energy', 'Mental clarity'],
      },
    },
  },
  testimonials: {
    title: 'Client Experiences',
    subtitle: 'What Our Clients Say',
    items: [
      {
        name: 'Sarah M.',
        text: 'Life-changing experience...',
        rating: 5,
        service: 'Biofield Tuning',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Get Your Answers',
    items: [
      {
        question: 'What is sound healing?',
        answer: 'Sound healing is a therapeutic practice...',
      },
    ],
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'Ready to Start Your Journey?',
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send Message',
      success: 'Message sent successfully!',
      error: 'Error sending message. Please try again.',
    },
    info: {
      title: 'Contact Information',
      address: 'Au, ZH, Switzerland',
      phone: '+41 XX XXX XX XX',
      email: 'info@thefountainstudio.ch',
      hours: 'Mon-Fri: 9am-6pm',
    },
  },
  footer: {
    copyright: '© 2025 The Fountain Studio',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
  booking: {
    modal: {
      title: 'Book Your Session',
      description: 'Select a time that works best for you',
    },
  },
};