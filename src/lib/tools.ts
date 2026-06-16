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
