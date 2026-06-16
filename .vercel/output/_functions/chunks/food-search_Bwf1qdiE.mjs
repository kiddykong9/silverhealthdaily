import { s as searchFoods } from './usda-api_D7xPzfyV.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const q = url.searchParams.get("q")?.trim() ?? "";
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const includeBranded = url.searchParams.get("branded") !== "0";
  if (q.length < 2) {
    return Response.json({ error: "Enter at least 2 characters to search." }, { status: 400 });
  }
  try {
    const result = await searchFoods(q, { page, pageSize: 25, includeBranded });
    return Response.json(result, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Search failed";
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
