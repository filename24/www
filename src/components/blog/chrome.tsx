import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { gitConfig } from '@/lib/shared';

export function SiteFooter() {
  return (
    <footer className="border-t border-[#6c7086]/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-[#9399b2]">© 2026 __filename. All rights reserved.</p>
        <Link
          href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded text-sm text-[#9399b2] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          <span translate="no">
            {gitConfig.user}/{gitConfig.repo}
          </span>
        </Link>
      </div>
    </footer>
  );
}
