import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().transform((s) => new Date(s)),
    updated: z.string().optional(),
    hub: z.enum(["money", "ai-tools", "family"]).optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hero: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { posts };
