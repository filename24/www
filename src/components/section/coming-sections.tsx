import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PostCard } from '@/components/blog/post-card';
import { getAllPosts } from '@/lib/blog';

export function LatestPostsSection() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section aria-labelledby="latest-posts-heading" className="scroll-mt-6">
      <div className="mt-8 flex items-end justify-between gap-4">
        <h2
          id="latest-posts-heading"
          className="font-pretendard text-3xl font-semibold text-pretty text-white"
        >
          Latest posts
        </h2>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1.5 rounded text-sm text-[#89b4fa] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none"
        >
          View all posts
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} currentCategory="show-all" />
        ))}
      </div>
    </section>
  );
}
