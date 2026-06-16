import type { ToolSlug } from './tools';

/** Related article slugs per tool — drives tool → article internal links for SEO. */
export const TOOL_ARTICLES: Record<ToolSlug, string[]> = {
  '/tools/bmi-calculator': ['what-is-a-healthy-bmi', 'how-to-estimate-body-fat-percentage', 'safe-calorie-deficit-for-weight-loss'],
  '/tools/water-intake-calculator': ['staying-hydrated-as-you-age', 'signs-of-dehydration-older-adults', 'how-many-calories-do-you-need-daily'],
  '/tools/protein-calculator': ['how-much-protein-do-you-need-daily', 'how-to-calculate-macros-for-weight-loss', 'healthy-breakfast-ideas-for-seniors'],
  '/tools/food-calorie-calculator': ['how-to-track-calories-and-nutrition-free', 'how-to-plan-daily-meals-for-your-calorie-goal', 'cholesterol-lowering-foods-seniors'],
  '/tools/daily-calorie-calculator': ['how-many-calories-do-you-need-daily', 'safe-calorie-deficit-for-weight-loss', 'how-to-calculate-macros-for-weight-loss'],
  '/tools/macro-calculator': ['how-to-calculate-macros-for-weight-loss', 'how-to-plan-daily-meals-for-your-calorie-goal', 'how-many-calories-do-you-need-daily'],
  '/tools/calorie-deficit-calculator': ['safe-calorie-deficit-for-weight-loss', 'how-many-calories-to-eat-to-lose-weight', 'how-to-lose-weight-after-50'],
  '/tools/ideal-weight-calculator': ['what-is-a-healthy-bmi', 'how-to-estimate-body-fat-percentage', 'safe-calorie-deficit-for-weight-loss'],
  '/tools/meal-planner': ['how-to-plan-daily-meals-for-your-calorie-goal', 'healthy-breakfast-ideas-for-seniors', 'how-to-track-calories-and-nutrition-free'],
  '/tools/body-fat-calculator': ['how-to-estimate-body-fat-percentage', 'what-is-a-healthy-bmi', 'safe-calorie-deficit-for-weight-loss'],
  '/tools/walking-calorie-calculator': ['how-many-calories-does-walking-burn', 'walking-for-weight-loss-how-much', 'how-many-steps-per-day-for-health'],
  '/tools/bedtime-calculator': ['how-much-sleep-adults-over-50-need', 'best-bedtime-for-your-wake-up-time', 'how-many-calories-do-you-need-daily'],
  '/tools/target-heart-rate-calculator': ['target-heart-rate-when-walking', 'normal-blood-pressure-by-age', 'foods-that-lower-blood-pressure-naturally'],
  '/tools/step-goal-calculator': ['how-many-steps-per-day-for-health', 'best-walking-routines-for-adults-over-50', 'how-many-calories-does-walking-burn'],
  '/tools/7-day-walking-plan': ['best-walking-routines-for-adults-over-50', 'how-many-steps-per-day-for-health', 'balance-exercises-prevent-falls-seniors'],
  '/tools/7-day-hydration-plan': ['staying-hydrated-as-you-age', 'signs-of-dehydration-older-adults', 'how-much-protein-do-you-need-daily'],
  '/tools/7-day-sleep-plan': ['how-much-sleep-adults-over-50-need', 'best-bedtime-for-your-wake-up-time', 'daily-stretching-routine-for-seniors'],
  '/tools/habit-tracker': ['daily-stretching-routine-for-seniors', 'staying-hydrated-as-you-age', 'how-much-sleep-adults-over-50-need'],
};

export function getToolArticleSlugs(slug: ToolSlug): string[] {
  return TOOL_ARTICLES[slug] ?? [];
}
