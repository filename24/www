import { PostCard } from './post-card';
import type { BlogCardItem } from '@/lib/blog';

export function BlogGrid({
  items,
  featuredPost,
  currentCategory,
}: {
  items: BlogCardItem[];
  featuredPost?: BlogCardItem;
  currentCategory: string;
}) {
  if (!featuredPost && items.length === 0) {
    return (
      <div className="rounded-2xl border border-[#6c7086]/60 bg-[#1e1e2e] p-8 text-center">
        <p className="font-pretendard text-base text-white">No posts yet…</p>
        <p className="mt-1 text-sm text-[#9399b2]">
          New articles will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredPost ? (
        <div className="col-span-full">
          <PostCard
            post={featuredPost}
            currentCategory={currentCategory}
            featured
          />
        </div>
      ) : null}
      {items.map((post) => (
        <PostCard key={post.url} post={post} currentCategory={currentCategory} />
      ))}
    </div>
  );
}
