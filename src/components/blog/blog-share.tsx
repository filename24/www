'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

export function BlogShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareOnX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const buttonClass =
    'inline-flex items-center gap-2 rounded-full border border-[#6c7086]/60 px-4 py-1.5 text-sm text-[#cdd6f4] transition-colors hover:border-[#89b4fa]/60 hover:text-white focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none';

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this post">
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <Check className="size-4 text-[#a6e3a1]" /> : <Link2 className="size-4" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a href={shareOnX} target="_blank" rel="noreferrer" className={buttonClass}>
        Share on X
      </a>
    </div>
  );
}
