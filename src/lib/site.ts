export const SITE = {
  name: 'Silver Health Daily',
  tagline: 'Trusted health tips & tools for adults 50+',
  url: 'https://silverhealthdaily.com',
  description:
    'Daily health guides, nutrition tips, and free wellness tools designed for adults 50 and older. Evidence-informed advice you can read in minutes.',
  email: 'hello@silverhealthdaily.com',
  locale: 'en_US',
} as const;

export const CATEGORIES = [
  {
    slug: 'nutrition',
    name: 'Nutrition',
    description: 'Heart-smart eating, hydration, and supplements for adults 50+.',
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    description: 'Low-impact movement, walking plans, and strength for healthy aging.',
  },
  {
    slug: 'sleep',
    name: 'Sleep',
    description: 'Better rest, bedtime routines, and sleep hygiene after 50.',
  },
  {
    slug: 'heart-health',
    name: 'Heart Health',
    description: 'Blood pressure, cholesterol, and cardiovascular wellness.',
  },
  {
    slug: 'brain-memory',
    name: 'Brain & Memory',
    description: 'Cognitive health, memory habits, and mental sharpness.',
  },
  {
    slug: 'wellness',
    name: 'Wellness',
    description: 'Everyday habits, stress, and holistic health for seniors.',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '';

export const NAV_LINKS = [
  { href: '/articles', label: 'Articles' },
  { href: '/tools', label: 'Free Tools' },
  { href: '/about', label: 'About' },
] as const;
