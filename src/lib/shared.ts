import { createGetUrl } from 'fumadocs-core/source';

export const appName = '__filename';
export const docsRoute = '/blog';
export const docsImageRoute = '/og/blog';
export const docsContentRoute = '/llms.mdx/blog';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'filename24',
  repo: 'www',
  branch: 'stable',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
