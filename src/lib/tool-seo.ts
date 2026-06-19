import type { ToolSlug } from './tools';

export type ToolSeoContent = {
  intro: string[];
  faqs: { q: string; a: string }[];
};

export const TOOL_SEO: Record<ToolSlug, ToolSeoContent> = {
  '/tools/bmi-calculator': {
    intro: [
      'Body mass index (BMI) divides your weight by height squared. It is a quick screening number doctors use before deeper tests — not a diagnosis on its own.',
      'Muscle mass, age, and where you carry fat all matter. Athletes and very muscular adults may read "overweight" despite low body fat. Pair BMI with waist size, activity, and blood pressure for context.',
      'Use this free BMI calculator for instant results with plain-language categories. For a height-based weight range, try our Ideal Weight Calculator next.',
    ],
    faqs: [
      { q: 'What is a healthy BMI for adults?', a: 'For most adults, 18.5–24.9 is considered normal weight. Ranges above 25 suggest overweight; 30+ suggests obesity. Your doctor may interpret results differently based on muscle, age, and health history.' },
      { q: 'Is BMI accurate for everyone?', a: 'BMI is less accurate for very muscular people, some older adults who lost muscle, and certain ethnic groups. It works best as a starting screening tool, not a final health verdict.' },
      { q: 'How do I calculate BMI manually?', a: 'Metric: weight (kg) ÷ height (m)². Imperial: 703 × weight (lb) ÷ height (in)². This calculator handles both unit systems automatically.' },
    ],
  },
  '/tools/water-intake-calculator': {
    intro: [
      'Daily water needs depend on body weight, activity, climate, and health conditions. A common rule is about half your body weight in ounces — but exercise and heat raise requirements.',
      'Older adults often feel thirst less sharply, which makes planned hydration important. Mild dehydration can affect energy, focus, and digestion.',
      'Enter your weight and activity level below for a personalized daily water target in cups and liters.',
    ],
    faqs: [
      { q: 'How much water should I drink per day?', a: 'Many adults need 8–12 cups (2–3 liters) daily. Heavier or more active people need more. This calculator adjusts for weight and activity level.' },
      { q: 'Does coffee count toward water intake?', a: 'Moderate coffee and tea contribute to fluid intake for most healthy adults, though water remains the best baseline hydrator.' },
      { q: 'What are signs of dehydration?', a: 'Dark urine, dry mouth, headache, dizziness, and fatigue can signal dehydration. Seek medical care for severe symptoms.' },
    ],
  },
  '/tools/protein-calculator': {
    intro: [
      'Protein supports muscle maintenance, immune function, and satiety — especially important when losing weight or staying active after 50.',
      'General guidelines range from 0.7–1.0 g per pound of body weight for active adults, with lower targets for sedentary lifestyles. Needs rise with intense training or recovery from illness.',
      'Use this protein calculator to estimate a daily gram target based on your weight and activity level.',
    ],
    faqs: [
      { q: 'How much protein do I need daily?', a: 'Sedentary adults often need 0.6–0.8 g per lb. Active adults may need 0.8–1.0 g per lb. This tool applies evidence-based ranges to your inputs.' },
      { q: 'Can you eat too much protein?', a: 'Very high intakes may stress kidneys in certain medical conditions. Most healthy adults tolerate moderate-high protein well — ask your doctor if you have kidney disease.' },
      { q: 'Best protein sources?', a: 'Lean poultry, fish, eggs, Greek yogurt, legumes, tofu, and lean beef are solid whole-food options.' },
    ],
  },
  '/tools/food-calorie-calculator': {
    intro: [
      'Tracking what you eat is the fastest way to understand calorie and nutrient intake. This tool searches 300,000+ USDA foods plus branded items via barcode scan.',
      'Log meals locally on your device — no account required. See calories, protein, carbs, and fat per serving and per day.',
      'Pair food logging with our TDEE and macro calculators to set realistic daily targets.',
    ],
    faqs: [
      { q: 'How do I track calories for free?', a: 'Search foods by name, pick serving size, and add to your daily log. Barcode scan works for many packaged US products.' },
      { q: 'Are USDA nutrition values exact?', a: 'Database values are averages. Homemade recipes and restaurant meals vary — use entries as estimates, not lab precision.' },
      { q: 'Is my food log saved?', a: 'Yes — data stays in your browser localStorage on this device. Clearing browser data removes the log.' },
    ],
  },
  '/tools/daily-calorie-calculator': {
    intro: [
      'Total daily energy expenditure (TDEE) is the calories your body burns in a typical day — resting metabolism plus movement, exercise, and daily activity.',
      'Knowing your TDEE is the foundation for weight maintenance, fat loss, or muscle gain. Eat below TDEE to lose weight; above to gain.',
      'This TDEE calculator uses the Mifflin-St Jeor equation with activity multipliers for a personalized daily calorie estimate.',
    ],
    faqs: [
      { q: 'What is TDEE?', a: 'TDEE = calories burned per day including BMR (at rest) plus activity. It is the number to eat for weight maintenance at your current activity level.' },
      { q: 'How accurate is a TDEE calculator?', a: 'Equations estimate within ~10% for most people. Track weight for 2–3 weeks and adjust calories up or down based on real results.' },
      { q: 'TDEE vs BMR — what is the difference?', a: 'BMR is calories at complete rest. TDEE includes walking, work, workouts, and all daily movement.' },
    ],
  },
  '/tools/macro-calculator': {
    intro: [
      'Macronutrients — protein, carbohydrates, and fat — make up your daily calories. Balancing macros helps with satiety, muscle retention, and blood sugar stability.',
      'Common splits include balanced (30/40/30), higher-protein (40/30/30), and lower-carb approaches. The best split depends on preferences, activity, and medical guidance.',
      'Enter your daily calorie target and preferred split to get gram targets for each macro.',
    ],
    faqs: [
      { q: 'What is a good macro split?', a: 'A balanced start is ~30% protein, 40% carbs, 30% fat. Active adults often benefit from higher protein. Diabetics or keto dieters may need different ratios — consult your care team.' },
      { q: 'Do I need to hit macros exactly?', a: 'No — aim for consistency within ~10 g per macro daily. Perfection is unnecessary; trends over weeks matter more.' },
      { q: 'How many calories per gram of macro?', a: 'Protein and carbs = 4 cal/g. Fat = 9 cal/g. Alcohol = 7 cal/g.' },
    ],
  },
  '/tools/calorie-deficit-calculator': {
    intro: [
      'A calorie deficit means eating fewer calories than you burn, leading to gradual fat loss. Safe deficits are usually 300–500 calories below TDEE — roughly 0.5–1 lb per week.',
      'Aggressive deficits can cause muscle loss, fatigue, and rebound weight gain. Slower loss is easier to sustain and safer for long-term metabolism.',
      'Enter your TDEE or use our daily calorie calculator first, then set a safe deficit and timeline below.',
    ],
    faqs: [
      { q: 'What is a safe calorie deficit?', a: 'Most adults do well with 300–500 calories below maintenance. Avoid going below 1,200 (women) or 1,500 (men) without medical supervision.' },
      { q: 'How fast should I lose weight?', a: '0.5–1 lb per week is a sustainable target for many adults. Faster loss may work short-term but is harder to maintain.' },
      { q: 'Will a deficit slow my metabolism?', a: 'Some adaptation is normal. Resistance training, adequate protein, and periodic diet breaks can help preserve muscle and energy.' },
    ],
  },
  '/tools/ideal-weight-calculator': {
    intro: [
      'Ideal weight ranges use height and BMI frameworks to suggest a healthy weight band — typically BMI 18.5–24.9 converted to pounds or kilograms.',
      'Frame size, muscle mass, and personal health history matter. A number inside the range is not mandatory if you are fit, active, and medically well.',
      'Compare results with our BMI and body fat calculators for a fuller picture.',
    ],
    faqs: [
      { q: 'What is my ideal weight for my height?', a: 'This calculator shows a range based on standard BMI healthy limits for your height — a starting point, not a strict goal.' },
      { q: 'Ideal weight vs goal weight?', a: 'Ideal weight is statistical. Goal weight should include how you feel, lab results, mobility, and your doctor\'s input.' },
      { q: 'Does frame size change ideal weight?', a: 'Larger frames may sit at the higher end of a healthy range. Clinical assessment beats any online formula.' },
    ],
  },
  '/tools/meal-planner': {
    intro: [
      'Splitting daily calories across breakfast, lunch, dinner, and snacks makes hitting nutrition targets easier. Front-loading protein at breakfast often improves satiety all day.',
      'This meal planner divides your calorie and macro targets into four meals with adjustable percentages. Export mentally or pair with our food nutrition log.',
      'Start with your TDEE and macro targets from our other calculators for best results.',
    ],
    faqs: [
      { q: 'How should I split calories across meals?', a: 'A common split is 25% breakfast, 30% lunch, 30% dinner, 15% snacks — adjust for your schedule and hunger patterns.' },
      { q: 'Should I eat three or four meals?', a: 'Meal frequency matters less than total daily calories and protein. Pick a pattern you can sustain.' },
      { q: 'Can this sync with my food log?', a: 'Save your plan locally — the food nutrition calculator can reference the same calorie target when logging meals.' },
    ],
  },
  '/tools/body-fat-calculator': {
    intro: [
      'How to calculate body fat percentage at home — use this free body fat percentage calculator with the US Navy tape method (waist, neck, hips) or a BMI-based formula when you do not have a tape measure.',
      'Body fat percentage often tells a richer story than BMI alone, especially for active adults building muscle while losing fat.',
      'Results are approximations — professional assessments are more precise. Measure at the same time of day for consistent trends.',
    ],
    faqs: [
      { q: 'How do I calculate body fat percentage at home?', a: 'The Navy method uses neck, waist, and hip (women) measurements with height and weight. Enter them below, or switch to the BMI-based tab for a rough estimate without a tape measure.' },
      { q: 'How do I count body fat percentage without special equipment?', a: 'A flexible tape measure and our Navy-method tab are enough for most people. The BMI estimate tab works if you only know height and weight.' },
      { q: 'How do I find out body fat percentage accurately?', a: 'Home tape methods are within about 3–4% for most adults. DEXA scans and hydrostatic weighing are more precise if you need clinical-level accuracy.' },
      { q: 'How often should I measure body fat?', a: 'Monthly is enough for most people. Daily fluctuations reflect water, not true fat change.' },
    ],
  },
  '/tools/walking-calorie-calculator': {
    intro: [
      'How many calories does walking burn? This free calories burned walking calculator uses your weight, walking pace, and duration — whether you track a 30-minute brisk walk, calories burned walking per km, or a full daily step goal.',
      'A 150-lb person burns roughly 100 calories per mile at moderate pace — heavier individuals burn more. Hills and faster pace increase expenditure.',
      'Enter your stats below, then try our step goal calculator or read how walking fits into a daily calorie target.',
    ],
    faqs: [
      { q: 'How many calories does walking burn?', a: 'About 0.04–0.05 calories per pound per mile at moderate pace. This calculator refines estimates using weight, speed, and duration.' },
      { q: 'How many calories burned walking per km?', a: 'Roughly 55–110 calories per km depending on weight and pace. A 160 lb adult at moderate pace burns about 80 calories per km.' },
      { q: 'How many calories will I burn walking 30 minutes?', a: 'Most adults burn 80–170 calories in 30 minutes depending on weight and speed. Brisk walking (3.5–4 mph) sits at the higher end.' },
      { q: 'How many calories does walking 4 miles burn?', a: 'Often 350–500 calories for most adults at moderate pace — use this calculator with your weight and pace for a tighter estimate.' },
      { q: 'Is walking enough for weight loss?', a: 'Walking plus a modest calorie deficit often works well. Diet drives most fat loss; walking improves adherence and cardiovascular health.' },
    ],
  },
  '/tools/bedtime-calculator': {
    intro: [
      'Sleep cycles last about 90 minutes. Waking between cycles — rather than in deep sleep — often means less grogginess.',
      'Work backward from your wake-up time to find bedtimes that align with 4, 5, or 6 full cycles, plus ~15 minutes to fall asleep.',
      'Consistent sleep and wake times support circadian rhythm, mood, and blood pressure regulation.',
    ],
    faqs: [
      { q: 'What time should I go to bed?', a: 'Depends on when you need to wake. This calculator suggests bedtimes for 4–6 sleep cycles based on your alarm time.' },
      { q: 'How many hours of sleep do adults need?', a: 'Most adults need 7–9 hours. Quality and consistency matter as much as total hours.' },
      { q: 'Why do I wake up tired after 8 hours?', a: 'Waking mid-cycle, poor sleep quality, sleep apnea, or inconsistent schedules can cause this. Talk to your doctor if fatigue persists.' },
    ],
  },
  '/tools/target-heart-rate-calculator': {
    intro: [
      'Target heart rate zones help you exercise at the right intensity — hard enough for cardiovascular benefit, safe enough for daily walks and cardio.',
      'Moderate zone is typically 50–70% of max heart rate; vigorous is 70–85%. Max HR is often estimated as 220 minus age.',
      'Use these zones when walking, cycling, or doing any sustained cardio. Always start gradually if you are new to exercise.',
    ],
    faqs: [
      { q: 'What is my target heart rate when walking?', a: 'Most adults aim for 50–70% of max HR for moderate walking cardio. This calculator shows your personal zones by age.' },
      { q: 'How do I find my max heart rate?', a: '220 − age is a common estimate. Fitness trackers and stress tests give more personalized numbers.' },
      { q: 'Should I exercise in the vigorous zone?', a: 'Short vigorous intervals can boost fitness, but moderate zones are safer for daily baseline cardio — especially when starting out.' },
    ],
  },
  '/tools/step-goal-calculator': {
    intro: [
      'Step goals personalize daily walking targets based on your current activity level and health goals. The old "10,000 steps" rule is a marketing number — your optimal count may differ.',
      'Research links 7,000+ daily steps to lower mortality risk for many adults. Adding 1,000–2,000 steps above your current average is a practical upgrade.',
      'Set a realistic target below, then follow our 7-day walking plan to build the habit.',
    ],
    faqs: [
      { q: 'How many steps should I walk per day?', a: '7,000–10,000 steps benefit most sedentary-to-moderate adults. This calculator adjusts for your baseline activity.' },
      { q: 'Do steps from daily chores count?', a: 'Yes — all steps from walking, chores, and errands count toward your daily total.' },
      { q: 'How do I increase steps safely?', a: 'Add 500–1,000 steps per week until you hit your goal. Consistency beats occasional long walks.' },
    ],
  },
  '/tools/7-day-walking-plan': {
    intro: [
      'A structured week of walking builds the habit before you worry about speed or distance records. This plan scales daily minutes based on your fitness level.',
      'Alternate moderate days with slightly easier recovery days. Pair walking with hydration and sleep for best energy.',
      'Track progress with our step goal and walking calorie calculators.',
    ],
    faqs: [
      { q: 'How long should beginners walk daily?', a: 'Start with 15–20 minutes most days. This plan progresses gradually across seven days.' },
      { q: 'Can I split walks into multiple sessions?', a: 'Yes — three 10-minute walks count the same as one 30-minute walk for most health benefits.' },
      { q: 'What if I miss a day?', a: 'Resume the next day without doubling up. Consistency over weeks matters more than perfect weeks.' },
    ],
  },
  '/tools/7-day-hydration-plan': {
    intro: [
      'Building hydration habits over a week is easier than jumping to a high water target overnight. This plan adds structured reminders and gradual intake increases.',
      'Morning water, pre-meal glasses, and post-walk refills are simple anchors that stack into a full daily routine.',
      'Know your baseline target from our water intake calculator first.',
    ],
    faqs: [
      { q: 'How do I drink more water consistently?', a: 'Tie drinking to existing habits — wake up, meals, and workouts. This 7-day plan assigns daily focus habits.' },
      { q: 'Can I drink too much water?', a: 'Rare in healthy adults, but possible with extreme intake. Spread fluids across the day rather than chugging large amounts at once.' },
      { q: 'Does the plan account for exercise?', a: 'Add 1–2 extra cups on workout days beyond your calculated baseline.' },
    ],
  },
  '/tools/7-day-sleep-plan': {
    intro: [
      'Better sleep often starts with wind-down routines, not just earlier bedtimes. This 7-day plan layers habits: light reduction, caffeine cutoffs, and consistent wake times.',
      'Small changes — dim lights at 9 pm, phone out of bedroom, fixed wake time — compound faster than single heroic efforts.',
      'Use our bedtime calculator to align sleep cycles with your morning alarm.',
    ],
    faqs: [
      { q: 'How can I improve sleep in one week?', a: 'Fix wake time first, limit late caffeine, dim screens 60 minutes before bed, and keep the room cool and dark.' },
      { q: 'What is sleep hygiene?', a: 'Daily habits that support natural sleep: schedule, environment, caffeine/alcohol timing, and pre-sleep relaxation.' },
      { q: 'When should I see a doctor about sleep?', a: 'Snoring with gasping, persistent insomnia, or daytime sleepiness despite 7+ hours warrant professional evaluation.' },
    ],
  },
  '/tools/habit-tracker': {
    intro: [
      'Tracking simple daily habits — water, movement, sleep — makes patterns visible. What gets measured often gets improved.',
      'This habit tracker saves locally on your device. No signup, no cloud sync. Check off three core wellness habits each day.',
      'Pair tracking with our 7-day plans to build streaks that last beyond the first week.',
    ],
    faqs: [
      { q: 'Which habits should I track first?', a: 'Start with 1–3 habits max: water intake, a daily walk, and a consistent bedtime. Add more only after these stick.' },
      { q: 'Is my habit data private?', a: 'Yes — stored in browser localStorage on this device only.' },
      { q: 'How long to form a habit?', a: 'Research suggests 2–10 weeks depending on the behavior. Focus on streaks, not perfection.' },
    ],
  },
};

export function getToolSeo(slug: ToolSlug): ToolSeoContent | undefined {
  return TOOL_SEO[slug];
}
