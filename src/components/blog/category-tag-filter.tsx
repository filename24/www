'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formatTag } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const SHOW_ALL = 'show-all';

export function CategoryTagFilter({
  uniqueTags,
  currentCategory,
  className,
}: {
  uniqueTags: string[];
  currentCategory: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (category: string) => {
    const nextCategory =
      category === SHOW_ALL || currentCategory === category ? SHOW_ALL : category;
    if (nextCategory === currentCategory) return;

    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory === SHOW_ALL) {
      params.delete('tag');
    } else {
      params.set('tag', nextCategory);
    }
    params.delete('page');

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const chips = [SHOW_ALL, ...uniqueTags];

  return (
    <div
      role="group"
      aria-label="Filter posts by tag"
      className={cn('flex min-w-0 flex-nowrap gap-2 overflow-x-auto pb-1', className)}
    >
      {chips.map((category) => {
        const selected = currentCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={selected}
            onClick={() => handleSelect(category)}
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap capitalize transition-colors duration-300 motion-reduce:transition-none',
              'focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none',
              selected
                ? 'border-transparent bg-[#89b4fa] text-[#1e1e2e] hover:bg-[#89b4fa]/90'
                : 'border-[#6c7086]/60 bg-transparent text-[#9399b2] hover:border-[#89b4fa]/60 hover:bg-[#89b4fa]/10 hover:text-[#cdd6f4]',
            )}
          >
            {formatTag(category)}
          </button>
        );
      })}
    </div>
  );
}
