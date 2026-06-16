import type { CategorySlug } from './site';

export type WizardFocus = 'sleep' | 'heart' | 'energy' | 'weight';
export type WizardActivity = 'low' | 'moderate' | 'active';
export type WizardInterest = 'nutrition' | 'fitness' | 'both';

export type WizardResult = {
  title: string;
  summary: string;
  articles: string[];
  tools: string[];
};

const BASE: Record<WizardFocus, Omit<WizardResult, 'articles'> & { articles: string[] }> = {
  sleep: {
    title: 'Your sleep & recovery plan',
    summary: 'Better rest starts with routine, environment, and small daily habits.',
    articles: [
      'how-much-sleep-adults-over-50-need',
      'daily-stretching-routine-for-seniors',
      'memory-exercises-older-adults',
    ],
    tools: ['/tools/bedtime-calculator', '/tools/habit-tracker'],
  },
  heart: {
    title: 'Your heart health plan',
    summary: 'Movement, blood pressure awareness, and smart nutrition work together.',
    articles: [
      'understanding-blood-pressure-after-50',
      'heart-healthy-foods-after-50',
      'best-walking-routines-for-adults-over-50',
    ],
    tools: ['/tools/bmi-calculator', '/tools/walking-calorie-calculator'],
  },
  energy: {
    title: 'Your energy & vitality plan',
    summary: 'Hydration, protein, sleep, and daily movement fuel lasting energy.',
    articles: [
      'staying-hydrated-as-you-age',
      'healthy-breakfast-ideas-for-seniors',
      'best-exercises-for-seniors-at-home',
    ],
    tools: ['/tools/water-intake-calculator', '/tools/protein-calculator', '/tools/habit-tracker'],
  },
  weight: {
    title: 'Your healthy weight plan',
    summary: 'Sustainable progress comes from realistic calorie targets, protein, and daily movement.',
    articles: [
      'how-many-calories-do-you-need-daily',
      'how-to-calculate-macros-for-weight-loss',
      'best-walking-routines-for-adults-over-50',
    ],
    tools: [
      '/tools/meal-planner',
      '/tools/daily-calorie-calculator',
      '/tools/food-calorie-calculator',
    ],
  },
};

const ACTIVITY_ARTICLE: Record<WizardActivity, string> = {
  low: 'balance-exercises-prevent-falls-seniors',
  moderate: 'best-walking-routines-for-adults-over-50',
  active: 'osteoporosis-exercises-bone-health',
};

const INTEREST_ARTICLE: Record<WizardInterest, string> = {
  nutrition: 'cholesterol-lowering-foods-seniors',
  fitness: 'daily-stretching-routine-for-seniors',
  both: 'gut-health-probiotics-over-60',
};

export const WIZARD_BASE = BASE;
export const WIZARD_ACTIVITY_ARTICLE = ACTIVITY_ARTICLE;
export const WIZARD_INTEREST_ARTICLE = INTEREST_ARTICLE;

export function buildWizardPlan(
  focus: WizardFocus,
  activity: WizardActivity,
  interest: WizardInterest,
): WizardResult {
  const base = BASE[focus];
  const articles = [...new Set([...base.articles, ACTIVITY_ARTICLE[activity], INTEREST_ARTICLE[interest]])].slice(
    0,
    5,
  );
  return { ...base, articles };
}

export const FOCUS_OPTIONS: { id: WizardFocus; label: string; desc: string }[] = [
  { id: 'sleep', label: 'Better sleep', desc: 'Rest, recovery, and calm routines' },
  { id: 'heart', label: 'Heart health', desc: 'Blood pressure, cardio, and nutrition' },
  { id: 'energy', label: 'More energy', desc: 'Hydration, food, and daily movement' },
  { id: 'weight', label: 'Healthy weight', desc: 'Walking, strength, and sustainable eating' },
];

export const ACTIVITY_OPTIONS: { id: WizardActivity; label: string }[] = [
  { id: 'low', label: 'Mostly sedentary — starting out' },
  { id: 'moderate', label: 'Light activity a few days a week' },
  { id: 'active', label: 'Regular exercise most days' },
];

export const INTEREST_OPTIONS: { id: WizardInterest; label: string }[] = [
  { id: 'nutrition', label: 'Nutrition & meals' },
  { id: 'fitness', label: 'Movement & exercise' },
  { id: 'both', label: 'A bit of both' },
];
