import type { CategorySlug } from './site';

/** Unsplash — free license. All images show adults 50+ or topic-appropriate scenes. */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO = {
  src: u('photo-1766932024905-4bfe543413e4', 1600),
  alt: 'Elderly couple walking together on a park path',
} as const;

/** One primary + alternates per category so cards in the same section look varied */
export const CATEGORY_IMAGES: Record<
  CategorySlug,
  { src: string; alt: string; alternates?: string[] }
> = {
  nutrition: {
    src: u('photo-1588874960056-07aa3d0afa3b', 800),
    alt: 'Senior woman preparing a fresh vegetable salad in her kitchen',
    alternates: [u('photo-1512621776951-a57141f2eefd', 800)],
  },
  fitness: {
    src: u('photo-1766932024905-4bfe543413e4', 800),
    alt: 'Senior couple walking for exercise in a park',
    alternates: [u('photo-1609220130736-443d7ebd482f', 800)],
  },
  sleep: {
    src: u('photo-1522771739843-6a9f6d5f14af', 800),
    alt: 'Calm, inviting bedroom with soft linens — restful sleep environment',
    alternates: [u('photo-1541781777448-57f9a815926a', 800)],
  },
  'heart-health': {
    src: u('photo-1576091160399-112ba8d25d1d', 800),
    alt: 'Doctor checking blood pressure of an older patient during a wellness visit',
    alternates: [u('photo-1766932024905-4bfe543413e4', 800)],
  },
  'brain-memory': {
    src: u('photo-1758691030847-e0031f5028c7', 800),
    alt: 'Senior man reading a book on the couch at home',
    alternates: [u('photo-1456513080510-7bf3a84b82f8', 800)],
  },
  wellness: {
    src: u('photo-1581578731548-c64695cc6952', 800),
    alt: 'Smiling senior couple enjoying time together',
    alternates: [u('photo-1766932024905-4bfe543413e4', 800)],
  },
};

export const LIFESTYLE_GALLERY = [
  {
    src: u('photo-1766932024905-4bfe543413e4', 600),
    alt: 'Senior couple walking together outdoors',
    caption: 'Walk together',
  },
  {
    src: u('photo-1588874960056-07aa3d0afa3b', 600),
    alt: 'Senior woman preparing healthy vegetables in the kitchen',
    caption: 'Cook at home',
  },
  {
    src: u('photo-1609220130736-443d7ebd482f', 600),
    alt: 'Older adults staying active with gentle exercise',
    caption: 'Stay active',
  },
  {
    src: u('photo-1758691030847-e0031f5028c7', 600),
    alt: 'Senior man reading quietly at home',
    caption: 'Rest & recharge',
  },
] as const;

export const TOOL_IMAGES = {
  bmi: {
    src: u('photo-1576091160399-112ba8d25d1d', 600),
    alt: 'Senior having a health check with a clinician',
  },
  water: {
    src: u('photo-1548839140-5a941f994e83', 600),
    alt: 'Glass of fresh water — hydration for healthy aging',
  },
  walking: {
    src: u('photo-1766932024905-4bfe543413e4', 600),
    alt: 'Senior couple on a daily walk',
  },
} as const;

/** Official NIH/NIA videos — reliable YouTube embeds for adults 50+ */
export const WELLNESS_VIDEOS = [
  {
    title: '15-Minute Workout for Older Adults',
    description:
      'Guided warm-up, strength, balance, and cool-down from the National Institute on Aging.',
    youtubeId: 'Ev6yE55kYGw',
    channel: 'National Institute on Aging',
    duration: '15:29',
  },
  {
    title: 'Gentle Stretching & Flexibility',
    description: 'Flexibility exercises you can do at home — stretch to slight tension, not pain.',
    youtubeId: 'kCQ6irSQwYA',
    channel: 'National Institute on Aging',
    duration: '11:14',
  },
  {
    title: 'Lower Body Strength (Chair Exercises)',
    description: 'Build leg strength for walking and balance using a sturdy chair.',
    youtubeId: 'TOKxtgKrGCQ',
    channel: 'National Institute on Aging',
    duration: '10:08',
  },
] as const;

export function getCategoryImage(slug: CategorySlug, variant = 0) {
  const cat = CATEGORY_IMAGES[slug];
  if (variant === 0 || !cat.alternates?.length) {
    return { src: cat.src, alt: cat.alt };
  }
  const altIndex = (variant - 1) % cat.alternates.length;
  return { src: cat.alternates[altIndex], alt: cat.alt };
}

/** Slight visual variety when many articles share a category */
export function getArticleImage(slug: CategorySlug, articleId: string) {
  let hash = 0;
  for (let i = 0; i < articleId.length; i++) {
    hash = (hash + articleId.charCodeAt(i)) % 3;
  }
  return getCategoryImage(slug, hash);
}
