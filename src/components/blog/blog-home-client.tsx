'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BlogGrid } from './blog-grid';
import { CategoryTagFilter, SHOW_ALL } from './category-tag-filter';
import type { BlogCardItem } from '@/lib/blog';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 12;

function parsePage(value: string | null): number {
  const parsed = Number.parseInt(value ?? '1', 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

function Pagination({
  currentCategory,
  currentPage,
  totalPages,
}: {
  currentCategory: string;
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const go = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory !== SHOW_ALL) params.set('tag', currentCategory);
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog pages" className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => go(currentPage - 1)}
        className="rounded-full border border-[#6c7086]/60 px-4 py-1.5 text-sm text-[#cdd6f4] transition-colors hover:border-[#89b4fa]/60 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => go(page)}
          className={cn(
            'size-9 rounded-full text-sm transition-colors',
            'focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none',
            page === currentPage
              ? 'bg-[#89b4fa] font-semibold text-[#1e1e2e]'
              : 'text-[#9399b2] hover:bg-[#89b4fa]/10 hover:text-white',
          )}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => go(currentPage + 1)}
        className="rounded-full border border-[#6c7086]/60 px-4 py-1.5 text-sm text-[#cdd6f4] transition-colors hover:border-[#89b4fa]/60 hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export function BlogHomeClient({
  items,
  uniqueTags,
}: {
  items: BlogCardItem[];
  uniqueTags: string[];
}) {
  const searchParams = useSearchParams();
  const tagFromQuery = searchParams.get('tag') ?? undefined;
  const validTags = new Set(uniqueTags);
  const currentCategory =
    tagFromQuery && validTags.has(tagFromQuery) ? tagFromQuery : SHOW_ALL;

  const filteredItems =
    currentCategory === SHOW_ALL
      ? items
      : items.filter((item) => item.tags?.includes(currentCategory));

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.max(
    1,
    Math.min(parsePage(searchParams.get('page')), totalPages),
  );

  const shouldShowFeatured = currentCategory === SHOW_ALL && currentPage === 1;
  const featuredPost = shouldShowFeatured ? filteredItems[0] : undefined;
  const postsToRender = shouldShowFeatured
    ? filteredItems.slice(1, PAGE_SIZE)
    : filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="pb-20">
      <div className="mb-8">
        <CategoryTagFilter
          uniqueTags={uniqueTags}
          currentCategory={currentCategory}
        />
      </div>

      <BlogGrid
        items={postsToRender}
        featuredPost={featuredPost}
        currentCategory={currentCategory}
      />

      <Pagination
        currentCategory={currentCategory}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
