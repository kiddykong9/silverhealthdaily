import { g as getFoodById } from './usda-api_D7xPzfyV.mjs';

const prerender = false;
const GET = async ({ params }) => {
  const fdcId = Number(params.fdcId);
  if (!fdcId || Number.isNaN(fdcId)) {
    return Response.json({ error: "Invalid food ID" }, { status: 400 });
  }
  try {
    const food = await getFoodById(fdcId);
    return Response.json(food, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lookup failed";
    return Response.json({ error: message }, { status: 502 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
