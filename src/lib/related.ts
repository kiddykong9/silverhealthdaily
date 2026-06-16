import type { CollectionEntry } from 'astro:content';
import type { CategorySlug } from './site';

export function getRelatedArticles(
  current: CollectionEntry<'articles'>,
  all: CollectionEntry<'articles'>[],
  limit = 3,
): CollectionEntry<'articles'>[] {
  const currentKeywords = new Set(current.data.keywords.map((k) => k.toLowerCase()));
  const scored = all
    .filter((a) => a.id !== current.id)
    .map((a) => {
      let score = 0;
      if (a.data.category === current.data.category) score += 3;
      for (const kw of a.data.keywords) {
        if (currentKeywords.has(kw.toLowerCase())) score += 2;
      }
      for (const kw of a.data.keywords) {
        const words = kw.toLowerCase().split(/\s+/);
        for (const w of words) {
          if (w.length > 4 && current.data.title.toLowerCase().includes(w)) score += 1;
        }
      }
      return { article: a, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.article.data.publishDate.valueOf() - a.article.data.publishDate.valueOf());

  if (scored.length >= limit) {
    return scored.slice(0, limit).map((x) => x.article);
  }

  const picked = new Set(scored.map((x) => x.article.id));
  const fallback = all
    .filter((a) => a.id !== current.id && !picked.has(a.id))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return [...scored.map((x) => x.article), ...fallback].slice(0, limit);
}

export function articlesByIds(
  all: CollectionEntry<'articles'>[],
  ids: string[],
): CollectionEntry<'articles'>[] {
  const map = new Map(all.map((a) => [a.id, a]));
  return ids.map((id) => map.get(id)).filter(Boolean) as CollectionEntry<'articles'>[];
}

export function articlesByCategory(
  all: CollectionEntry<'articles'>[],
  category: CategorySlug,
  limit = 5,
  excludeId?: string,
): CollectionEntry<'articles'>[] {
  return all
    .filter((a) => a.data.category === category && a.id !== excludeId)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
    .slice(0, limit);
}
