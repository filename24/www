import Link from 'next/link';
import { AuthorAvatars } from './author';
import { formatDate, formatTag, type BlogCardItem } from '@/lib/blog';
import { cn } from '@/lib/utils';

/**
 * The blog card idiom: quiet hairline ring at rest, blue→teal gradient
 * ring + lifted shadow on hover. Featured slot spans full width with the
 * image beside the body from md up.
 */
export function PostCard({
  post,
  currentCategory,
  featured = false,
}: {
  post: BlogCardItem;
  currentCategory: string;
  featured?: boolean;
}) {
  const badge =
    post.tags && post.tags.length > 0
      ? formatTag(currentCategory !== 'show-all' ? currentCategory : post.tags[0])
      : null;

  const date = formatDate(post.date);
  const updatedAt = post.updatedAt ? formatDate(post.updatedAt) : '';

  const isSplit = featured && Boolean(post.imageSrc);

  const body = (
    <div
      className={cn(
        'flex min-w-0 flex-1 flex-col gap-3',
        isSplit ? 'justify-center p-6 sm:p-8' : 'p-5',
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-[#89b4fa]/15 px-2.5 py-0.5 text-xs font-semibold text-[#89b4fa] capitalize">
            {badge}
          </span>
        ) : null}
        {date ? <span className="text-xs text-[#9399b2]">{date}</span> : null}
        {date && updatedAt ? (
          <span aria-hidden="true" className="text-xs text-[#6c7086]">
            ·
          </span>
        ) : null}
        {updatedAt ? (
          <span className="text-xs text-[#9399b2]">Updated {updatedAt}</span>
        ) : null}
      </div>

      <h2
        className={cn(
          'text-balance font-pretendard font-semibold text-white',
          isSplit ? 'text-2xl sm:text-3xl' : 'text-xl',
        )}
      >
        {post.title}
      </h2>

      {post.excerpt ? (
        <p
          className={cn(
            'line-clamp-3 text-sm leading-relaxed text-[#9399b2]',
            isSplit && 'sm:text-base',
          )}
        >
          {post.excerpt}
        </p>
      ) : null}

      {post.authors.length > 0 ? (
        <AuthorAvatars authors={post.authors} className="mt-auto pt-2" />
      ) : null}
    </div>
  );

  return (
    <Link
      href={post.url}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-[#6c7086]/60 bg-[#1e1e2e] transition-[box-shadow,border-color] duration-500 hover:border-transparent hover:bg-[linear-gradient(#1e1e2e,#1e1e2e)_padding-box,linear-gradient(135deg,#89b4fa,#94e2d5)_border-box] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)] motion-reduce:transition-none',
        'focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none',
        isSplit && 'md:grid md:grid-cols-2 md:items-stretch',
      )}
    >
      {post.imageSrc ? (
        <div
          className={cn(
            'relative w-full shrink-0 overflow-hidden bg-[#181825]',
            isSplit ? 'aspect-video md:aspect-auto md:h-full' : 'aspect-video',
          )}
        >
          <img
            src={post.imageSrc}
            alt={post.imageAlt ?? post.title}
            loading={featured ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      ) : null}
      {body}
    </Link>
  );
}
