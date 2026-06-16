import type { VercelRequest, VercelResponse } from '@vercel/node';
import { searchFoods } from './_lib/usda-api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const q = String(req.query.q ?? '').trim();
  const page = Math.max(1, Number(req.query.page ?? 1));
  const includeBranded = req.query.branded !== '0';

  if (q.length < 2) {
    return res.status(400).json({ error: 'Enter at least 2 characters to search.' });
  }

  try {
    const result = await searchFoods(q, { page, pageSize: 25, includeBranded });
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Search failed';
    return res.status(502).json({ error: message });
  }
}
