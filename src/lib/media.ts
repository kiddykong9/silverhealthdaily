import type { CategorySlug } from './site';
import { TOOL_IMAGES_MAP } from './tools';

/** Curated Unsplash images — professional, age-neutral wellness photography. IDs HTTP-verified. */
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85&fm=webp`;

export type ImageAsset = { src: string; alt: string };

const img = (id: string, alt: string, w = 800): ImageAsset => ({ src: u(id, w), alt });

/** Photo pool — each article uses a distinct ID. */
const P = {
  yogaStudio: 'photo-1506126613408-eca07ce68773',
  trailRun: 'photo-1476480862126-209bfaa8edc8',
  outdoorPath: 'photo-1517836357463-d25dfeac3438',
  runningTrack: 'photo-1461896836934-ffe607ba8211',
  roadRun: 'photo-1486218119243-13883505764c',
  saladBowl: 'photo-1546069901-ba9599a7e63c',
  saladGreens: 'photo-1540189549336-e6e99c3679fe',
  mealPlate: 'photo-1544005313-94ddf0286df2',
  veggiePrep: 'photo-1495521821757-a1efb6729352',
  handsCooking: 'photo-1551218808-94e220e084d2',
  cafeMeal: 'photo-1517248135467-4c7edcad34c4',
  supplements: 'photo-1607619056574-7b8d3ee536b2',
  wellnessSpa: 'photo-1515377905703-c4788e51af15',
  taiChi: 'photo-1545205597-3d9d02c29597',
  yogaClass: 'photo-1545389336-cf090694435e',
  deskStudy: 'photo-1456513080510-7bf3a84b82f8',
  calmNature: 'photo-1502680390469-be75c86b636f',
  freshProduce: 'photo-1512621776951-a57141f2eefd',
  homeCooking: 'photo-1556911220-bff31c812dba',
  gymWorkout: 'photo-1534438327276-14e5300c3a48',
  modernGym: 'photo-1516321497487-e288fb19713f',
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

/** One unique image per article — no repeats within this map. */
export const ARTICLE_IMAGES: Record<string, ImageAsset> = {
  'best-walking-routines-for-adults-over-50': img(
    P.outdoorPath,
    'Tree-lined outdoor path for a walking routine',
  ),
  'best-exercises-for-seniors-at-home': img(
    P.gymWorkout,
    'Dumbbell strength training in a modern gym',
  ),
  'balance-exercises-prevent-falls-seniors': img(
    P.taiChi,
    'Controlled balance and mobility practice outdoors',
  ),
  'daily-stretching-routine-for-seniors': img(
    P.groupFitness,
    'Guided stretching in a bright fitness studio',
  ),
  'low-impact-exercises-joint-pain': img(
    P.yogaMat,
    'Gentle yoga and mobility on a mat',
  ),
  'osteoporosis-exercises-bone-health': img(
    P.groupExercise,
    'Supervised strength training in a fitness class',
  ),
  'heart-healthy-foods-after-50': img(
    P.veggiePrep,
    'Fresh vegetables prepared for heart-healthy meals',
  ),
  'cholesterol-lowering-foods-seniors': img(
    P.freshProduce,
    'Colorful farmers-market vegetables',
  ),
  'healthy-breakfast-ideas-for-seniors': img(
    P.breakfastKitchen,
    'Wholesome breakfast ingredients in a bright kitchen',
  ),
  'staying-hydrated-as-you-age': img(P.waterPour, 'Water poured into a clear glass'),
  'signs-of-dehydration-older-adults': img(
    P.waterGlass,
    'Glass of water on a clean table',
  ),
  'how-much-sleep-adults-over-50-need': img(
    P.calmBedroom,
    'Peaceful bedroom for quality sleep',
  ),
  'how-much-protein-do-you-need-daily': img(
    P.handsCooking,
    'Protein-rich meal preparation in the kitchen',
  ),
  'best-bedtime-for-your-wake-up-time': img(
    P.yogaStudio,
    'Calm morning light in a restful space',
  ),
  'target-heart-rate-when-walking': img(
    P.trailRun,
    'Trail running for cardiovascular fitness',
  ),
  'how-to-track-calories-and-nutrition-free': img(
    P.homeCooking,
    'Home-cooked meal from fresh ingredients',
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
    'Blood pressure monitoring at a health visit',
  ),
  'lower-blood-pressure-naturally-after-50': img(
    P.calmNature,
    'Calm outdoor setting for stress relief',
  ),
  'memory-exercises-older-adults': img(
    P.deskStudy,
    'Books and notes for focused mental work',
  ),
  'gut-health-probiotics-over-60': img(
    P.saladBowl,
    'Fiber-rich salad with fresh greens',
  ),
  'managing-diabetes-after-50': img(
    P.supplements,
    'Organized daily vitamins and supplements',
  ),
  'vitamin-d-and-senior-health': img(
    P.roadRun,
    'Outdoor exercise in natural daylight',
  ),
  'what-is-a-healthy-bmi': img(
    P.modernGym,
    'Modern fitness facility for health and strength',
  ),
  'how-to-estimate-body-fat-percentage': img(
    P.yogaClass,
    'Athletic training and body composition work',
  ),
  'how-many-steps-per-day-for-health': img(
    P.runningTrack,
    'Running track for daily step and cardio goals',
  ),
  'safe-calorie-deficit-for-weight-loss': img(
    P.mealPlate,
    'Portion-controlled balanced meal on a plate',
  ),
  'how-to-plan-daily-meals-for-your-calorie-goal': img(
    P.cafeMeal,
    'Balanced café-style meal for daily planning',
  ),
  'how-many-calories-does-walking-burn': img(
    P.wellnessSpa,
    'Active recovery and wellness after exercise',
  ),
  'normal-blood-pressure-by-age': img(
    P.doctorVisit,
    'Blood pressure check during a routine health visit',
  ),
  'how-to-lose-weight-after-50': img(
    P.trailRun,
    'Outdoor fitness for sustainable weight management',
  ),
  'walking-for-weight-loss-how-much': img(
    P.outdoorPath,
    'Daily walking path for weight loss goals',
  ),
  'how-many-calories-to-eat-to-lose-weight': img(
    P.healthySpread,
    'Portion-aware meals for calorie-controlled eating',
  ),
  'foods-that-lower-blood-pressure-naturally': img(
    P.freshProduce,
    'Fresh produce for a heart-healthy DASH-style diet',
  ),
};

export const LIFESTYLE_GALLERY = [
  { ...img(P.roadRun, 'Outdoor running for daily fitness'), caption: 'Move daily' },
  { ...img(P.mealPlate, 'Balanced nutrition on your plate'), caption: 'Eat well' },
  { ...img(P.modernGym, 'Strength and conditioning'), caption: 'Stay strong' },
  { ...img(P.wellnessSpa, 'Recovery and self-care'), caption: 'Recover well' },
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
  steps: img(P.roadRun, 'Daily steps and outdoor movement'),
  tdee: img(P.homeCooking, 'Home meal planning and calorie awareness'),
  macro: img(P.saladGreens, 'Balanced macros from whole foods'),
  deficit: img(P.mealPlate, 'Portion-aware eating for gradual weight loss'),
  idealWeight: img(P.calmNature, 'Healthy weight and balanced living'),
  mealPlan: img(P.cafeMeal, 'Daily meal planning with whole foods'),
  bodyFat: img(P.modernGym, 'Body composition and strength training'),
} as const;

export const PAGE_HEROES = {
  articles: img(P.trailRun, 'Health guides for everyday wellness', 1400),
  tools: img(P.modernGym, 'Free health calculators and planners', 1400),
  about: img(P.yogaClass, 'Wellness practices for a healthier life', 1400),
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

export function getToolOgImage(href: string): string {
  const key = (TOOL_IMAGES_MAP[href] ?? 'bmi') as keyof typeof TOOL_IMAGES;
  return heroSrc(TOOL_IMAGES[key], 1200);
}

export const ALL_PHOTO_IDS = Object.values(P);
