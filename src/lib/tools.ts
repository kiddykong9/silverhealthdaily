export const TOOLS = [
  {
    href: '/tools/bmi-calculator',
    title: 'BMI Calculator',
    description: 'Body mass index with plain-language results.',
    category: 'body',
  },
  {
    href: '/tools/water-intake-calculator',
    title: 'Water Intake',
    description: 'Daily hydration estimate by weight and activity.',
    category: 'nutrition',
  },
  {
    href: '/tools/protein-calculator',
    title: 'Protein Calculator',
    description: 'Daily protein target based on weight and activity.',
    category: 'nutrition',
  },
  {
    href: '/tools/food-calorie-calculator',
    title: 'Food Nutrition Calculator',
    description: 'Search 300k+ USDA foods, scan barcodes, and log meals with full nutrition facts.',
    category: 'nutrition',
  },
  {
    href: '/tools/walking-calorie-calculator',
    title: 'Walking Calories',
    description: 'Calories burned on your daily walk.',
    category: 'fitness',
  },
  {
    href: '/tools/bedtime-calculator',
    title: 'Bedtime Calculator',
    description: 'Best bedtimes based on sleep cycles and wake time.',
    category: 'sleep',
  },
  {
    href: '/tools/target-heart-rate-calculator',
    title: 'Target Heart Rate',
    description: 'Moderate and vigorous zones for safe cardio exercise.',
    category: 'heart-health',
  },
  {
    href: '/tools/step-goal-calculator',
    title: 'Step Goal',
    description: 'Personalized daily step target from your activity level.',
    category: 'fitness',
  },
  {
    href: '/tools/7-day-walking-plan',
    title: '7-Day Walking Plan',
    description: 'Personalized weekly walking schedule.',
    category: 'fitness',
  },
  {
    href: '/tools/7-day-hydration-plan',
    title: '7-Day Hydration Plan',
    description: 'Build a week of hydration habits step by step.',
    category: 'nutrition',
  },
  {
    href: '/tools/7-day-sleep-plan',
    title: '7-Day Sleep Plan',
    description: 'Wind-down routines for better rest this week.',
    category: 'sleep',
  },
  {
    href: '/tools/habit-tracker',
    title: 'Habit Tracker',
    description: 'Track water, movement, and sleep daily — saved on your device.',
    category: 'wellness',
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]['href'];

export type RelatedTool = {
  href: ToolSlug;
  reason: string;
};

/** Curated cross-links — tools that naturally follow each other in a wellness workflow. */
export const TOOL_RELATED: Record<ToolSlug, RelatedTool[]> = {
  '/tools/bmi-calculator': [
    { href: '/tools/protein-calculator', reason: 'Set a daily protein target for your weight' },
    { href: '/tools/walking-calorie-calculator', reason: 'See how walking burns calories' },
    { href: '/tools/food-calorie-calculator', reason: 'Track what you eat against your goals' },
  ],
  '/tools/water-intake-calculator': [
    { href: '/tools/7-day-hydration-plan', reason: 'Build a week of hydration habits' },
    { href: '/tools/food-calorie-calculator', reason: 'Log meals and full nutrition' },
    { href: '/tools/habit-tracker', reason: 'Check off water daily on your device' },
  ],
  '/tools/protein-calculator': [
    { href: '/tools/food-calorie-calculator', reason: 'Log meals and track protein intake' },
    { href: '/tools/water-intake-calculator', reason: 'Hydration supports recovery and energy' },
    { href: '/tools/bmi-calculator', reason: 'Check BMI alongside nutrition goals' },
  ],
  '/tools/food-calorie-calculator': [
    { href: '/tools/protein-calculator', reason: 'Find your daily protein target' },
    { href: '/tools/water-intake-calculator', reason: 'How much water do you need?' },
    { href: '/tools/habit-tracker', reason: 'Track water, movement, and sleep too' },
  ],
  '/tools/walking-calorie-calculator': [
    { href: '/tools/step-goal-calculator', reason: 'Set a personalized step target' },
    { href: '/tools/7-day-walking-plan', reason: 'Get a full weekly walking schedule' },
    { href: '/tools/target-heart-rate-calculator', reason: 'Walk at the right intensity' },
  ],
  '/tools/bedtime-calculator': [
    { href: '/tools/7-day-sleep-plan', reason: 'One habit per night for better rest' },
    { href: '/tools/habit-tracker', reason: 'Track your sleep streak' },
    { href: '/tools/water-intake-calculator', reason: 'Hydration affects sleep quality' },
  ],
  '/tools/target-heart-rate-calculator': [
    { href: '/tools/walking-calorie-calculator', reason: 'Estimate calories on your walk' },
    { href: '/tools/step-goal-calculator', reason: 'Daily steps for heart health' },
    { href: '/tools/7-day-walking-plan', reason: 'Structured cardio for the week' },
  ],
  '/tools/step-goal-calculator': [
    { href: '/tools/walking-calorie-calculator', reason: 'Calories burned at your step count' },
    { href: '/tools/7-day-walking-plan', reason: 'Turn steps into a weekly plan' },
    { href: '/tools/habit-tracker', reason: 'Log movement daily' },
  ],
  '/tools/7-day-walking-plan': [
    { href: '/tools/step-goal-calculator', reason: 'Personalize your daily step target' },
    { href: '/tools/walking-calorie-calculator', reason: 'See calories per walk' },
    { href: '/tools/target-heart-rate-calculator', reason: 'Stay in a safe heart-rate zone' },
  ],
  '/tools/7-day-hydration-plan': [
    { href: '/tools/water-intake-calculator', reason: 'Calculate your daily water needs' },
    { href: '/tools/food-calorie-calculator', reason: 'Track nutrition alongside hydration' },
    { href: '/tools/habit-tracker', reason: 'Check off water every day' },
  ],
  '/tools/7-day-sleep-plan': [
    { href: '/tools/bedtime-calculator', reason: 'Pick the best bedtime for your alarm' },
    { href: '/tools/habit-tracker', reason: 'Track sleep as a daily habit' },
    { href: '/tools/walking-calorie-calculator', reason: 'Daytime movement helps night rest' },
  ],
  '/tools/habit-tracker': [
    { href: '/tools/food-calorie-calculator', reason: 'Log meals and nutrition' },
    { href: '/tools/water-intake-calculator', reason: 'Know your hydration target' },
    { href: '/tools/7-day-walking-plan', reason: 'Add a walking routine' },
  ],
};

export function getTool(href: ToolSlug) {
  return TOOLS.find((t) => t.href === href);
}

export function getRelatedTools(current: ToolSlug): (RelatedTool & { title: string; description: string })[] {
  return (TOOL_RELATED[current] ?? [])
    .map((rel) => {
      const tool = getTool(rel.href);
      if (!tool) return null;
      return { ...rel, title: tool.title, description: tool.description };
    })
    .filter(Boolean) as (RelatedTool & { title: string; description: string })[];
}

export const TOOL_IMAGES_MAP: Record<string, string> = {
  '/tools/bmi-calculator': 'bmi',
  '/tools/water-intake-calculator': 'water',
  '/tools/protein-calculator': 'protein',
  '/tools/food-calorie-calculator': 'foodCalories',
  '/tools/walking-calorie-calculator': 'walking',
  '/tools/bedtime-calculator': 'bedtime',
  '/tools/target-heart-rate-calculator': 'heartRate',
  '/tools/step-goal-calculator': 'steps',
  '/tools/7-day-walking-plan': 'walkingPlan',
  '/tools/7-day-hydration-plan': 'water',
  '/tools/7-day-sleep-plan': 'bedtime',
  '/tools/habit-tracker': 'habits',
};
