import { parseUsdaFood } from './nutrition.js';

const USDA_BASE = 'https://api.nal.usda.gov/fdc/v1';

function apiKey() {
  return process.env.USDA_API_KEY || 'DEMO_KEY';
}

export async function searchFoods(query, { page = 1, pageSize = 20, includeBranded = true } = {}) {
  const dataType = includeBranded
    ? ['Foundation', 'SR Legacy', 'Survey (FNDDS)', 'Branded']
    : ['Foundation', 'SR Legacy', 'Survey (FNDDS)'];

  const res = await fetch(`${USDA_BASE}/foods/search?api_key=${apiKey()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, pageSize, pageNumber: page, dataType }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`USDA search failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return {
    foods: (data.foods ?? []).map((f) => parseUsdaFood(f)),
    totalHits: data.totalHits ?? 0,
    page: data.currentPage ?? page,
  };
}

export async function getFoodById(fdcId) {
  const params = new URLSearchParams({ api_key: apiKey() });
  const res = await fetch(`${USDA_BASE}/food/${fdcId}?${params}`);
  if (!res.ok) throw new Error(`USDA food lookup failed (${res.status})`);
  const data = await res.json();
  return parseUsdaFood(data);
}
