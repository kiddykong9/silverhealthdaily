import {
  calcBedtimes,
  calcBmi,
  calcDeficit,
  calcHeartRate,
  calcIdealWeightRange,
  calcMacros,
  mealSplit,
  calcProtein,
  calcStepGoal,
  calcTdee,
  calcWalkingCalories,
  calcWaterOz,
  cmFromImperial,
  kgFromLb,
  type MacroStyle,
  type Sex,
} from './health-calculations';
import { TOOLS } from './tools';

export type PrimaryGoal = 'weight_loss' | 'maintain' | 'energy' | 'heart' | 'sleep';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type SleepChallenge = 'falling' | 'staying' | 'schedule' | 'screens';
export type WalkingLevel = 'beginner' | 'intermediate' | 'active';

export type PlanSurvey = {
  name: string;
  sex: Sex;
  age: number;
  units: 'imperial' | 'metric';
  weightLb: number;
  heightFt: number;
  heightIn: number;
  weightKg: number;
  heightCm: number;
  primaryGoal: PrimaryGoal;
  weightGoal: 'maintain' | 'lose_slow' | 'lose_standard';
  activityLevel: ActivityLevel;
  currentSteps: number;
  walkingMinutes: number;
  wakeHour: number;
  wakeMinute: number;
  wakeAmPm: 'AM' | 'PM';
  sleepChallenge: SleepChallenge;
  macroStyle: MacroStyle;
  walkingLevel: WalkingLevel;
  walkDaysPerWeek: 5 | 6 | 7;
  priorities: string[];
};

export type HealthPlan = {
  generatedAt: string;
  survey: PlanSurvey;
  body: ReturnType<typeof calcBmi> & { idealWeight: ReturnType<typeof calcIdealWeightRange> };
  energy: ReturnType<typeof calcTdee> & ReturnType<typeof calcDeficit>;
  nutrition: ReturnType<typeof calcMacros> & ReturnType<typeof calcProtein> & { meals: ReturnType<typeof mealSplit> };
  hydration: ReturnType<typeof calcWaterOz>;
  movement: {
    stepGoal: number;
    walking: ReturnType<typeof calcWalkingCalories>;
    heartRate: ReturnType<typeof calcHeartRate>;
    walkingPlan: string[];
  };
  sleep: {
    bedtimes: ReturnType<typeof calcBedtimes>;
    sleepPlan: string[];
    hydrationPlan: string[];
  };
  habits: string[];
  recommendedTools: typeof TOOLS[number][];
  recommendedArticles: string[];
  summary: string;
};

const WALKING_PLANS: Record<WalkingLevel, string[]> = {
  beginner: [
    'Day 1 — 15 min easy walk',
    'Day 2 — Rest or stretching',
    'Day 3 — 18 min brisk walk',
    'Day 4 — Rest',
    'Day 5 — 20 min walk',
    'Day 6 — 15 min leisure walk',
    'Day 7 — 22 min walk',
  ],
  intermediate: [
    'Day 1 — 25 min brisk walk',
    'Day 2 — 20 min recovery walk',
    'Day 3 — 30 min with hills/stairs',
    'Day 4 — Rest or yoga',
    'Day 5 — 28 min brisk walk',
    'Day 6 — 35 min longer walk',
    'Day 7 — 25 min easy walk',
  ],
  active: [
    'Day 1 — 35 min brisk walk',
    'Day 2 — 30 min walk + light strength',
    'Day 3 — 40 min interval walk',
    'Day 4 — 25 min recovery walk',
    'Day 5 — 45 min varied terrain',
    'Day 6 — 35 min brisk walk',
    'Day 7 — 50 min long walk',
  ],
};

const SLEEP_PLANS: Record<SleepChallenge, string[]> = {
  falling: [
    'Night 1 — Same wake time; dim lights 1 hour before bed',
    'Night 2 — No caffeine after 2 PM',
    'Night 3 — 10-minute wind-down stretch',
    'Night 4 — Cool bedroom to 65–68°F',
    'Night 5 — Phone out of bedroom',
    'Night 6 — 5 min breathing in bed',
    'Night 7 — Lock bedtime with calculator',
  ],
  staying: [
    'Night 1 — No large meals 3h before bed',
    'Night 2 — Limit fluids 2h before sleep',
    'Night 3 — If awake 20+ min, get up briefly',
    'Night 4 — Same wake time daily',
    'Night 5 — Reduce evening alcohol',
    'Night 6 — 20 min nap max if needed',
    'Night 7 — Track sleep habit',
  ],
  schedule: [
    'Night 1 — Pick fixed wake time for 7 days',
    'Night 2 — Morning light within 30 min of waking',
    'Night 3 — Bed 15 min earlier',
    'Night 4 — No long weekend lie-ins',
    'Night 5 — Regular meal times',
    'Night 6 — Exercise before evening',
    'Night 7 — Review bedtime targets',
  ],
  screens: [
    'Night 1 — Charge phone outside bedroom',
    'Night 2 — Night mode at 8 PM',
    'Night 3 — Read instead of scroll',
    'Night 4 — No screens 30 min before bed',
    'Night 5 — Alarm clock instead of phone',
    'Night 6 — Podcast with sleep timer',
    'Night 7 — Full week screen-free wind-down',
  ],
};

const GOAL_ARTICLES: Record<PrimaryGoal, string[]> = {
  weight_loss: [
    'how-to-lose-weight-after-50',
    'how-many-calories-to-eat-to-lose-weight',
    'safe-calorie-deficit-for-weight-loss',
    'walking-for-weight-loss-how-much',
  ],
  maintain: ['how-many-calories-do-you-need-daily', 'how-to-plan-daily-meals-for-your-calorie-goal'],
  energy: ['staying-hydrated-as-you-age', 'how-much-protein-do-you-need-daily', 'best-exercises-for-seniors-at-home'],
  heart: ['normal-blood-pressure-by-age', 'foods-that-lower-blood-pressure-naturally', 'target-heart-rate-when-walking'],
  sleep: ['how-much-sleep-adults-over-50-need', 'best-bedtime-for-your-wake-up-time'],
};

const TOOL_SET = [
  '/tools/daily-calorie-calculator',
  '/tools/macro-calculator',
  '/tools/protein-calculator',
  '/tools/water-intake-calculator',
  '/tools/meal-planner',
  '/tools/food-calorie-calculator',
  '/tools/bmi-calculator',
  '/tools/step-goal-calculator',
  '/tools/walking-calorie-calculator',
  '/tools/7-day-walking-plan',
  '/tools/bedtime-calculator',
  '/tools/target-heart-rate-calculator',
  '/tools/habit-tracker',
  '/tools/7-day-hydration-plan',
  '/tools/7-day-sleep-plan',
  '/tools/calorie-deficit-calculator',
] as const;

export function buildHealthPlan(survey: PlanSurvey): HealthPlan {
  const kg = survey.units === 'imperial' ? kgFromLb(survey.weightLb) : survey.weightKg;
  const cm =
    survey.units === 'imperial' ? cmFromImperial(survey.heightFt, survey.heightIn) : survey.heightCm;
  const weightLb = survey.units === 'imperial' ? survey.weightLb : Math.round(kg / 0.453592);

  const bmi = calcBmi(kg, cm);
  const idealWeight = calcIdealWeightRange(cm);
  const { bmr, tdee } = calcTdee(survey.sex, kg, cm, survey.age, survey.activityLevel);
  const deficit = calcDeficit(tdee, survey.weightGoal);
  const macros = calcMacros(deficit.targetCalories, survey.macroStyle);
  const protein = calcProtein(kg, survey.activityLevel);
  const meals = mealSplit(deficit.targetCalories, macros);
  const hydration = calcWaterOz(weightLb, survey.activityLevel);
  const stepGoal = calcStepGoal(
    survey.currentSteps,
    survey.weightGoal === 'maintain' ? 'maintain' : 'improve',
  );
  const walking = calcWalkingCalories(kg, survey.walkingMinutes, 3);
  const heartRate = calcHeartRate(survey.age);
  const bedtimes = calcBedtimes(survey.wakeHour, survey.wakeMinute, survey.wakeAmPm);

  const glassesTarget = hydration.glasses;
  const hydrationPlan = [
    `Day 1 — Start with ${Math.max(4, glassesTarget - 3)} glasses`,
    'Day 2 — One glass before breakfast',
    'Day 3 — Keep water visible on your desk',
    'Day 4 — Add a glass at lunch',
    'Day 5 — Swap one sugary drink for water',
    'Day 6 — Water-rich foods (soup, fruit)',
    `Day 7 — Hit ${glassesTarget} glasses goal`,
  ];

  const habits = [
    'Drink water within 30 minutes of waking',
    `Walk ${survey.walkingMinutes} minutes on most days`,
    'Eat protein at breakfast and lunch',
    'Screens off 30 minutes before bed',
    'Track habits in our free Habit Tracker',
  ];

  const goalLabel: Record<PrimaryGoal, string> = {
    weight_loss: 'healthy weight loss',
    maintain: 'weight maintenance',
    energy: 'daily energy',
    heart: 'heart health',
    sleep: 'better sleep',
  };

  const summary = `${survey.name || 'Your'} personalized plan focuses on ${goalLabel[survey.primaryGoal]} with a daily target of ${deficit.targetCalories.toLocaleString()} calories, ${protein.grams}g protein, ${hydration.oz} oz water, and ${stepGoal.toLocaleString()} steps.`;

  return {
    generatedAt: new Date().toISOString(),
    survey,
    body: { ...bmi, idealWeight },
    energy: { bmr, tdee, ...deficit },
    nutrition: { ...macros, ...protein, meals },
    hydration,
    movement: {
      stepGoal,
      walking,
      heartRate,
      walkingPlan: WALKING_PLANS[survey.walkingLevel],
    },
    sleep: {
      bedtimes,
      sleepPlan: SLEEP_PLANS[survey.sleepChallenge],
      hydrationPlan,
    },
    habits,
    recommendedTools: TOOL_SET.map((href) => TOOLS.find((t) => t.href === href)!).filter(Boolean),
    recommendedArticles: GOAL_ARTICLES[survey.primaryGoal],
    summary,
  };
}
