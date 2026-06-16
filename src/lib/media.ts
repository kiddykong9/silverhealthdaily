import type { CategorySlug } from './site';

/** Curated Unsplash images — inclusive, topic-accurate wellness scenes. All IDs HTTP-verified. */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&fm=webp`;

export type ImageAsset = { src: string; alt: string };

const PHOTOS = {
  trailRun: 'photo-1476480862126-209bfaa8edc8',
  homeCooking: 'photo-1556911220-bff31c812dba',
  yogaFlow: 'photo-1544367567-0f2fcb009e0b',
  mindfulMoment: 'photo-1507003211169-0a1dd7228f2d',
  doctorVisit: 'photo-1576091160399-112ba8d25d1d',
  calmBedroom: 'photo-1522771739844-6a9f6d5f14af',
  waterGlass: 'photo-1767785820883-8bfb03040fb0',
  waterPour: 'photo-1587800387687-60c1e4d08c9d',
  healthySpread: 'photo-1490645935967-10de6ba17061',
  freshProduce: 'photo-1512621776951-a57141f2eefd',
  groupFitness: 'photo-1518611012118-696072aa579a',
  gymWorkout: 'photo-1534438327276-14e5300c3a48',
  breakfastKitchen: 'photo-1484154218962-a197022b5858',
  outdoorWalk: 'photo-1517836357463-d25dfeac3438',
  groupExercise: 'photo-1658314755811-73c806249f31',
} as const;

export const HERO: ImageAsset = {
  src: u(PHOTOS.trailRun, 1800),
  alt: 'Person running on a scenic mountain trail at sunrise',
};

export const CATEGORY_IMAGES: Record<CategorySlug, ImageAsset> = {
  nutrition: {
    src: u(PHOTOS.homeCooking),
    alt: 'Fresh ingredients being prepared in a bright home kitchen',
  },
  fitness: {
    src: u(PHOTOS.groupFitness),
    alt: 'Group fitness class with people exercising together',
  },
  sleep: {
    src: u(PHOTOS.calmBedroom),
    alt: 'Calm bedroom with soft neutral linens for restful sleep',
  },
  'heart-health': {
    src: u(PHOTOS.doctorVisit),
    alt: 'Clinician taking blood pressure during a wellness check',
  },
  'brain-memory': {
    src: u(PHOTOS.mindfulMoment),
    alt: 'Person relaxing at home with a book and warm drink',
  },
  wellness: {
    src: u(PHOTOS.yogaFlow),
    alt: 'Person practicing yoga on a mat in natural light',
  },
};

export const ARTICLE_IMAGES: Record<string, ImageAsset> = {
  'best-walking-routines-for-adults-over-50': {
    src: u(PHOTOS.trailRun),
    alt: 'Walking and running on an outdoor trail',
  },
  'best-exercises-for-seniors-at-home': {
    src: u(PHOTOS.gymWorkout),
    alt: 'Strength training workout in a gym',
  },
  'balance-exercises-prevent-falls-seniors': {
    src: u(PHOTOS.yogaFlow),
    alt: 'Balance and flexibility practice on a yoga mat',
  },
  'daily-stretching-routine-for-seniors': {
    src: u(PHOTOS.yogaFlow),
    alt: 'Gentle stretching and mobility work',
  },
  'low-impact-exercises-joint-pain': {
    src: u(PHOTOS.groupExercise),
    alt: 'Low-impact group exercise session',
  },
  'osteoporosis-exercises-bone-health': {
    src: u(PHOTOS.outdoorWalk),
    alt: 'Weight-bearing exercise in a fitness setting',
  },
  'heart-healthy-foods-after-50': {
    src: u(PHOTOS.healthySpread),
    alt: 'Colorful heart-healthy whole foods on a table',
  },
  'cholesterol-lowering-foods-seniors': {
    src: u(PHOTOS.freshProduce),
    alt: 'Fresh vegetables and wholesome ingredients',
  },
  'healthy-breakfast-ideas-for-seniors': {
    src: u(PHOTOS.breakfastKitchen),
    alt: 'Bright kitchen with wholesome breakfast ingredients',
  },
  'staying-hydrated-as-you-age': {
    src: u(PHOTOS.waterPour),
    alt: 'Water being poured into a clear glass',
  },
  'signs-of-dehydration-older-adults': {
    src: u(PHOTOS.waterGlass),
    alt: 'Close-up of a glass of water for daily hydration',
  },
  'how-much-sleep-adults-over-50-need': {
    src: u(PHOTOS.calmBedroom),
    alt: 'Peaceful bedroom environment for quality sleep',
  },
  'how-much-protein-do-you-need-daily': {
    src: u(PHOTOS.healthySpread),
    alt: 'Protein-rich whole foods on a table',
  },
  'best-bedtime-for-your-wake-up-time': {
    src: u(PHOTOS.calmBedroom),
    alt: 'Calm bedroom setup for restful sleep',
  },
  'target-heart-rate-when-walking': {
    src: u(PHOTOS.outdoorWalk),
    alt: 'Person walking outdoors for cardiovascular exercise',
  },
  'understanding-blood-pressure-after-50': {
    src: u(PHOTOS.doctorVisit),
    alt: 'Blood pressure monitoring at a health visit',
  },
  'lower-blood-pressure-naturally-after-50': {
    src: u(PHOTOS.trailRun),
    alt: 'Outdoor cardio exercise for cardiovascular health',
  },
  'memory-exercises-older-adults': {
    src: u(PHOTOS.mindfulMoment),
    alt: 'Reading and mental focus at home',
  },
  'gut-health-probiotics-over-60': {
    src: u(PHOTOS.freshProduce),
    alt: 'Fiber-rich vegetables that support digestive health',
  },
  'managing-diabetes-after-50': {
    src: u(PHOTOS.healthySpread),
    alt: 'Balanced whole-food meals for blood sugar control',
  },
  'vitamin-d-and-senior-health': {
    src: u(PHOTOS.trailRun),
    alt: 'Time outdoors for vitamin D and overall wellbeing',
  },
};

export const LIFESTYLE_GALLERY = [
  { ...CATEGORY_IMAGES.fitness, caption: 'Move daily' },
  { ...CATEGORY_IMAGES.nutrition, caption: 'Eat well' },
  { ...CATEGORY_IMAGES['brain-memory'], caption: 'Stay sharp' },
  { ...CATEGORY_IMAGES.wellness, caption: 'Live fully' },
] as const;

export const TOOL_IMAGES = {
  bmi: CATEGORY_IMAGES['heart-health'],
  water: { src: u(PHOTOS.waterGlass), alt: 'Close-up of a glass of water for healthy hydration' },
  walking: CATEGORY_IMAGES.fitness,
  protein: { src: u(PHOTOS.healthySpread), alt: 'Protein-rich whole foods on a table' },
  bedtime: CATEGORY_IMAGES.sleep,
  habits: CATEGORY_IMAGES.wellness,
  walkingPlan: { src: u(PHOTOS.outdoorWalk), alt: 'Person walking outdoors on a sunny path' },
  heartRate: CATEGORY_IMAGES['heart-health'],
  steps: { src: u(PHOTOS.trailRun), alt: 'Active person on a walking trail' },
} as const;

export const PAGE_HEROES = {
  articles: HERO,
  tools: CATEGORY_IMAGES.fitness,
  about: CATEGORY_IMAGES.wellness,
} as const;

export const WELLNESS_VIDEOS = [
  {
    title: '15-Minute Full-Body Workout',
    description: 'NIH-guided warm-up, strength, balance, and cool-down you can follow at home.',
    youtubeId: 'Ev6yE55kYGw',
    channel: 'National Institute on Aging',
    duration: '15:29',
  },
  {
    title: 'Gentle Stretching & Flexibility',
    description: 'At-home stretches — hold to slight tension, never pain.',
    youtubeId: 'kCQ6irSQwYA',
    channel: 'National Institute on Aging',
    duration: '11:14',
  },
  {
    title: 'Lower Body Strength (Chair)',
    description: 'Build leg strength for walking and balance with a sturdy chair.',
    youtubeId: 'TOKxtgKrGCQ',
    channel: 'National Institute on Aging',
    duration: '10:08',
  },
] as const;

export function getCategoryImage(slug: CategorySlug): ImageAsset {
  return CATEGORY_IMAGES[slug];
}

export function getArticleImage(slug: CategorySlug, articleId: string): ImageAsset {
  return ARTICLE_IMAGES[articleId] ?? CATEGORY_IMAGES[slug];
}

export function heroSrc(asset: ImageAsset, width = 1400): string {
  return asset.src.replace(/w=\d+/, `w=${width}`);
}

export const ALL_PHOTO_IDS = Object.values(PHOTOS);
