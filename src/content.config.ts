import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'nutrition',
      'fitness',
      'sleep',
      'heart-health',
      'brain-memory',
      'wellness',
    ]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    readTime: z.number(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
