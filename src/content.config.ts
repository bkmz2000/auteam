import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  heading: z.string().optional(),
  lead: z.string().optional(),
  heroEyebrow: z.string().optional(),
  heroAsideTitle: z.string().optional(),
  heroAsideText: z.string().optional(),
  ctaPrimaryLabel: z.string().optional(),
  ctaPrimaryUrl: z.string().optional(),
  ctaSecondaryLabel: z.string().optional(),
  ctaSecondaryUrl: z.string().optional(),
  slug: z.string().optional(),
  language: z.array(z.string()).optional(),
}).passthrough();

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: pageSchema,
});

const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    languages: z.array(z.string()).default([]),
    totalExperience: z.string().optional(),
    education: z.string().optional(),
    certificates: z.array(z.string()).default([]),
    areasOfWork: z.array(z.string()).default([]),
    responsibilities: z.string().optional(),
    resume: z.string().optional(),
    otherExperience: z.string().optional(),
    consultingTopics: z.array(z.string()).default([]),
    interests: z.string().optional(),
    teachingStyle: z.string().optional(),
    photos: z.array(z.string()).default([]),
    isActive: z.boolean().default(true),
  }).passthrough(),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    ageGroup: z.union([
      z.array(z.enum(['children', 'teens', 'adults'])),
      z.enum(['children', 'teens', 'adults']),
    ]).default([]),
    language: z.array(z.string()).default([]),
    category: z.string().optional(),
    teacherName: z.string().optional(),
    priceRub: z.number().optional(),
    priceDram: z.number().optional(),
    duration: z.string().optional(),
    signUpUrl: z.string().optional(),
    isActive: z.boolean().default(true),
    pricing: z.object({
      price: z.number().optional(),
      currency: z.enum(['rub', 'amd']).optional(),
      convertedPrice: z.number().optional(),
      convertedCurrency: z.enum(['rub', 'amd']).optional(),
    }).optional(),
    format: z.object({
      type: z.string().optional(),
      duration: z.number().optional(),
      lessonsPerWeek: z.number().optional(),
      minAge: z.number().optional(),
      maxAge: z.number().optional(),
      maxStudents: z.number().optional(),
    }).optional(),
    schedule: z.object({
      days: z.string().optional(),
      time: z.string().optional(),
      location: z.string().optional(),
    }).optional(),
    photo: z.object({ src: z.string(), alt: z.string().optional() }).optional(),
  }).passthrough(),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    ageGroup: z.array(z.string()).default([]),
    language: z.array(z.string()).default([]),
    order: z.number().default(0),
  }).passthrough(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    isPublished: z.boolean().default(true),
    language: z.array(z.string()).default([]),
  }).passthrough(),
});

const feedback = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/feedback' }),
  schema: z.object({
    type: z.string().optional(),
    author: z.string(),
    content: z.string().optional(),
    isPublic: z.boolean().default(false),
    date: z.coerce.date().optional(),
  }).passthrough(),
});

const materials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/materials' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    publishedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    attachments: z.array(z.object({
      title: z.string(),
      url: z.string(),
    })).default([]),
  }).passthrough(),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    organizationName: z.string().optional(),
    siteName: z.string().optional(),
    mission: z.string().optional(),
    footerDescription: z.string().optional(),
    contactEmail: z.string().optional(),
    telegramUrl: z.string().optional(),
    city: z.string().optional(),
    nav: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).default([]),
  }).passthrough(),
});

export const collections = { pages, teachers, courses, categories, news, feedback, materials, settings };
