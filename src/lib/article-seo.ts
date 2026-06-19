/** FAQ schema + SERP helpers for high-impression articles (from GSC). */
export type ArticleFaq = { q: string; a: string };

export const ARTICLE_FAQS: Record<string, ArticleFaq[]> = {
  'how-many-calories-does-walking-burn': [
    {
      q: 'How many calories does walking burn per mile?',
      a: 'At a moderate pace, most adults burn about 0.04–0.05 calories per pound of body weight per mile — roughly 80–120 calories per mile for a 140–180 lb person.',
    },
    {
      q: 'How many calories burned walking per km?',
      a: 'A 160 lb (73 kg) adult walking at moderate pace (~4.8 km/h) burns about 80 calories per km. Heavier people and faster paces burn more.',
    },
    {
      q: 'How many calories will I burn walking for 30 minutes?',
      a: 'A 160 lb adult at moderate pace (3 mph) burns about 110–120 calories in 30 minutes. Brisk walking (3.5–4 mph) can reach 140–170 calories in the same time.',
    },
    {
      q: 'Is walking enough for weight loss?',
      a: 'Walking plus a modest calorie deficit often works well. Diet drives most fat loss; walking improves adherence, burns extra calories, and supports heart health.',
    },
    {
      q: 'Does walking speed affect calories burned?',
      a: 'Yes. Brisk walking (3.5–4 mph) can burn 40–50% more calories than slow strolling in the same amount of time.',
    },
  ],
  'how-to-estimate-body-fat-percentage': [
    {
      q: 'How to calculate body fat percentage at home?',
      a: 'Use the US Navy tape method: measure neck, waist, and hips (women), then enter values in a body fat calculator. A BMI-based estimate works if you have no tape measure.',
    },
    {
      q: 'How to count body fat percentage without special equipment?',
      a: 'A flexible tape measure and the Navy method are the most accurate DIY option. Alternatively, use height, weight, age, and sex for a BMI-based estimate — less accurate but free.',
    },
    {
      q: 'How often should I measure body fat?',
      a: 'Monthly is enough for most people. Daily changes usually reflect water weight, not true fat loss or gain.',
    },
    {
      q: 'Is body fat percentage better than BMI?',
      a: 'They answer different questions. BMI is a quick screen; body fat estimates composition. Using both gives better context than either alone.',
    },
  ],
  'how-many-steps-per-day-for-health': [
    {
      q: 'How many steps should I walk a day?',
      a: 'Research links 7,000–10,000 daily steps with lower mortality risk for many adults. Sedentary people often benefit from building toward 7,000 first.',
    },
    {
      q: 'Is 10,000 steps a day necessary?',
      a: 'No — 10,000 was a marketing goal, not a medical rule. Health benefits appear at lower counts for many people, especially when starting from a sedentary baseline.',
    },
  ],
  'how-many-calories-do-you-need-daily': [
    {
      q: 'How many calories should I burn a day?',
      a: 'Total daily energy expenditure (TDEE) varies by age, sex, weight, and activity. Most adults need roughly 1,800–2,800 calories per day to maintain weight.',
    },
    {
      q: 'How do I find my maintenance calories?',
      a: 'Use a TDEE calculator with your height, weight, age, sex, and activity level. Track weight for 2–3 weeks and adjust calories up or down based on real results.',
    },
  ],
};

export function getArticleFaqs(articleId: string): ArticleFaq[] | undefined {
  return ARTICLE_FAQS[articleId];
}
