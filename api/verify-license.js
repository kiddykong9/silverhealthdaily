/**
 * Verify a Gumroad license key (unique per purchase).
 * Requires GUMROAD_PRODUCT_ID in Vercel env (not public).
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const productId = process.env.GUMROAD_PRODUCT_ID;
  if (!productId) {
    return res.status(503).json({ error: 'License verification is not configured yet.' });
  }

  let licenseKey = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    licenseKey = String(body?.licenseKey ?? '').trim();
  } catch {
    licenseKey = '';
  }

  if (!licenseKey) {
    return res.status(400).json({ error: 'Enter your license key from your Gumroad purchase email.' });
  }

  try {
    const params = new URLSearchParams();
    params.append('product_id', productId);
    params.append('license_key', licenseKey);
    params.append('increment_uses_count', 'false');

    const gumroadRes = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await gumroadRes.json();

    if (!data.success) {
      return res.status(403).json({
        error: data.message || 'Invalid license key. Check your Gumroad purchase email.',
      });
    }

    const purchase = data.purchase ?? {};
    if (purchase.refunded) {
      return res.status(403).json({ error: 'This purchase was refunded.' });
    }
    if (purchase.chargebacked) {
      return res.status(403).json({ error: 'This purchase is no longer valid.' });
    }
    if (purchase.disputed) {
      return res.status(403).json({ error: 'This purchase is under dispute.' });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Could not verify license. Try again in a moment.' });
  }
}
