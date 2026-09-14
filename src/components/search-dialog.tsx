'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { FileText, LoaderCircle, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Escape HTML but keep fumadocs <mark> highlights. Content is our own index. */
function highlight(content: string): string {
  return content
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('&lt;mark&gt;', '<mark>')
    .replaceAll('&lt;/mark&gt;', '</mark>');
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' });
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.data && query.data !== 'empty' ? query.data : [];

  useEffect(() => {
    if (!open) return;
    setSearch('');
    setActive(0);
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, setSearch]);

  useEffect(() => {
    setActive(0);
  }, [search]);

  if (!open) return null;

  const go = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search posts"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh]"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#6c7086]/60 bg-[#1e1e2e] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 border-b border-[#6c7086]/40 px-4">
          <Search className="size-5 shrink-0 text-[#9399b2]" aria-hidden="true" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onOpenChange(false);
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) => (results.length > 0 ? (i + 1) % results.length : 0));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) =>
                  results.length > 0 ? (i - 1 + results.length) % results.length : 0,
                );
              } else if (e.key === 'Enter' && results[active]) {
                go(results[active].url);
              }
            }}
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="h-14 w-full bg-transparent font-pretendard text-base text-white outline-none placeholder:text-[#6c7086] [&::-webkit-search-cancel-button]:hidden"
          />
          {query.isLoading ? (
            <LoaderCircle className="size-5 shrink-0 animate-spin text-[#9399b2]" aria-hidden="true" />
          ) : search ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearch('')}
              className="shrink-0 rounded-full p-1 text-[#9399b2] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : (
            <kbd className="hidden shrink-0 rounded border border-[#6c7086]/60 px-1.5 py-0.5 font-pretendard text-xs text-[#9399b2] sm:inline">
              ESC
            </kbd>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="max-h-[40vh] overflow-auto p-2">
            {results.map((result, i) => (
              <li key={result.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(result.url)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:outline-none',
                    i === active ? 'bg-[#89b4fa]/10' : 'bg-transparent',
                  )}
                >
                  <FileText
                    className="mt-0.5 size-4 shrink-0 text-[#9399b2]"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    {result.breadcrumbs && result.breadcrumbs.length > 0 ? (
                      <span className="block truncate text-xs text-[#6c7086]">
                        {result.breadcrumbs.join(' / ')}
                      </span>
                    ) : null}
                    <span
                      className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-[#cdd6f4] [&_mark]:rounded-sm [&_mark]:bg-[#89b4fa]/30 [&_mark]:text-white"
                      dangerouslySetInnerHTML={{ __html: highlight(result.content) }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-[#9399b2]">
            {query.isLoading
              ? 'Searching…'
              : search
                ? `No results for “${search}”…`
                : 'Type to search posts…'}
          </p>
        )}

        <div className="hidden items-center gap-4 border-t border-[#6c7086]/40 px-4 py-2.5 text-xs text-[#6c7086] sm:flex">
          <span>
            <kbd className="rounded border border-[#6c7086]/60 px-1">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="rounded border border-[#6c7086]/60 px-1">↵</kbd> open
          </span>
          <span>
            <kbd className="rounded border border-[#6c7086]/60 px-1">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
