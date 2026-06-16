export const DAILY_TIPS = [
  'A 10-minute walk after meals can help steady blood sugar and aid digestion.',
  'Drink a glass of water first thing in the morning — before coffee or tea.',
  'Aim for protein at breakfast to stay full longer and support muscle health.',
  'Dim screens 60 minutes before bed to help your brain wind down.',
  'Stretch your hip flexors if you sit most of the day — tight hips affect posture and walking.',
  'Add one extra vegetable to lunch this week. Small changes compound.',
  'Check blood pressure at the same time daily if you monitor at home — consistency matters.',
  'Take the stairs when you can. Short bursts of movement add up.',
  'Keep a water bottle visible on your desk — you drink more when it is in sight.',
  'Social connection supports brain health as much as puzzles and reading.',
  'Warm up for 5 minutes before exercise — even a brisk walk counts as prep.',
  'Batch-cook grains and proteins on Sunday for easier healthy meals all week.',
  'If you wake at night, avoid checking the clock — it increases stress and makes sleep harder.',
  'Balance exercises reduce fall risk. Try heel-to-toe walking along a hallway.',
  'Fiber-rich foods support heart health and digestion — beans, oats, and berries count.',
  'Park farther from the entrance. Extra steps are free exercise.',
  'Magnesium-rich foods like nuts and leafy greens may support sleep quality.',
  'Replace one sugary drink this week with water or unsweetened tea.',
  'Read something new for 15 minutes — novelty keeps the mind engaged.',
  'Stand up and move every hour if you work at a desk. Set a gentle timer.',
  'Cool, dark, and quiet — three words for a better bedroom setup.',
  'Walking with a friend makes movement easier to stick with.',
  'Portion protein to about a palm-sized serving per meal as a simple guide.',
  'Deep breathing for 2 minutes can lower stress before a busy day.',
  'Track your habits for a week — awareness alone often improves behavior.',
  'Choose whole fruit over juice for more fiber and less sugar spike.',
  'Gentle yoga or stretching before bed can ease muscle tension.',
  'Know your medications and whether they affect hydration or sleep.',
  'Celebrate small wins. Consistency beats perfection every time.',
  'Plan tomorrow’s walk tonight — lay out shoes by the door.',
] as const;

export function getDailyTip(date = new Date()): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}
