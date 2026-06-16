import type { CategorySlug } from './site';

/** Curated Unsplash images — professional, age-neutral wellness photography. IDs HTTP-verified. */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&fm=webp`;

export type ImageAsset = { src: string; alt: string };

const img = (id: string, alt: string, w = 800): ImageAsset => ({ src: u(id, w), alt });

/** Unique photo pool — food, environments, and activity scenes without age-specific casting. */
const P = {
  yogaStudio: 'photo-1506126613408-eca07ce68773',
  trailRun: 'photo-1476480862126-209bfaa8edc8',
  outdoorPath: 'photo-1517836357463-d25dfeac3438',
  runningTrack: 'photo-1461896836934-ffe607ba8211',
  saladBowl: 'photo-1546069901-ba9599a7e63c',
  saladGreens: 'photo-1540189549336-e6e99c3679fe',
  veggiePrep: 'photo-1495521821757-a1efb6729352',
  handsCooking: 'photo-1551218808-94e220e084d2',
  supplements: 'photo-1607619056574-7b8d3ee536b2',
  wellnessSpa: 'photo-1515377905703-c4788e51af15',
  taiChi: 'photo-1545205597-3d9d02c29597',
  deskStudy: 'photo-1456513080510-7bf3a84b82f8',
  calmNature: 'photo-1502680390469-be75c86b636f',
  freshProduce: 'photo-1512621776951-a57141f2eefd',
  homeCooking: 'photo-1556911220-bff31c812dba',
  gymWorkout: 'photo-1534438327276-14e5300c3a48',
  healthySpread: 'photo-1490645935967-10de6ba17061',
  breakfastKitchen: 'photo-1484154218962-a197022b5858',
  waterGlass: 'photo-1767785820883-8bfb03040fb0',
  waterPour: 'photo-1587800387687-60c1e4d08c9d',
  yogaMat: 'photo-1544367567-0f2fcb009e0b',
  doctorVisit: 'photo-1576091160399-112ba8d25d1d',
  calmBedroom: 'photo-1522771739844-6a9f6d5f14af',
  groupFitness: 'photo-1518611012118-696072aa579a',
  groupExercise: 'photo-1658314755811-73c806249f31',
} as const;

export const HERO: ImageAsset = img(
  P.yogaStudio,
  'Bright, modern yoga studio with natural light',
  1800,
);

export const CATEGORY_IMAGES: Record<CategorySlug, ImageAsset> = {
  nutrition: img(P.saladBowl, 'Colorful whole-food salad bowl on a table'),
  fitness: img(P.outdoorPath, 'Outdoor walking path for daily movement'),
  sleep: img(P.calmBedroom, 'Calm bedroom with soft neutral linens'),
  'heart-health': img(P.doctorVisit, 'Blood pressure check during a clinical wellness visit'),
  'brain-memory': img(P.deskStudy, 'Organized desk with books and notes for focused learning'),
  wellness: img(P.yogaMat, 'Yoga practice on a mat in natural light'),
};

export const ARTICLE_IMAGES: Record<string, ImageAsset> = {
  'best-walking-routines-for-adults-over-50': img(
    P.outdoorPath,
    'Tree-lined path for a daily walking routine',
  ),
  'best-exercises-for-seniors-at-home': img(
    P.gymWorkout,
    'Strength training with dumbbells in a modern gym',
  ),
  'balance-exercises-prevent-falls-seniors': img(
    P.taiChi,
    'Slow, controlled balance movement outdoors',
  ),
  'daily-stretching-routine-for-seniors': img(
    P.groupFitness,
    'Guided stretching in a light-filled fitness studio',
  ),
  'low-impact-exercises-joint-pain': img(
    P.runningTrack,
    'Professional running track for low-impact cardio',
  ),
  'osteoporosis-exercises-bone-health': img(
    P.groupExercise,
    'Supervised group strength session in a fitness studio',
  ),
  'heart-healthy-foods-after-50': img(
    P.veggiePrep,
    'Fresh vegetables being prepared for heart-healthy meals',
  ),
  'cholesterol-lowering-foods-seniors': img(
    P.freshProduce,
    'Farmers-market vegetables and wholesome ingredients',
  ),
  'healthy-breakfast-ideas-for-seniors': img(
    P.breakfastKitchen,
    'Bright kitchen with wholesome breakfast ingredients',
  ),
  'staying-hydrated-as-you-age': img(P.waterPour, 'Water being poured into a clear glass'),
  'signs-of-dehydration-older-adults': img(
    P.waterGlass,
    'Close-up of a glass of water on a table',
  ),
  'how-much-sleep-adults-over-50-need': img(
    P.calmBedroom,
    'Peaceful bedroom setup for quality sleep',
  ),
  'how-much-protein-do-you-need-daily': img(
    P.handsCooking,
    'Hands preparing a protein-rich meal in the kitchen',
  ),
  'best-bedtime-for-your-wake-up-time': img(
    P.yogaStudio,
    'Soft morning light in a calm, restful room',
  ),
  'target-heart-rate-when-walking': img(
    P.trailRun,
    'Outdoor trail for cardiovascular walking and running',
  ),
  'how-to-track-calories-and-nutrition-free': img(
    P.homeCooking,
    'Home-cooked meal being prepared from fresh ingredients',
  ),
  'how-many-calories-do-you-need-daily': img(
    P.saladGreens,
    'Balanced plate of vegetables and whole foods',
  ),
  'how-to-calculate-macros-for-weight-loss': img(
    P.healthySpread,
    'Colorful spread of balanced macronutrient foods',
  ),
  'understanding-blood-pressure-after-50': img(
    P.doctorVisit,
    'Blood pressure cuff during a routine health check',
  ),
  'lower-blood-pressure-naturally-after-50': img(
    P.calmNature,
    'Calm natural setting for stress relief and recovery',
  ),
  'memory-exercises-older-adults': img(
    P.deskStudy,
    'Desk with books and notes for mental focus',
  ),
  'gut-health-probiotics-over-60': img(
    P.saladBowl,
    'Fiber-rich salad with vegetables and greens',
  ),
  'managing-diabetes-after-50': img(
    P.supplements,
    'Organized daily vitamins and health supplements',
  ),
  'vitamin-d-and-senior-health': img(
    P.trailRun,
    'Outdoor daylight exercise for overall wellbeing',
  ),
  'what-is-a-healthy-bmi': img(
    P.doctorVisit,
    'Clinical wellness check and body metrics',
  ),
  'how-to-estimate-body-fat-percentage': img(
    P.gymWorkout,
    'Strength training and body composition',
  ),
  'how-many-steps-per-day-for-health': img(
    P.outdoorPath,
    'Daily walking on an outdoor path',
  ),
  'safe-calorie-deficit-for-weight-loss': img(
    P.saladGreens,
    'Portion-controlled whole-food meal',
  ),
  'how-to-plan-daily-meals-for-your-calorie-goal': img(
    P.homeCooking,
    'Planned home-cooked meals in the kitchen',
  ),
  'how-many-calories-does-walking-burn': img(
    P.runningTrack,
    'Brisk walking and cardio on an outdoor track',
  ),
};

export const LIFESTYLE_GALLERY = [
  { ...img(P.trailRun, 'Outdoor trail for daily movement'), caption: 'Move daily' },
  { ...img(P.handsCooking, 'Cooking fresh food at home'), caption: 'Eat well' },
  { ...img(P.deskStudy, 'Focused reading and learning'), caption: 'Stay sharp' },
  { ...img(P.wellnessSpa, 'Restful self-care and recovery'), caption: 'Recover well' },
] as const;

export const TOOL_IMAGES = {
  bmi: img(P.doctorVisit, 'Clinical health screening'),
  water: img(P.waterGlass, 'Glass of water for daily hydration'),
  walking: img(P.outdoorPath, 'Outdoor walking for everyday fitness'),
  protein: img(P.handsCooking, 'Protein-rich ingredients in the kitchen'),
  foodCalories: img(P.breakfastKitchen, 'Meal ingredients for nutrition tracking'),
  bedtime: img(P.calmBedroom, 'Bedroom environment for better sleep'),
  habits: img(P.wellnessSpa, 'Daily wellness and self-care habits'),
  walkingPlan: img(P.trailRun, 'Structured outdoor walking routine'),
  heartRate: img(P.runningTrack, 'Cardio training on a professional track'),
  steps: img(P.outdoorPath, 'Daily steps and outdoor movement'),
  tdee: img(P.homeCooking, 'Home meal planning and calorie awareness'),
  macro: img(P.saladGreens, 'Balanced macros from whole foods'),
  deficit: img(P.groupFitness, 'Active lifestyle supporting gradual weight loss'),
  idealWeight: img(P.calmNature, 'Healthy weight and balanced living'),
  mealPlan: img(P.healthySpread, 'Daily meal planning with whole foods'),
  bodyFat: img(P.gymWorkout, 'Body composition and strength training'),
} as const;

export const PAGE_HEROES = {
  articles: img(P.deskStudy, 'Health guides for everyday wellness', 1400),
  tools: img(P.gymWorkout, 'Free health calculators and planners', 1400),
  about: img(P.yogaStudio, 'Wellness practices for a healthier life', 1400),
} as const;

/** Hero collage — distinct from main hero background. */
export const HERO_ACCENT = {
  feature: img(P.yogaMat, 'Movement and flexibility practice', 900),
  inset: img(P.veggiePrep, 'Fresh ingredients for nutritious meals', 400),
} as const;

export function getCategoryImage(slug: CategorySlug): ImageAsset {
  return CATEGORY_IMAGES[slug];
}

export function getArticleImage(slug: CategorySlug, articleId: string): ImageAsset {
  return ARTICLE_IMAGES[articleId] ?? CATEGORY_IMAGES[slug];
}

export function heroSrc(asset: ImageAsset, width = 1400): string {
  return asset.src.replace(/w=\d+/, `w=${width}`);
}

export const ALL_PHOTO_IDS = Object.values(P);
