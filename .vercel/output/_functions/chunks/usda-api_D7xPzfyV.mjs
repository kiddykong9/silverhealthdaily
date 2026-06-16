const BY_ID = {
  1008: "calories",
  1003: "protein",
  1004: "totalFat",
  1258: "saturatedFat",
  1257: "transFat",
  1253: "cholesterol",
  1093: "sodium",
  1005: "totalCarbs",
  1079: "fiber",
  2e3: "totalSugars",
  1235: "addedSugars",
  1114: "vitaminD",
  1087: "calcium",
  1089: "iron",
  1092: "potassium"
};
const BY_NUMBER = {
  "208": "calories",
  "203": "protein",
  "204": "totalFat",
  "606": "saturatedFat",
  "605": "transFat",
  "601": "cholesterol",
  "307": "sodium",
  "205": "totalCarbs",
  "291": "fiber",
  "269": "totalSugars",
  "539": "addedSugars",
  "328": "vitaminD",
  "301": "calcium",
  "303": "iron",
  "306": "potassium"
};
function emptyNutrition() {
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
    potassium: null
  };
}
function parseNutrients(foodNutrients, multiplier = 1) {
  const out = emptyNutrition();
  for (const n of foodNutrients ?? []) {
    if (n.value == null || Number.isNaN(n.value)) continue;
    const key = (n.nutrientId != null ? BY_ID[n.nutrientId] : void 0) ?? (n.nutrientNumber ? BY_NUMBER[n.nutrientNumber] : void 0);
    if (!key) continue;
    const scaled = Math.round(n.value * multiplier * 100) / 100;
    out[key] = scaled;
  }
  return out;
}
function parseUsdaFood(food, multiplier = 1) {
  const servingSize = typeof food.servingSize === "number" ? food.servingSize : null;
  const servingSizeUnit = typeof food.servingSizeUnit === "string" ? food.servingSizeUnit : null;
  return {
    fdcId: Number(food.fdcId),
    description: String(food.description ?? "Unknown food"),
    brandOwner: typeof food.brandOwner === "string" ? food.brandOwner : void 0,
    dataType: String(food.dataType ?? ""),
    servingSize,
    servingSizeUnit,
    householdServing: typeof food.householdServingFullText === "string" ? food.householdServingFullText : void 0,
    nutrition: parseNutrients(food.foodNutrients, multiplier)
  };
}

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";
function apiKey() {
  return process.env.USDA_API_KEY ?? "DEMO_KEY";
}
async function searchFoods(query, { page = 1, pageSize = 20, includeBranded = true } = {}) {
  const dataType = includeBranded ? ["Foundation", "SR Legacy", "Survey (FNDDS)", "Branded"] : ["Foundation", "SR Legacy", "Survey (FNDDS)"];
  const res = await fetch(`${USDA_BASE}/foods/search?api_key=${apiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      pageSize,
      pageNumber: page,
      dataType
    })
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`USDA search failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  return {
    foods: (data.foods ?? []).map((f) => parseUsdaFood(f)),
    totalHits: data.totalHits ?? 0,
    page: data.currentPage ?? page
  };
}
async function getFoodById(fdcId) {
  const params = new URLSearchParams({ api_key: apiKey() });
  const res = await fetch(`${USDA_BASE}/food/${fdcId}?${params}`);
  if (!res.ok) {
    throw new Error(`USDA food lookup failed (${res.status})`);
  }
  const data = await res.json();
  return parseUsdaFood(data);
}

export { getFoodById as g, searchFoods as s };
