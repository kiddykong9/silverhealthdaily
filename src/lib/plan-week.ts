import type { MacroStyle } from './health-calculations';

export type WalkingLevel = 'beginner' | 'intermediate' | 'active';
export type PrimaryGoal = 'weight_loss' | 'maintain' | 'energy' | 'heart' | 'sleep';

export type PlanMeal = {
  name: string;
  calories: number;
  protein: number;
  prepTime: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
};

export type PlanWorkout = {
  title: string;
  type: 'workout' | 'rest' | 'active_recovery';
  durationMin: number;
  intensity: string;
  warmup: string[];
  main: string[];
  cooldown: string[];
  stepsGoal: number;
  notes: string;
};

export type WeekDay = {
  day: number;
  weekday: string;
  theme: string;
  workout: PlanWorkout;
  meals: {
    breakfast: PlanMeal;
    lunch: PlanMeal;
    dinner: PlanMeal;
    snack: PlanMeal;
  };
  hydration: string;
  eveningRoutine: string;
  dailyFocus: string;
};

export type WeekPlan = {
  overview: string;
  restDayLabels: string[];
  workoutDays: number;
  groceryList: string[];
  days: WeekDay[];
};

type RecipeTemplate = {
  name: string;
  baseCal: number;
  baseProtein: number;
  prepTime: string;
  ingredients: string[];
  steps: string[];
  tip?: string;
  tags: MacroStyle[];
  goals?: PrimaryGoal[];
};

type WorkoutTemplate = Omit<PlanWorkout, 'stepsGoal'>;

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const BREAKFASTS: RecipeTemplate[] = [
  {
    name: 'Greek Yogurt Power Bowl',
    baseCal: 380,
    baseProtein: 28,
    prepTime: '8 min',
    ingredients: ['1 cup plain Greek yogurt', '½ cup berries', '2 tbsp granola', '1 tbsp honey', '1 tbsp chia seeds'],
    steps: ['Add yogurt to a bowl.', 'Top with berries, granola, chia, and honey.', 'Eat within 30 min of waking for steady energy.'],
    tip: 'Swap honey for cinnamon if cutting sugar.',
    tags: ['balanced', 'high-protein', 'mediterranean'],
  },
  {
    name: 'Veggie Egg Scramble',
    baseCal: 320,
    baseProtein: 26,
    prepTime: '12 min',
    ingredients: ['2 eggs + 2 egg whites', '1 cup spinach', '¼ cup diced bell pepper', '1 slice whole-grain toast', '1 tsp olive oil'],
    steps: ['Sauté peppers and spinach in oil 2 min.', 'Add eggs; scramble until set.', 'Serve with toast.'],
    tags: ['balanced', 'high-protein', 'low-carb'],
    goals: ['weight_loss', 'energy'],
  },
  {
    name: 'Overnight Oats with Protein',
    baseCal: 350,
    baseProtein: 22,
    prepTime: '5 min (+ overnight)',
    ingredients: ['½ cup rolled oats', '¾ cup milk', '1 scoop or ½ cup cottage cheese', '½ banana, sliced', 'Pinch cinnamon'],
    steps: ['Mix oats, milk, and cottage cheese in a jar.', 'Refrigerate overnight.', 'Top with banana and cinnamon before eating.'],
    tags: ['balanced', 'high-protein'],
  },
  {
    name: 'Avocado Toast & Smoked Salmon',
    baseCal: 400,
    baseProtein: 24,
    prepTime: '10 min',
    ingredients: ['2 slices whole-grain bread', '½ avocado', '2 oz smoked salmon', 'Lemon wedge', 'Black pepper'],
    steps: ['Toast bread.', 'Mash avocado with lemon; spread on toast.', 'Top with salmon and pepper.'],
    tags: ['mediterranean', 'high-protein'],
    goals: ['heart', 'maintain'],
  },
  {
    name: 'Cottage Cheese & Fruit Plate',
    baseCal: 290,
    baseProtein: 25,
    prepTime: '5 min',
    ingredients: ['1 cup low-fat cottage cheese', '1 cup melon or berries', '10 almonds', 'Fresh mint'],
    steps: ['Plate cottage cheese and fruit.', 'Add almonds for healthy fats.', 'Optional: drizzle 1 tsp honey.'],
    tags: ['low-carb', 'high-protein'],
    goals: ['weight_loss'],
  },
  {
    name: 'Heart-Healthy Oatmeal',
    baseCal: 340,
    baseProtein: 12,
    prepTime: '10 min',
    ingredients: ['½ cup steel-cut or rolled oats', '1 cup water + splash of milk', '1 tbsp walnuts', '½ apple, diced', 'Cinnamon'],
    steps: ['Cook oats per package.', 'Stir in apple and cinnamon.', 'Top with walnuts before serving.'],
    tags: ['balanced', 'mediterranean'],
    goals: ['heart'],
  },
  {
    name: 'Spinach & Feta Wrap',
    baseCal: 360,
    baseProtein: 20,
    prepTime: '10 min',
    ingredients: ['1 whole-wheat tortilla', '2 scrambled eggs', 'Handful spinach', '2 tbsp feta', 'Salsa (optional)'],
    steps: ['Warm tortilla.', 'Fill with eggs, spinach, and feta.', 'Roll tightly; add salsa if desired.'],
    tags: ['balanced', 'mediterranean'],
  },
];

const LUNCHES: RecipeTemplate[] = [
  {
    name: 'Grilled Chicken & Quinoa Bowl',
    baseCal: 480,
    baseProtein: 42,
    prepTime: '25 min',
    ingredients: ['4 oz grilled chicken breast', '¾ cup cooked quinoa', '1 cup roasted vegetables', '1 tbsp olive oil', 'Lemon juice'],
    steps: ['Cook quinoa; roast vegetables at 400°F for 20 min.', 'Grill or pan-sear chicken.', 'Assemble bowl; drizzle oil and lemon.'],
    tags: ['balanced', 'high-protein', 'mediterranean'],
  },
  {
    name: 'Mediterranean Tuna Salad',
    baseCal: 420,
    baseProtein: 35,
    prepTime: '12 min',
    ingredients: ['1 can tuna in water', '2 tbsp olive oil', 'Cherry tomatoes', 'Cucumber', 'Mixed greens', 'Lemon'],
    steps: ['Drain tuna; flake into a bowl.', 'Toss with chopped veg, oil, and lemon.', 'Serve over greens.'],
    tags: ['mediterranean', 'low-carb', 'high-protein'],
    goals: ['heart', 'weight_loss'],
  },
  {
    name: 'Turkey & Hummus Whole-Grain Wrap',
    baseCal: 450,
    baseProtein: 32,
    prepTime: '10 min',
    ingredients: ['1 large whole-wheat wrap', '4 oz sliced turkey', '3 tbsp hummus', 'Lettuce, tomato, cucumber'],
    steps: ['Spread hummus on wrap.', 'Layer turkey and vegetables.', 'Roll and slice in half.'],
    tags: ['balanced', 'high-protein'],
  },
  {
    name: 'Lentil & Vegetable Soup',
    baseCal: 380,
    baseProtein: 18,
    prepTime: '30 min',
    ingredients: ['1 cup cooked lentils', '2 cups low-sodium broth', 'Carrot, celery, onion', '1 tsp olive oil', 'Herbs'],
    steps: ['Sauté aromatics in oil.', 'Add broth, lentils, and veg; simmer 20 min.', 'Season and serve — makes great leftovers.'],
    tags: ['balanced', 'mediterranean'],
    goals: ['heart', 'energy'],
  },
  {
    name: 'Salmon Salad Plate',
    baseCal: 460,
    baseProtein: 38,
    prepTime: '15 min',
    ingredients: ['4 oz baked or canned salmon', '2 cups mixed greens', '½ cup chickpeas', 'Olive oil & vinegar dressing'],
    steps: ['Plate greens and chickpeas.', 'Top with salmon.', 'Dress lightly — omega-3s support heart health.'],
    tags: ['mediterranean', 'high-protein', 'low-carb'],
    goals: ['heart'],
  },
  {
    name: 'Chicken Stir-Fry with Brown Rice',
    baseCal: 500,
    baseProtein: 36,
    prepTime: '20 min',
    ingredients: ['4 oz chicken strips', '1 cup mixed stir-fry vegetables', '¾ cup cooked brown rice', '1 tbsp low-sodium soy sauce', '1 tsp sesame oil'],
    steps: ['Stir-fry chicken until cooked through.', 'Add vegetables; cook 4 min.', 'Serve over rice; season with soy and sesame oil.'],
    tags: ['balanced', 'high-protein'],
  },
  {
    name: 'Greek Salad with Grilled Shrimp',
    baseCal: 440,
    baseProtein: 34,
    prepTime: '18 min',
    ingredients: ['4 oz shrimp', 'Cucumber, tomato, red onion', 'Feta (2 tbsp)', 'Olives', 'Olive oil & oregano'],
    steps: ['Grill or sauté shrimp 2 min per side.', 'Chop salad vegetables.', 'Toss with feta, olives, oil, and top with shrimp.'],
    tags: ['mediterranean', 'low-carb'],
  },
];

const DINNERS: RecipeTemplate[] = [
  {
    name: 'Baked Cod with Roasted Broccoli',
    baseCal: 420,
    baseProtein: 38,
    prepTime: '25 min',
    ingredients: ['5 oz cod fillet', '2 cups broccoli florets', '1 tbsp olive oil', 'Garlic, lemon, herbs'],
    steps: ['Roast broccoli with oil at 425°F for 15 min.', 'Bake cod with lemon and herbs 12–15 min.', 'Serve together — light dinner aids sleep.'],
    tags: ['balanced', 'mediterranean', 'low-carb'],
    goals: ['heart', 'sleep', 'weight_loss'],
  },
  {
    name: 'Lean Beef & Sweet Potato',
    baseCal: 520,
    baseProtein: 40,
    prepTime: '35 min',
    ingredients: ['4 oz lean sirloin or ground beef (93%)', '1 medium sweet potato', 'Steamed green beans', 'Olive oil, pepper'],
    steps: ['Bake sweet potato 45 min at 400°F (start first).', 'Pan-sear beef to preference.', 'Serve with green beans.'],
    tags: ['balanced', 'high-protein'],
  },
  {
    name: 'Turkey Chili (Meal-Prep Friendly)',
    baseCal: 460,
    baseProtein: 35,
    prepTime: '40 min',
    ingredients: ['6 oz ground turkey', '1 cup kidney beans', 'Diced tomatoes', 'Onion, chili powder', 'Optional: brown rice side'],
    steps: ['Brown turkey with onion.', 'Add tomatoes, beans, and spices; simmer 25 min.', 'Portion for tonight + one lunch leftover.'],
    tags: ['balanced', 'high-protein'],
    goals: ['weight_loss', 'energy'],
  },
  {
    name: 'Zucchini Noodles & Turkey Meatballs',
    baseCal: 440,
    baseProtein: 36,
    prepTime: '30 min',
    ingredients: ['4 oz turkey meatballs', '2 cups spiralized zucchini', 'Marinara (½ cup, low sugar)', 'Parmesan (1 tbsp)'],
    steps: ['Bake or pan-cook meatballs.', 'Sauté zucchini noodles 3 min — do not overcook.', 'Toss with sauce and serve.'],
    tags: ['low-carb', 'high-protein'],
    goals: ['weight_loss'],
  },
  {
    name: 'Sheet-Pan Chicken & Vegetables',
    baseCal: 480,
    baseProtein: 42,
    prepTime: '35 min',
    ingredients: ['5 oz chicken thighs (skinless)', 'Bell pepper, zucchini, red onion', '2 tbsp olive oil', 'Italian seasoning'],
    steps: ['Toss veg and chicken with oil and seasoning.', 'Roast at 425°F for 28 min.', 'Minimal cleanup — ideal for busy evenings.'],
    tags: ['balanced', 'high-protein', 'mediterranean'],
  },
  {
    name: 'Vegetable Bean Curry (Light)',
    baseCal: 400,
    baseProtein: 16,
    prepTime: '25 min',
    ingredients: ['1 cup mixed vegetables', '1 cup chickpeas', 'Light coconut milk (¼ cup)', 'Curry spice', 'Brown rice (½ cup cooked)'],
    steps: ['Simmer vegetables and chickpeas in spiced coconut milk.', 'Serve over a small portion of rice.', 'Gentle on digestion before bed.'],
    tags: ['balanced', 'mediterranean'],
    goals: ['heart', 'sleep'],
  },
  {
    name: 'Pork Tenderloin & Asparagus',
    baseCal: 450,
    baseProtein: 38,
    prepTime: '30 min',
    ingredients: ['4 oz pork tenderloin', '1 bunch asparagus', '1 small baked potato or ½ cup rice', 'Mustard glaze (1 tsp honey + mustard)'],
    steps: ['Roast tenderloin to 145°F internal.', 'Roast asparagus alongside.', 'Rest meat 5 min before slicing.'],
    tags: ['balanced', 'high-protein'],
  },
];

const SNACKS: RecipeTemplate[] = [
  {
    name: 'Apple & Almond Butter',
    baseCal: 180,
    baseProtein: 4,
    prepTime: '2 min',
    ingredients: ['1 medium apple', '1 tbsp almond butter'],
    steps: ['Slice apple; dip in almond butter.'],
    tags: ['balanced', 'mediterranean'],
  },
  {
    name: 'Protein Smoothie',
    baseCal: 200,
    baseProtein: 22,
    prepTime: '5 min',
    ingredients: ['1 scoop protein powder', '1 cup milk', '½ banana', 'Handful spinach (optional)'],
    steps: ['Blend until smooth.', 'Best post-workout or mid-afternoon.'],
    tags: ['high-protein'],
  },
  {
    name: 'Hummus & Veggie Sticks',
    baseCal: 150,
    baseProtein: 6,
    prepTime: '5 min',
    ingredients: ['3 tbsp hummus', 'Carrot, celery, cucumber sticks'],
    steps: ['Prep vegetables; dip in hummus.'],
    tags: ['balanced', 'mediterranean', 'low-carb'],
  },
  {
    name: 'Hard-Boiled Eggs (2)',
    baseCal: 140,
    baseProtein: 12,
    prepTime: '12 min',
    ingredients: ['2 eggs', 'Pinch salt and pepper'],
    steps: ['Boil eggs 10–11 min; cool in ice water.', 'Peel and season.'],
    tags: ['high-protein', 'low-carb'],
  },
  {
    name: 'Mixed Nuts & Dark Chocolate',
    baseCal: 190,
    baseProtein: 5,
    prepTime: '1 min',
    ingredients: ['1 oz mixed nuts', '2 squares dark chocolate (70%+)'],
    steps: ['Portion into a small bowl — pre-portioning prevents overeating.'],
    tags: ['balanced', 'mediterranean'],
  },
  {
    name: 'Cottage Cheese & Pineapple',
    baseCal: 160,
    baseProtein: 14,
    prepTime: '3 min',
    ingredients: ['½ cup cottage cheese', '½ cup pineapple chunks'],
    steps: ['Combine and eat — high protein, satisfies sweet cravings.'],
    tags: ['high-protein', 'low-carb'],
  },
  {
    name: 'Edamame Cup',
    baseCal: 120,
    baseProtein: 11,
    prepTime: '5 min',
    ingredients: ['1 cup shelled edamame', 'Sea salt'],
    steps: ['Steam or microwave edamame; salt lightly.'],
    tags: ['balanced', 'high-protein'],
  },
];

const WORKOUTS: Record<string, WorkoutTemplate> = {
  walk_strength_intro: {
    title: 'Brisk Walk + Intro Strength',
    type: 'workout',
    durationMin: 40,
    intensity: 'Moderate',
    warmup: ['3 min easy walk', 'Arm circles × 10 each direction', 'March in place 1 min'],
    main: [
      '20 min brisk walk (you should be able to talk, not sing)',
      'Wall push-ups × 10',
      'Chair squats × 12',
      'Standing calf raises × 15',
      'Repeat strength circuit once',
    ],
    cooldown: ['5 min slow walk', 'Gentle quad and calf stretches 30 sec each'],
    notes: 'Keep water nearby. Stop if dizzy or sharp joint pain.',
  },
  full_rest: {
    title: 'Rest & Recovery Day',
    type: 'rest',
    durationMin: 20,
    intensity: 'Very light',
    warmup: ['No structured workout today'],
    main: [
      'Optional: 10 min gentle stretching (neck, shoulders, hips)',
      'Focus on meal prep for the next 2 days',
      'Extra sleep or a short nap (20 min max) if needed',
    ],
    cooldown: ['5 min deep breathing or meditation'],
    notes: 'Rest days build muscle and prevent burnout. Movement optional, not mandatory.',
  },
  walk_intervals: {
    title: 'Walk Intervals',
    type: 'workout',
    durationMin: 35,
    intensity: 'Moderate–vigorous',
    warmup: ['5 min easy pace'],
    main: [
      '1 min brisk / 2 min easy — repeat 8 times',
      'Or: walk hills or stairs if available (5 rounds)',
      'Track heart rate in moderate zone if you use a monitor',
    ],
    cooldown: ['5 min easy walk', 'Hamstring and hip flexor stretch'],
    notes: 'Intervals boost calorie burn without long gym sessions.',
  },
  active_recovery_walk: {
    title: 'Active Recovery Walk',
    type: 'active_recovery',
    durationMin: 25,
    intensity: 'Easy',
    warmup: ['Start/lib walk at conversational pace'],
    main: ['20 min relaxed walk outdoors if possible', 'Focus on posture: shoulders back, core engaged'],
    cooldown: ['3 min stretching — focus on areas that feel tight'],
    notes: 'You should finish feeling refreshed, not exhausted.',
  },
  strength_circuit: {
    title: 'At-Home Strength Circuit',
    type: 'workout',
    durationMin: 35,
    intensity: 'Moderate',
    warmup: ['5 min walk or march in place', 'Dynamic leg swings × 10'],
    main: [
      'Circuit × 3 rounds (rest 60 sec between rounds):',
      'Sit-to-stand from chair × 12',
      'Wall push-ups × 12',
      'Glute bridges × 15',
      'Standing row with band or towel × 12',
      'Dead bug or modified plank × 20 sec',
    ],
    cooldown: ['5 min full-body stretch'],
    notes: 'Move slowly with control. Quality beats speed.',
  },
  long_walk: {
    title: 'Long Steady Walk',
    type: 'workout',
    durationMin: 50,
    intensity: 'Moderate',
    warmup: ['5 min easy pace'],
    main: [
      '40 min continuous walk at steady brisk pace',
      'Optional: add light hand weights last 10 min',
      'Aim to hit weekly step goal today',
    ],
    cooldown: ['5 min slow walk + calf stretches'],
    notes: 'Great day for a podcast or walking with a friend.',
  },
  yoga_mobility: {
    title: 'Gentle Yoga & Mobility',
    type: 'active_recovery',
    durationMin: 30,
    intensity: 'Light',
    warmup: ['Cat-cow × 8 breaths'],
    main: [
      'Child\'s pose — 1 min',
      'Seated spinal twist — 30 sec each side',
      'Hip flexor stretch — 45 sec each side',
      'Standing forward fold — 1 min',
      'Box breathing: 4 sec in, 4 hold, 4 out × 5 rounds',
    ],
    cooldown: ['Savasana or quiet rest 3 min'],
    notes: 'Ideal before your target bedtime on sleep-focused weeks.',
  },
  heart_walk: {
    title: 'Heart-Health Cardio Walk',
    type: 'workout',
    durationMin: 40,
    intensity: 'Moderate (zone 2)',
    warmup: ['5 min easy walk'],
    main: [
      '30 min walk keeping heart rate in moderate zone',
      'Flat terrain preferred; avoid breathlessness',
      'Cool down gradually — do not stop abruptly',
    ],
    cooldown: ['5 min slow walk', 'Check how you feel before sitting'],
    notes: 'If you have heart conditions, confirm intensity with your doctor.',
  },
  energy_morning_boost: {
    title: 'Morning Energy Walk + Mobility',
    type: 'workout',
    durationMin: 30,
    intensity: 'Light–moderate',
    warmup: ['2 min shoulder rolls and ankle circles'],
    main: ['15 min morning walk in daylight (supports circadian rhythm)', '10 min mobility: hips, thoracic spine, ankles'],
    cooldown: ['3 min breathing exercises'],
    notes: 'Morning light and movement together improve daily energy.',
  },
};

type ScheduleKey = `${WalkingLevel}_${PrimaryGoal}`;

const WEEK_SCHEDULES: Record<string, string[]> = {
  beginner_weight_loss: ['walk_strength_intro', 'full_rest', 'walk_intervals', 'active_recovery_walk', 'strength_circuit', 'long_walk', 'yoga_mobility'],
  beginner_maintain: ['walk_strength_intro', 'yoga_mobility', 'heart_walk', 'full_rest', 'strength_circuit', 'long_walk', 'active_recovery_walk'],
  beginner_energy: ['energy_morning_boost', 'full_rest', 'walk_intervals', 'yoga_mobility', 'strength_circuit', 'long_walk', 'full_rest'],
  beginner_heart: ['heart_walk', 'full_rest', 'walk_intervals', 'active_recovery_walk', 'heart_walk', 'long_walk', 'yoga_mobility'],
  beginner_sleep: ['energy_morning_boost', 'yoga_mobility', 'walk_strength_intro', 'full_rest', 'heart_walk', 'active_recovery_walk', 'full_rest'],
  intermediate_weight_loss: ['walk_intervals', 'active_recovery_walk', 'strength_circuit', 'yoga_mobility', 'walk_intervals', 'long_walk', 'full_rest'],
  intermediate_maintain: ['heart_walk', 'strength_circuit', 'walk_intervals', 'active_recovery_walk', 'strength_circuit', 'long_walk', 'yoga_mobility'],
  intermediate_energy: ['energy_morning_boost', 'walk_intervals', 'strength_circuit', 'yoga_mobility', 'heart_walk', 'long_walk', 'full_rest'],
  intermediate_heart: ['heart_walk', 'active_recovery_walk', 'walk_intervals', 'yoga_mobility', 'heart_walk', 'long_walk', 'full_rest'],
  intermediate_sleep: ['energy_morning_boost', 'yoga_mobility', 'heart_walk', 'full_rest', 'walk_strength_intro', 'active_recovery_walk', 'full_rest'],
  active_weight_loss: ['walk_intervals', 'strength_circuit', 'long_walk', 'active_recovery_walk', 'walk_intervals', 'long_walk', 'yoga_mobility'],
  active_maintain: ['heart_walk', 'strength_circuit', 'walk_intervals', 'yoga_mobility', 'strength_circuit', 'long_walk', 'full_rest'],
  active_energy: ['energy_morning_boost', 'walk_intervals', 'strength_circuit', 'heart_walk', 'long_walk', 'strength_circuit', 'yoga_mobility'],
  active_heart: ['heart_walk', 'walk_intervals', 'long_walk', 'yoga_mobility', 'heart_walk', 'long_walk', 'full_rest'],
  active_sleep: ['energy_morning_boost', 'heart_walk', 'yoga_mobility', 'full_rest', 'walk_intervals', 'active_recovery_walk', 'full_rest'],
};

const DAY_THEMES: Record<number, string> = {
  1: 'Start strong — set the tone for the week',
  2: 'Recover smart — rest is part of progress',
  3: 'Push pace — intervals or strength focus',
  4: 'Midweek reset — lighter movement or rest',
  5: 'Build strength — protect muscle while losing fat',
  6: 'Long session — steps and endurance',
  7: 'Restore — prep food and wind down for next week',
};

function pickRecipes(
  style: MacroStyle,
  goal: PrimaryGoal,
  mealTargets: { breakfast: number; lunch: number; dinner: number; snack: number },
  proteinTargets: { breakfast: number; lunch: number; dinner: number; snack: number },
): WeekDay['meals'][] {
  const filter = (pool: RecipeTemplate[], dayIndex: number) => {
    const matched = pool.filter(
      (r) => r.tags.includes(style) || r.goals?.includes(goal),
    );
    const poolUse = matched.length >= 7 ? matched : pool;
    return poolUse[dayIndex % poolUse.length];
  };

  return Array.from({ length: 7 }, (_, i) => {
    const b = filter(BREAKFASTS, i);
    const l = filter(LUNCHES, i + 1);
    const d = filter(DINNERS, i + 2);
    const s = filter(SNACKS, i);
    return {
      breakfast: scaleRecipe(b, mealTargets.breakfast, proteinTargets.breakfast),
      lunch: scaleRecipe(l, mealTargets.lunch, proteinTargets.lunch),
      dinner: scaleRecipe(d, mealTargets.dinner, proteinTargets.dinner),
      snack: scaleRecipe(s, mealTargets.snack, proteinTargets.snack),
    };
  });
}

function scaleRecipe(template: RecipeTemplate, targetCal: number, targetProtein: number): PlanMeal {
  const calFactor = targetCal / template.baseCal;
  const portion = Math.round(calFactor * 10) / 10;
  const calories = Math.round(template.baseCal * portion);
  const protein = Math.round(template.baseProtein * portion);
  const portionNote =
    portion < 0.85
      ? 'Use ~75–85% of listed portions'
      : portion > 1.15
        ? 'Increase portions ~15–25% or add a side salad/fruit'
        : undefined;
  return {
    name: template.name,
    calories,
    protein,
    prepTime: template.prepTime,
    ingredients: template.ingredients,
    steps: template.steps,
    tip: portionNote ?? template.tip,
  };
}

function buildGroceryList(days: WeekDay[]): string[] {
  const items = new Set<string>();
  for (const day of days) {
    for (const meal of Object.values(day.meals)) {
      for (const ing of meal.ingredients) {
        items.add(ing.replace(/^\d+[\d./]*\s*(cup|oz|tbsp|tsp|scoop|slices?|cloves?)?\s*/i, '').trim() || ing);
      }
    }
  }
  return [...items].sort().slice(0, 35);
}

function getSchedule(walkingLevel: WalkingLevel, primaryGoal: PrimaryGoal): string[] {
  const key: ScheduleKey = `${walkingLevel}_${primaryGoal}`;
  return WEEK_SCHEDULES[key] ?? WEEK_SCHEDULES[`${walkingLevel}_weight_loss`];
}

export type WeekPlanInput = {
  walkingLevel: WalkingLevel;
  primaryGoal: PrimaryGoal;
  macroStyle: MacroStyle;
};

export function buildWeekPlan(
  input: WeekPlanInput,
  mealTargets: { breakfast: number; lunch: number; dinner: number; snack: number },
  proteinTargets: { breakfast: number; lunch: number; dinner: number; snack: number },
  stepGoal: number,
  glasses: number,
  bedtime: string,
): WeekPlan {
  const schedule = getSchedule(input.walkingLevel, input.primaryGoal);
  const mealPlans = pickRecipes(input.macroStyle, input.primaryGoal, mealTargets, proteinTargets);

  const days: WeekDay[] = schedule.map((workoutKey, i) => {
    const dayNum = i + 1;
    const template = WORKOUTS[workoutKey];
    const isRest = template.type === 'rest';
    const daySteps = isRest ? Math.round(stepGoal * 0.6) : stepGoal;

    return {
      day: dayNum,
      weekday: WEEKDAYS[i],
      theme: DAY_THEMES[dayNum],
      workout: { ...template, stepsGoal: daySteps },
      meals: mealPlans[i],
      hydration: isRest
        ? `${glasses} glasses — sip steadily; rest days are not low-water days`
        : `${glasses} glasses — extra 8 oz around your workout`,
      eveningRoutine:
        input.primaryGoal === 'sleep'
          ? `Screens off 30 min before bed. Target lights-out: ${bedtime}. ${SLEEP_EVENING[i]}`
          : `Wind down 45 min before ${bedtime}. ${GENERAL_EVENING[i]}`,
      dailyFocus: isRest
        ? 'Rest day — prioritize sleep, hydration, and meal prep. Gentle stretching only if it feels good.'
        : WORKOUT_FOCUS[i],
    };
  });

  const restDayLabels = days.filter((d) => d.workout.type === 'rest').map((d) => d.weekday);
  const workoutDays = days.filter((d) => d.workout.type === 'workout').length;

  return {
    overview: `Your 7-day program combines ${workoutDays} structured workout days, ${restDayLabels.length} rest/recovery days, and complete daily menus scaled to your calorie targets. Follow days in order — each includes meals, movement, hydration, and an evening routine.`,
    restDayLabels,
    workoutDays,
    groceryList: buildGroceryList(days),
    days,
  };
}

const SLEEP_EVENING = [
  'Herbal tea only after dinner.',
  'Light stretching only — no intense exercise.',
  'Journal 3 things from today.',
  'Keep bedroom cool and dark.',
  'No heavy meals after 7 PM.',
  'Read fiction instead of news.',
  'Set out clothes for Monday; same bedtime tonight.',
];

const GENERAL_EVENING = [
  'Prep tomorrow\'s breakfast.',
  '10 min walk after dinner if you sat most of the day.',
  'Review tomorrow\'s workout in the PDF.',
  'Midweek check: are you hitting water goals?',
  'Prep lunch containers for the weekend.',
  'Longer walk day — stretch calves before bed.',
  'Weekly review: what worked? Adjust next week.',
];

const WORKOUT_FOCUS = [
  'Start the week: protein-rich breakfast within 2 hours of waking.',
  'Pre-workout snack 30–60 min before if hungry.',
  'Interval day — stay hydrated; walk before strength if doing both.',
  'Midweek check: hit water goal before afternoon.',
  'Strength day — protein within 90 min after your session.',
  'Long session day — supportive shoes; steady pace over speed.',
  'Finish the week: prep tomorrow\'s breakfast tonight.',
];
