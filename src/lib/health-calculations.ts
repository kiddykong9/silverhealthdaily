export type Sex = 'male' | 'female';
export type MacroStyle = 'balanced' | 'high-protein' | 'low-carb' | 'mediterranean';

const MACRO_SPLITS: Record<MacroStyle, [number, number, number]> = {
  balanced: [0.3, 0.4, 0.3],
  'high-protein': [0.4, 0.3, 0.3],
  'low-carb': [0.35, 0.25, 0.4],
  mediterranean: [0.25, 0.45, 0.3],
};

const PROTEIN_G_PER_KG: Record<string, number> = {
  sedentary: 0.8,
  light: 1.0,
  moderate: 1.2,
  active: 1.2,
  very_active: 1.4,
};

export function kgFromLb(lb: number) {
  return lb * 0.453592;
}

export function cmFromImperial(ft: number, inches: number) {
  return (ft * 12 + inches) * 2.54;
}

export function calcBmi(kg: number, cm: number) {
  const bmi = kg / (cm / 100) ** 2;
  let category = 'Normal weight range for most adults.';
  if (bmi < 18.5) category = 'Underweight range — discuss with your provider if needed.';
  else if (bmi < 25) category = 'Normal weight range for most adults.';
  else if (bmi < 30) category = 'Overweight range — lifestyle changes may help.';
  else category = 'Obesity range — a clinician can help with a personalized plan.';
  return { bmi: Math.round(bmi * 10) / 10, category };
}

export function calcBmr(sex: Sex, kg: number, cm: number, age: number) {
  return sex === 'male' ? 10 * kg + 6.25 * cm - 5 * age + 5 : 10 * kg + 6.25 * cm - 5 * age - 161;
}

export function activityMultiplier(level: string) {
  const map: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  return map[level] ?? 1.375;
}

export function calcTdee(sex: Sex, kg: number, cm: number, age: number, activityLevel: string) {
  const bmr = calcBmr(sex, kg, cm, age);
  const tdee = Math.round(bmr * activityMultiplier(activityLevel));
  return { bmr: Math.round(bmr), tdee };
}

export function calcIdealWeightRange(cm: number) {
  const heightM = cm / 100;
  const low = Math.round(18.5 * heightM * heightM);
  const high = Math.round(24.9 * heightM * heightM);
  return { lowKg: low, highKg: high };
}

export function calcDeficit(tdee: number, goal: 'maintain' | 'lose_slow' | 'lose_standard') {
  if (goal === 'maintain') return { targetCalories: tdee, dailyDeficit: 0, weeklyLossKg: 0 };
  const kgPerWeek = goal === 'lose_slow' ? 0.25 : 0.5;
  const dailyDeficit = Math.round((kgPerWeek * 7700) / 7);
  const target = Math.max(1200, tdee - dailyDeficit);
  return { targetCalories: target, dailyDeficit, weeklyLossKg: kgPerWeek };
}

export function calcMacros(calories: number, style: MacroStyle) {
  const [pPct, cPct, fPct] = MACRO_SPLITS[style];
  return {
    proteinG: Math.round((calories * pPct) / 4),
    carbsG: Math.round((calories * cPct) / 4),
    fatG: Math.round((calories * fPct) / 9),
    splitLabel: `${Math.round(pPct * 100)}% protein · ${Math.round(cPct * 100)}% carbs · ${Math.round(fPct * 100)}% fat`,
  };
}

export function calcProtein(kg: number, activityLevel: string) {
  const mult = PROTEIN_G_PER_KG[activityLevel] ?? 1.0;
  const grams = Math.round(kg * mult);
  return { grams, range: `${Math.round(kg * (mult - 0.1))}–${Math.round(kg * (mult + 0.1))} g` };
}

export function calcWaterOz(weightLb: number, activityLevel: string) {
  const mult =
    activityLevel === 'sedentary' ? 1 : activityLevel === 'light' ? 1.1 : activityLevel === 'moderate' ? 1.2 : 1.3;
  const oz = Math.round(weightLb * 0.5 * mult);
  const liters = (oz * 0.0295735).toFixed(1);
  const glasses = Math.round(oz / 8);
  return { oz, liters, glasses };
}

export function calcStepGoal(current: number, goal: 'maintain' | 'improve' | 'active' | 'tenk') {
  let target = current;
  if (goal === 'maintain') target = current;
  else if (goal === 'improve') target = Math.round(current * 1.15);
  else if (goal === 'active') target = Math.max(8000, Math.round(current * 1.2));
  else target = 10000;
  target = Math.min(15000, Math.max(3000, Math.round(target / 250) * 250));
  return target;
}

export function calcHeartRate(age: number, resting = 0) {
  let maxHr = 220 - age;
  if (resting > 0) maxHr = 208 - 0.7 * age;
  return {
    maxHr: Math.round(maxHr),
    moderate: `${Math.round(maxHr * 0.5)}–${Math.round(maxHr * 0.7)} bpm`,
    vigorous: `${Math.round(maxHr * 0.7)}–${Math.round(maxHr * 0.85)} bpm`,
  };
}

export function calcWalkingCalories(weightKg: number, minutes: number, paceMph = 3) {
  const metMap: Record<number, number> = { 2: 2.8, 2.5: 3, 3: 3.5, 3.5: 4.3, 4: 5 };
  const met = metMap[paceMph] ?? 3.5;
  const hours = minutes / 60;
  const calories = Math.round(met * weightKg * hours);
  const miles = (paceMph * hours).toFixed(2);
  return { calories, miles };
}

export function calcBedtimes(wakeHour: number, wakeMinute: number, ampm: 'AM' | 'PM', fallAsleepMin = 15) {
  const to24 = (h: number) => {
    if (ampm === 'AM') return h === 12 ? 0 : h;
    return h === 12 ? 12 : h + 12;
  };
  const wake = new Date();
  wake.setHours(to24(wakeHour), wakeMinute, 0, 0);
  const options: { time: string; label: string }[] = [];
  for (let cycles = 6; cycles >= 4; cycles--) {
    const total = cycles * 90 + fallAsleepMin;
    const bed = new Date(wake.getTime() - total * 60000);
    const hours = (cycles * 90) / 60;
    options.push({
      time: bed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      label: `~${hours}h sleep (${cycles} cycles)`,
    });
  }
  return options;
}

export function mealSplit(calories: number, macros: ReturnType<typeof calcMacros>) {
  return {
    breakfast: { cal: Math.round(calories * 0.25), protein: Math.round(macros.proteinG * 0.25) },
    lunch: { cal: Math.round(calories * 0.3), protein: Math.round(macros.proteinG * 0.3) },
    dinner: { cal: Math.round(calories * 0.3), protein: Math.round(macros.proteinG * 0.3) },
    snacks: { cal: Math.round(calories * 0.15), protein: Math.round(macros.proteinG * 0.15) },
  };
}
