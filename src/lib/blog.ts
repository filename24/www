import { source } from './source';

export interface BlogCardItem {
  url: string;
  title: string;
  date: string;
  updatedAt?: string | null;
  excerpt?: string | null;
  authors: string[];
  imageSrc?: string | null;
  imageAlt?: string | null;
  tags?: string[];
  pinned?: boolean;
}

type BlogPage = ReturnType<typeof source.getPages>[number];

function toISO(value: unknown): string {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

export function toCardItem(page: BlogPage): BlogCardItem {
  const data = page.data as typeof page.data & {
    authors?: string[];
    updatedAt?: unknown;
    excerpt?: string;
    heroImagePath?: string;
    tags?: string[];
    pinned?: boolean;
  };

  return {
    url: page.url,
    title: page.data.title,
    date: toISO(data.date),
    updatedAt: toISO(data.updatedAt) || null,
    excerpt: data.excerpt ?? page.data.description ?? null,
    authors: Array.isArray(data.authors) ? data.authors : [],
    imageSrc: data.heroImagePath ?? null,
    imageAlt: page.data.title,
    tags: data.tags,
    pinned: data.pinned,
  };
}

function timeOf(value: unknown): number {
  if (!value) return 0;
  const date = value instanceof Date ? value : new Date(String(value));
  const time = date.getTime();
  return Number.isNaN(time) ? 0 : time;
}

/** Newest first, pinned posts surface ahead of the feed. */
export function getAllPosts(): BlogCardItem[] {
  const pages = [...source.getPages()].sort(
    (a, b) => timeOf(b.data.date) - timeOf(a.data.date),
  );
  const items = pages.map(toCardItem);
  return [
    ...items.filter((item) => item.pinned),
    ...items.filter((item) => !item.pinned),
  ];
}

export function getUniqueTags(items: BlogCardItem[]): string[] {
  return [
    ...new Set(
      items.flatMap((item) => item.tags ?? []).filter((tag): tag is string =>
        Boolean(tag),
      ),
    ),
  ];
}

/** Posts sharing the most tags with the current one, excluding itself. */
export function getRelatedPosts(
  current: { url: string; tags?: string[] },
  items: BlogCardItem[],
  count = 3,
): BlogCardItem[] {
  const tags = new Set(current.tags ?? []);
  return items
    .filter((item) => item.url !== current.url)
    .map((item) => ({
      item,
      score: (item.tags ?? []).filter((tag) => tags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || +new Date(b.item.date || 0) - +new Date(a.item.date || 0))
    .slice(0, count)
    .map(({ item }) => item);
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatTag(tag: string): string {
  if (tag === 'show-all') return 'Show all';
  return tag.replace(/-/g, ' ');
}
