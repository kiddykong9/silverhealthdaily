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

/** Normalize UPC/EAN to digits only; USDA branded foods often use 12–14 digit GTIN. */
export function normalizeBarcode(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length < 8) return null;
  if (digits.length === 11) return `0${digits}`;
  if (digits.length === 12 || digits.length === 13 || digits.length === 14) return digits;
  return digits.length >= 8 ? digits : null;
}

export async function searchByBarcode(rawBarcode) {
  const gtinUpc = normalizeBarcode(rawBarcode);
  if (!gtinUpc) throw new Error('Enter a valid 8–14 digit barcode (UPC/EAN).');

  const res = await fetch(`${USDA_BASE}/foods/search?api_key=${apiKey()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: gtinUpc,
      dataType: ['Branded'],
      pageSize: 10,
      pageNumber: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`USDA barcode lookup failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const foods = (data.foods ?? []).map((f) => parseUsdaFood(f));

  const exact = foods.filter(
    (f) => String(f.gtinUpc ?? '').replace(/\D/g, '').endsWith(gtinUpc.slice(-12)),
  );

  return {
    foods: exact.length > 0 ? exact : foods,
    gtinUpc,
    totalHits: data.totalHits ?? foods.length,
  };
}
