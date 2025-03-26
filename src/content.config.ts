import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
// import { glob } from 'astro/loaders';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });
const i18n = defineCollection({
  loader: i18nLoader(),
  schema: i18nSchema({
    extend: z.object({
      'custom.label': z.string().optional(),
    }),
  }),
});
// 용어집 컬렉션 자동 구성
const glossary = defineCollection({
  type: 'content',
  schema: docsSchema({
    extend: z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  }),
});


export const collections = { docs, i18n, glossary };