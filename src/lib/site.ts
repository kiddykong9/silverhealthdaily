export const SITE = {
  name: 'Silver Health Daily',
  tagline: 'Live well at every age',
  url: 'https://www.silverhealthdaily.com',
  logo: 'https://www.silverhealthdaily.com/logo.png',
  defaultOgImage:
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85&fm=webp',
  description:
    'Warm, practical health guides and free tools for everyday wellness. Nutrition, movement, sleep, and heart health — written to be read in minutes, not medical textbooks.',
  email: 'hello@silverhealthdaily.com',
  locale: 'en_US',
} as const;

export const CATEGORIES = [
  {
    slug: 'nutrition',
    name: 'Nutrition',
    description: 'Heart-smart eating, hydration, and everyday meals that nourish.',
    icon: '🥗',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    tint: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  },
  {
    slug: 'fitness',
    name: 'Fitness',
    description: 'Gentle movement, walking plans, and strength for active years.',
    icon: '🚶',
    gradient: 'from-sky-600 via-blue-600 to-indigo-700',
    tint: 'bg-sky-50 text-sky-900 ring-sky-200',
  },
  {
    slug: 'sleep',
    name: 'Sleep',
    description: 'Restful nights, calming routines, and better sleep hygiene.',
    icon: '🌙',
    gradient: 'from-indigo-600 via-violet-600 to-purple-700',
    tint: 'bg-indigo-50 text-indigo-900 ring-indigo-200',
  },
  {
    slug: 'heart-health',
    name: 'Heart Health',
    description: 'Blood pressure, cholesterol, and cardiovascular wellness.',
    icon: '❤️',
    gradient: 'from-rose-600 via-red-600 to-rose-800',
    tint: 'bg-rose-50 text-rose-900 ring-rose-200',
  },
  {
    slug: 'brain-memory',
    name: 'Brain & Memory',
    description: 'Stay sharp with habits that support cognitive health.',
    icon: '🧠',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-700',
    tint: 'bg-violet-50 text-violet-900 ring-violet-200',
  },
  {
    slug: 'wellness',
    name: 'Wellness',
    description: 'Everyday habits, balance, and holistic health for the whole family.',
    icon: '✨',
    gradient: 'from-amber-500 via-orange-500 to-amber-700',
    tint: 'bg-amber-50 text-amber-900 ring-amber-200',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID ?? '';

export const NAV_LINKS = [
  { href: '/start', label: 'Get Started' },
  { href: '/articles', label: 'Articles' },
  { href: '/tools', label: 'Tools' },
  { href: '/about', label: 'About' },
] as const;

export const PRODUCT_NAV = {
  href: '/#program',
  label: '7-Day Program',
} as const;

export const TRUST_POINTS = [
  'Easy-to-read guides',
  'Evidence-informed guides',
  'Free health calculators',
  'Updated regularly',
] as const;
