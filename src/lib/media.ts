import type { CategorySlug } from './site';

/** Unsplash (free to use) — optimized widths for performance */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO = {
  poster: u('photo-1571019614242-c5c5dee996f8', 1400),
  alt: 'Active woman stretching outdoors in morning light',
  video: 'https://videos.pexels.com/video-files/4760264/4760264-hd_1920_1080_30fps.mp4',
} as const;

export const CATEGORY_IMAGES: Record<
  CategorySlug,
  { src: string; alt: string }
> = {
  nutrition: {
    src: u('photo-1490645935967-10de6ba17061', 600),
    alt: 'Colorful healthy breakfast bowl with fresh fruit',
  },
  fitness: {
    src: u('photo-1571019614242-c5c5dee996f8', 600),
    alt: 'Senior woman exercising outdoors',
  },
  sleep: {
    src: u('photo-1541781777448-57f9a815926a', 600),
    alt: 'Peaceful bedroom ready for restful sleep',
  },
  'heart-health': {
    src: u('photo-1476480862126-209bf4358eba', 600),
    alt: 'Person walking on a scenic trail for heart health',
  },
  'brain-memory': {
    src: u('photo-1456513080510-7bf3a84b82f8', 600),
    alt: 'Open book and reading glasses on a wooden table',
  },
  wellness: {
    src: u('photo-1506126613408-eca07ce68773', 600),
    alt: 'Person doing yoga meditation at sunrise',
  },
};

export const LIFESTYLE_GALLERY = [
  {
    src: u('photo-1581578731548-c64695cc6952', 500),
    alt: 'Smiling senior couple enjoying time together outdoors',
    caption: 'Stay connected',
  },
  {
    src: u('photo-1512621776951-a57141f2eefd', 500),
    alt: 'Fresh salad with vegetables on a kitchen table',
    caption: 'Eat well',
  },
  {
    src: u('photo-1518611012118-696072aa579a', 500),
    alt: 'Group fitness class with people stretching together',
    caption: 'Move daily',
  },
  {
    src: u('photo-1506126613408-eca07ce68773', 500),
    alt: 'Calm yoga session at dawn',
    caption: 'Find balance',
  },
] as const;

export const WELLNESS_VIDEOS = [
  {
    title: 'Morning walk in nature',
    description: 'Low-impact movement that supports heart health and mood.',
    poster: u('photo-1476480862126-209bf4358eba', 800),
    src: 'https://videos.pexels.com/video-files/4760264/4760264-hd_1920_1080_30fps.mp4',
    duration: '0:24',
  },
  {
    title: 'Preparing a heart-smart meal',
    description: 'Simple kitchen habits that make healthy eating easier every day.',
    poster: u('photo-1490645935967-10de6ba17061', 800),
    src: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_25fps.mp4',
    duration: '0:18',
  },
  {
    title: 'Gentle stretching routine',
    description: 'Ease stiffness and improve flexibility — perfect to start your day.',
    poster: u('photo-1571019614242-c5c5dee996f8', 800),
    src: 'https://videos.pexels.com/video-files/4057255/4057255-hd_1920_1080_25fps.mp4',
    duration: '0:30',
  },
] as const;

export function getCategoryImage(slug: CategorySlug) {
  return CATEGORY_IMAGES[slug];
}
