import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Shorter <title> for search results (keep under ~60 characters)
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(170),
    hi: z.string(),
    category: z.enum(['AI Automation', 'Website Design', 'Logo Design']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
