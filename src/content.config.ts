import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    languages: z.array(z.string()).optional(),
    totalExperience: z.string().optional(),
    education: z.string().optional(),
    certificates: z.array(z.string()).optional(),
    areasOfWork: z.array(z.string()).optional(),
    responsibilities: z.string().optional(),
    resume: z.string().optional(),
    otherExperience: z.string().optional(),
    consultingTopics: z.array(z.string()).optional(),
    interests: z.string().optional(),
    teachingStyle: z.string().optional(),
    photos: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const collections = { teachers };
