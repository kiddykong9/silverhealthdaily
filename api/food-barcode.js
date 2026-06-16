import { searchByBarcode } from './lib/usda-api.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const upc = String(req.query.upc ?? '').trim();
  if (!upc) {
    return res.status(400).json({ error: 'Enter a barcode (UPC/EAN).' });
  }

  try {
    const result = await searchByBarcode(upc);
    if (result.foods.length === 0) {
      return res.status(404).json({ error: 'No product found for this barcode. Try searching by name instead.' });
    }
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Barcode lookup failed';
    return res.status(502).json({ error: message });
  }
}
