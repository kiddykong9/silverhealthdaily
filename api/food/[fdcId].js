import { getFoodById } from '../lib/usda-api.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fdcId = Number(req.query.fdcId);
  if (!fdcId || Number.isNaN(fdcId)) {
    return res.status(400).json({ error: 'Invalid food ID' });
  }

  try {
    const food = await getFoodById(fdcId);
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json(food);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Lookup failed';
    return res.status(502).json({ error: message });
  }
}
