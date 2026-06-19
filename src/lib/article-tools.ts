/** Primary free tool CTA per article — drives article → tool internal links for SEO. */
export type ArticleToolPromo = {
  href: string;
  title: string;
  blurb: string;
};

export const ARTICLE_TOOLS: Record<string, ArticleToolPromo> = {
  'how-many-calories-does-walking-burn': {
    href: '/tools/walking-calorie-calculator',
    title: 'Calories Burned Walking Calculator',
    blurb: 'Enter weight, pace, and duration — get calories burned in seconds.',
  },
  'walking-for-weight-loss-how-much': {
    href: '/tools/walking-calorie-calculator',
    title: 'Calories Burned Walking Calculator',
    blurb: 'Estimate calories per walk before you plan weekly mileage.',
  },
  'how-to-estimate-body-fat-percentage': {
    href: '/tools/body-fat-calculator',
    title: 'Body Fat Percentage Calculator',
    blurb: 'Navy tape method or BMI estimate — free, instant results.',
  },
  'what-is-a-healthy-bmi': {
    href: '/tools/bmi-calculator',
    title: 'BMI Calculator',
    blurb: 'Check your BMI category in seconds.',
  },
  'how-many-calories-do-you-need-daily': {
    href: '/tools/daily-calorie-calculator',
    title: 'Daily Calorie (TDEE) Calculator',
    blurb: 'Find maintenance calories based on age, weight, and activity.',
  },
  'how-many-steps-per-day-for-health': {
    href: '/tools/step-goal-calculator',
    title: 'Step Goal Calculator',
    blurb: 'Set a personalized daily step target.',
  },
  'how-to-track-calories-and-nutrition-free': {
    href: '/tools/food-calorie-calculator',
    title: 'Food Nutrition Calculator',
    blurb: 'Search USDA foods or scan barcodes — log meals free.',
  },
  'target-heart-rate-when-walking': {
    href: '/tools/target-heart-rate-calculator',
    title: 'Target Heart Rate Calculator',
    blurb: 'Find your moderate and vigorous walking zones by age.',
  },
  'safe-calorie-deficit-for-weight-loss': {
    href: '/tools/calorie-deficit-calculator',
    title: 'Calorie Deficit Calculator',
    blurb: 'Plan a safe deficit and weekly weight-loss pace.',
  },
  'how-many-calories-to-eat-to-lose-weight': {
    href: '/tools/calorie-deficit-calculator',
    title: 'Calorie Deficit Calculator',
    blurb: 'See how many calories to eat for steady fat loss.',
  },
  'how-to-calculate-macros-for-weight-loss': {
    href: '/tools/macro-calculator',
    title: 'Macro Calculator',
    blurb: 'Split daily calories into protein, carbs, and fat.',
  },
  'how-to-plan-daily-meals-for-your-calorie-goal': {
    href: '/tools/meal-planner',
    title: 'Daily Meal Planner',
    blurb: 'Divide calories across breakfast, lunch, dinner, and snacks.',
  },
  'how-much-protein-do-you-need-daily': {
    href: '/tools/protein-calculator',
    title: 'Protein Calculator',
    blurb: 'Daily protein target by weight and activity level.',
  },
  'staying-hydrated-as-you-age': {
    href: '/tools/water-intake-calculator',
    title: 'Water Intake Calculator',
    blurb: 'Personalized daily water target in cups and liters.',
  },
  'best-walking-routines-for-adults-over-50': {
    href: '/tools/7-day-walking-plan',
    title: '7-Day Walking Plan',
    blurb: 'A gentle week-by-week walking schedule.',
  },
};

export function getArticleTool(articleId: string): ArticleToolPromo | undefined {
  return ARTICLE_TOOLS[articleId];
}
