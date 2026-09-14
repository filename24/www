import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod/v3';

const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  authors: z.array(z.string()).optional(),
  authorSrc: z.string().optional(),
  date: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  heroImagePath: z.string().optional(),
  excerpt: z.string().optional(),
  pinned: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

const docs = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: blogSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
