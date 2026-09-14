import Link from 'next/link';
import { getAuthor } from '@/lib/authors';
import { cn } from '@/lib/utils';

export function AuthorAvatars({
  authors,
  className,
}: {
  authors: string[];
  className?: string;
}) {
  const resolved = authors.map(getAuthor).slice(0, 3);
  if (resolved.length === 0) return null;

  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span className="flex -space-x-2">
        {resolved.map((author) =>
          author.avatar ? (
            <img
              key={author.name}
              src={author.avatar}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              loading="lazy"
              className="size-6 rounded-full border border-[#11111b] object-cover"
            />
          ) : null,
        )}
      </span>
      <span translate="no" className="truncate text-sm font-medium text-[#cdd6f4]">
        {resolved.map((author) => author.name).join(', ')}
      </span>
    </span>
  );
}

export function AuthorBio({ name }: { name: string }) {
  const author = getAuthor(name);

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#6c7086]/60 bg-[#1e1e2e] p-6">
      {author.avatar ? (
        <img
          src={author.avatar}
          alt={`${author.name} profile`}
          width={128}
          height={128}
          loading="lazy"
          className="size-12 shrink-0 rounded-full object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <p className="text-xs tracking-wider text-[#9399b2] uppercase">
          Written by
        </p>
        <p translate="no" className="mt-1 font-pretendard text-base font-semibold text-white">
          {author.name}
        </p>
        {author.role ? (
          <p className="mt-0.5 text-sm text-[#9399b2]">{author.role}</p>
        ) : null}
        {author.github ? (
          <Link
            href={author.github}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block rounded text-sm text-[#89b4fa] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e2e] focus-visible:outline-none"
          >
            GitHub profile
          </Link>
        ) : null}
      </div>
    </div>
  );
}
