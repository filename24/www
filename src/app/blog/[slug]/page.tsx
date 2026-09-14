import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';
import { getPageImageUrl } from '@/lib/shared';
import {
  formatDate,
  formatTag,
  getAllPosts,
  getRelatedPosts,
  toCardItem,
} from '@/lib/blog';
import { getAuthor } from '@/lib/authors';
import { AuthorAvatars, AuthorBio } from '@/components/blog/author';
import { BackToBlogLink } from '@/components/blog/back-to-blog-link';
import { BlogShare } from '@/components/blog/blog-share';
import { PostCard } from '@/components/blog/post-card';

interface TocEntry {
  title: string;
  url: string;
  depth: number;
}

export async function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(
  props: PageProps<'/blog/[slug]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}

function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;
  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
        <p className="text-xs font-semibold tracking-wider text-[#9399b2] uppercase">
          On this page
        </p>
        <ul className="mt-3 flex flex-col gap-2 border-l border-[#6c7086]/40">
          {toc.map((entry) => (
            <li key={entry.url}>
              <a
                href={entry.url}
                style={{ paddingLeft: `${(entry.depth - 2) * 12 + 12}px` }}
                className="block rounded-r pr-2 text-sm text-[#9399b2] transition-colors hover:text-white"
              >
                {entry.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default async function BlogPost(props: PageProps<'/blog/[slug]'>) {
  const params = await props.params;
  const page = source.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;
  const data = page.data as typeof page.data & {
    authors?: string[];
    date?: unknown;
    updatedAt?: unknown;
    heroImagePath?: string;
    tags?: string[];
  };
  const toc = (page.data.toc ?? []) as TocEntry[];

  const item = toCardItem(page);
  const date = formatDate(item.date);
  const updatedAt = item.updatedAt ? formatDate(item.updatedAt) : '';
  const authors = item.authors;

  const related = getRelatedPosts(item, getAllPosts());
  const siteUrl = 'https://filename24.github.io/www';
  const canonicalUrl = `${siteUrl}${page.url}`;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
      <article className="mx-auto max-w-5xl py-12 sm:py-16">
        <BackToBlogLink />

        <header className="mt-8">
          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-[#89b4fa]/15 px-2.5 py-0.5 text-xs font-semibold text-[#89b4fa] capitalize transition-opacity hover:opacity-80"
                >
                  {formatTag(tag)}
                </Link>
              ))}
            </div>
          ) : null}

          <h1 className="mt-4 font-pretendard text-3xl font-semibold text-balance text-white sm:text-4xl">
            {page.data.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#9399b2]">
            {authors.length > 0 ? (
              <AuthorAvatars authors={authors} />
            ) : null}
            {date ? <span>{date}</span> : null}
            {updatedAt ? <span>Updated {updatedAt}</span> : null}
          </div>

          {data.heroImagePath ? (
            <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-[#6c7086]/40 bg-[#181825]">
              <img
                src={data.heroImagePath}
                alt={page.data.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : null}
        </header>

        <div className="mt-8 flex gap-10">
          <div className="min-w-0 flex-1">
            <DocsBody>
              <MDX components={getMDXComponents()} />
            </DocsBody>

            <div className="mt-12 flex flex-col gap-6">
              <BlogShare title={page.data.title} url={canonicalUrl} />
              {authors.map((name) => (
                <AuthorBio key={name} name={name} />
              ))}
            </div>
          </div>
          <TableOfContents toc={toc} />
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="keep-reading" className="mx-auto max-w-6xl pb-20">
          <h2
            id="keep-reading"
            className="font-pretendard text-2xl font-semibold text-pretty text-white"
          >
            Keep reading
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <PostCard key={post.url} post={post} currentCategory="show-all" />
            ))}
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: page.data.title,
            description: page.data.description ?? '',
            url: canonicalUrl,
            datePublished: item.date || undefined,
            dateModified: item.updatedAt || undefined,
            author: authors.map((name) => ({
              '@type': 'Person',
              name: getAuthor(name).name,
            })),
          }),
        }}
      />
    </main>
  );
}
