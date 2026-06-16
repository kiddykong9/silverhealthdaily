import { parseUsdaFood, type ParsedFood } from './nutrition';

const USDA_BASE = 'https://api.nal.usda.gov/fdc/v1';

function apiKey(): string {
  return process.env.USDA_API_KEY ?? 'DEMO_KEY';
}

type SearchOptions = {
  page?: number;
  pageSize?: number;
  includeBranded?: boolean;
};

export async function searchFoods(
  query: string,
  { page = 1, pageSize = 20, includeBranded = true }: SearchOptions = {},
): Promise<{ foods: ParsedFood[]; totalHits: number; page: number }> {
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

  const data = (await res.json()) as {
    foods?: Record<string, unknown>[];
    totalHits?: number;
    currentPage?: number;
  };

  return {
    foods: (data.foods ?? []).map((f) => parseUsdaFood(f)),
    totalHits: data.totalHits ?? 0,
    page: data.currentPage ?? page,
  };
}

export async function getFoodById(fdcId: number): Promise<ParsedFood> {
  const params = new URLSearchParams({ api_key: apiKey() });
  const res = await fetch(`${USDA_BASE}/food/${fdcId}?${params}`);
  if (!res.ok) throw new Error(`USDA food lookup failed (${res.status})`);
  const data = (await res.json()) as Record<string, unknown>;
  return parseUsdaFood(data);
}
