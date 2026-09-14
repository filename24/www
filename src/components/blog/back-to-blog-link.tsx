import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackToBlogLink() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 rounded text-sm text-[#9399b2] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      All posts
    </Link>
  );
}
