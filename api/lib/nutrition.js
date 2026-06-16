const BY_ID = {
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

const BY_NUMBER = {
  208: 'calories',
  203: 'protein',
  204: 'totalFat',
  606: 'saturatedFat',
  605: 'transFat',
  601: 'cholesterol',
  307: 'sodium',
  205: 'totalCarbs',
  291: 'fiber',
  269: 'totalSugars',
  539: 'addedSugars',
  328: 'vitaminD',
  301: 'calcium',
  303: 'iron',
  306: 'potassium',
};

export function emptyNutrition() {
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

export function parseNutrients(foodNutrients, multiplier = 1) {
  const out = emptyNutrition();
  for (const n of foodNutrients ?? []) {
    if (n.value == null || Number.isNaN(n.value)) continue;
    const key = (n.nutrientId != null ? BY_ID[n.nutrientId] : undefined) ?? BY_NUMBER[n.nutrientNumber];
    if (!key) continue;
    out[key] = Math.round(n.value * multiplier * 100) / 100;
  }
  return out;
}

export function parseUsdaFood(food, multiplier = 1) {
  return {
    fdcId: Number(food.fdcId),
    description: String(food.description ?? 'Unknown food'),
    brandOwner: typeof food.brandOwner === 'string' ? food.brandOwner : undefined,
    gtinUpc: typeof food.gtinUpc === 'string' ? food.gtinUpc : undefined,
    dataType: String(food.dataType ?? ''),
    servingSize: typeof food.servingSize === 'number' ? food.servingSize : null,
    servingSizeUnit: typeof food.servingSizeUnit === 'string' ? food.servingSizeUnit : null,
    householdServing:
      typeof food.householdServingFullText === 'string' ? food.householdServingFullText : undefined,
    nutrition: parseNutrients(food.foodNutrients, multiplier),
  };
}
