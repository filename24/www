import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BlogHomeClient } from '@/components/blog/blog-home-client';
import { getAllPosts, getUniqueTags } from '@/lib/blog';
import { appName } from '@/lib/shared';

export const metadata: Metadata = {
  title: `Blog | ${appName}`,
  description:
    'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
  openGraph: {
    title: `Blog | ${appName}`,
    description:
      'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
    type: 'website',
    siteName: appName,
    url: 'https://filename24.github.io/www/blog',
    images: [
      {
        url: '/images/icon-3.png',
        width: 1200,
        height: 630,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${appName}`,
    title: `Blog | ${appName}`,
    description:
      'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
  },
};

export default function BlogHome() {
  const items = getAllPosts();
  const uniqueTags = getUniqueTags(items);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
      <header className="mx-auto max-w-2xl py-16 text-center sm:py-20">
        <h1 className="font-pretendard text-4xl font-semibold text-balance text-white sm:text-5xl">
          Blog
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-balance text-[#9399b2]">
          Notes on distributed systems, transport-aware backends, and
          infrastructure as code.
        </p>
      </header>
      {/*
       * Suspense is required because BlogHomeClient uses useSearchParams().
       * All post data ships in the RSC payload, so filtering applies instantly
       * after hydration with no extra round-trip.
       */}
      <Suspense fallback={<div className="min-h-96 pb-20" />}>
        <BlogHomeClient items={items} uniqueTags={uniqueTags} />
      </Suspense>
    </main>
  );
}
