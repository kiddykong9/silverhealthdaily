export const prerender = false;

import type { APIRoute } from 'astro';
import { getFoodById } from '../../../lib/usda-api';

export const GET: APIRoute = async ({ params }) => {
  const fdcId = Number(params.fdcId);
  if (!fdcId || Number.isNaN(fdcId)) {
    return Response.json({ error: 'Invalid food ID' }, { status: 400 });
  }

  try {
    const food = await getFoodById(fdcId);
    return Response.json(food, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Lookup failed';
    return Response.json({ error: message }, { status: 502 });
  }
};
