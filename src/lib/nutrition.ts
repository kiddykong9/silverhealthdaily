/** USDA FoodData Central nutrient parsing and display helpers. */

export type NutritionFacts = {
  calories: number | null;
  protein: number | null;
  totalFat: number | null;
  saturatedFat: number | null;
  transFat: number | null;
  cholesterol: number | null;
  sodium: number | null;
  totalCarbs: number | null;
  fiber: number | null;
  totalSugars: number | null;
  addedSugars: number | null;
  vitaminD: number | null;
  calcium: number | null;
  iron: number | null;
  potassium: number | null;
};

export type ParsedFood = {
  fdcId: number;
  description: string;
  brandOwner?: string;
  dataType: string;
  servingSize: number | null;
  servingSizeUnit: string | null;
  householdServing?: string;
  nutrition: NutritionFacts;
};

type UsdaNutrient = {
  nutrientId?: number;
  nutrientNumber?: string;
  nutrientName?: string;
  unitName?: string;
  value?: number;
};

const BY_ID: Record<number, keyof NutritionFacts> = {
  1008: 'calories',
  1003: 'protein',
  1004: 'totalFat',
  1258: 'saturatedFat',
  1257: 'transFat',
  1253: 'cholesterol',
  1093: 'sodium',
  1005: 'totalCarbs',
  1079: 'fiber',
  2000: 'totalSugars',
  1235: 'addedSugars',
  1114: 'vitaminD',
  1087: 'calcium',
  1089: 'iron',
  1092: 'potassium',
};

const BY_NUMBER: Record<string, keyof NutritionFacts> = {
  '208': 'calories',
  '203': 'protein',
  '204': 'totalFat',
  '606': 'saturatedFat',
  '605': 'transFat',
  '601': 'cholesterol',
  '307': 'sodium',
  '205': 'totalCarbs',
  '291': 'fiber',
  '269': 'totalSugars',
  '539': 'addedSugars',
  '328': 'vitaminD',
  '301': 'calcium',
  '303': 'iron',
  '306': 'potassium',
};

export function emptyNutrition(): NutritionFacts {
  return {
    calories: null,
    protein: null,
    totalFat: null,
    saturatedFat: null,
    transFat: null,
    cholesterol: null,
    sodium: null,
    totalCarbs: null,
    fiber: null,
    totalSugars: null,
    addedSugars: null,
    vitaminD: null,
    calcium: null,
    iron: null,
    potassium: null,
  };
}

export function parseNutrients(
  foodNutrients: UsdaNutrient[] | undefined,
  multiplier = 1,
): NutritionFacts {
  const out = emptyNutrition();

  for (const n of foodNutrients ?? []) {
    if (n.value == null || Number.isNaN(n.value)) continue;
    const key =
      (n.nutrientId != null ? BY_ID[n.nutrientId] : undefined) ??
      (n.nutrientNumber ? BY_NUMBER[n.nutrientNumber] : undefined);
    if (!key) continue;
    const scaled = Math.round(n.value * multiplier * 100) / 100;
    out[key] = scaled;
  }

  return out;
}

export function parseUsdaFood(food: Record<string, unknown>, multiplier = 1): ParsedFood {
  const servingSize = typeof food.servingSize === 'number' ? food.servingSize : null;
  const servingSizeUnit = typeof food.servingSizeUnit === 'string' ? food.servingSizeUnit : null;

  return {
    fdcId: Number(food.fdcId),
    description: String(food.description ?? 'Unknown food'),
    brandOwner: typeof food.brandOwner === 'string' ? food.brandOwner : undefined,
    dataType: String(food.dataType ?? ''),
    servingSize,
    servingSizeUnit,
    householdServing:
      typeof food.householdServingFullText === 'string' ? food.householdServingFullText : undefined,
    nutrition: parseNutrients(food.foodNutrients as UsdaNutrient[], multiplier),
  };
}

export function sumNutrition(items: NutritionFacts[]): NutritionFacts {
  const out = emptyNutrition();
  const keys = Object.keys(out) as (keyof NutritionFacts)[];

  for (const item of items) {
    for (const key of keys) {
      if (item[key] != null) {
        out[key] = Math.round(((out[key] ?? 0) + item[key]!) * 100) / 100;
      }
    }
  }

  return out;
}

export type NutritionRow = {
  key: keyof NutritionFacts;
  label: string;
  unit: string;
  indent?: boolean;
  bold?: boolean;
};

export const NUTRITION_LABEL_ROWS: NutritionRow[] = [
  { key: 'calories', label: 'Calories', unit: 'kcal', bold: true },
  { key: 'totalFat', label: 'Total Fat', unit: 'g', bold: true },
  { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g', indent: true },
  { key: 'transFat', label: 'Trans Fat', unit: 'g', indent: true },
  { key: 'cholesterol', label: 'Cholesterol', unit: 'mg', bold: true },
  { key: 'sodium', label: 'Sodium', unit: 'mg', bold: true },
  { key: 'totalCarbs', label: 'Total Carbohydrate', unit: 'g', bold: true },
  { key: 'fiber', label: 'Dietary Fiber', unit: 'g', indent: true },
  { key: 'totalSugars', label: 'Total Sugars', unit: 'g', indent: true },
  { key: 'addedSugars', label: 'Added Sugars', unit: 'g', indent: true },
  { key: 'protein', label: 'Protein', unit: 'g', bold: true },
  { key: 'vitaminD', label: 'Vitamin D', unit: 'mcg' },
  { key: 'calcium', label: 'Calcium', unit: 'mg' },
  { key: 'iron', label: 'Iron', unit: 'mg' },
  { key: 'potassium', label: 'Potassium', unit: 'mg' },
];

export function formatNutrientValue(key: keyof NutritionFacts, value: number | null): string {
  if (value == null) return '—';
  if (key === 'calories') return String(Math.round(value));
  if (value < 0.01 && value > 0) return '<0.01';
  return String(value);
}

export function servingLabel(food: ParsedFood): string {
  if (food.householdServing) return food.householdServing;
  if (food.servingSize && food.servingSizeUnit) {
    return `${food.servingSize} ${food.servingSizeUnit}`;
  }
  return '1 serving';
}
