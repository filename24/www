"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { SearchDialog } from '@/components/search-dialog';

// Figma 7:151 "Header 2" (condensed) vs default header:
// width full → 577 (centered), px 64 → 16,
// transparent → rgba(30,30,46,0.5) + blur(2px) + 0.5px overlay-0 border.
const EXPANDED_PX = { desktop: 64, mobile: 32 };
const CONDENSED_PX = 16;
const CONDENSED_WIDTH = 577;
const CONDENSE_THRESHOLD = 24;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window === 'undefined' ||
      window.matchMedia('(min-width: 768px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

const focusRing =
  'focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none';

export function SiteHeader({ className }: { className?: string }) {
  const [condensed, setCondensed] = useState(false);
  const [contentWidth, setContentWidth] = useState(928);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setCondensed(y > CONDENSE_THRESHOLD);
  });

  // Cmd/Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Measure the content column so width morphs numerically
  // (full width → 577), staying centered via mx-auto. The element's own
  // max-width (if any) caps the expanded width.
  useEffect(() => {
    const el = headerRef.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const measure = () => {
      const parentWidth = parent.getBoundingClientRect().width;
      const maxWidth = Number.parseFloat(getComputedStyle(el).maxWidth);
      setContentWidth(
        Math.min(parentWidth, Number.isFinite(maxWidth) ? maxWidth : parentWidth),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const expandedPx = isDesktop ? EXPANDED_PX.desktop : EXPANDED_PX.mobile;
  const targetWidth = condensed
    ? Math.min(CONDENSED_WIDTH, contentWidth)
    : contentWidth;

  return (
    <>
    <motion.header
      ref={headerRef}
      initial={false}
      animate={{
        width: targetWidth,
        paddingLeft: condensed ? CONDENSED_PX : expandedPx,
        paddingRight: condensed ? CONDENSED_PX : expandedPx,
        backgroundColor: condensed
          ? 'rgba(30, 30, 46, 0.5)'
          : 'rgba(30, 30, 46, 0)',
        borderColor: condensed
          ? 'rgba(108, 112, 134, 1)'
          : 'rgba(108, 112, 134, 0)',
        backdropFilter: condensed ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 300, damping: 32 }
      }
      className={`sticky top-5 z-50 mx-auto flex h-13 w-full items-center justify-between overflow-clip rounded-full border border-solid border-transparent bg-transparent drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]${className ? ` ${className}` : ''}`}
    >
      <Link
        href="/"
        className={`flex items-center gap-3 rounded-full transition-opacity hover:opacity-80 ${focusRing}`}
      >
        {/* outer 32px box / inner leaf 167.58% — Figma 5:26 crop preserved */}
        <span className="relative block size-8 shrink-0 overflow-hidden">
          <img
            alt="__filename profile"
            src="/images/profile.png"
            width={54}
            height={54}
            className="absolute top-[-22.29%] left-[-33.72%] max-w-none size-[167.58%]"
          />
        </span>
        <span
          translate="no"
          className="hidden font-pretendard text-xs whitespace-nowrap text-white sm:inline"
        >
          __filename
        </span>
      </Link>

      <nav className="flex items-center gap-8 font-pretendard text-sm font-bold whitespace-nowrap text-white md:gap-16">
        <Link
          href="/#about"
          className={`rounded transition-opacity hover:opacity-70 ${focusRing}`}
        >
          About me
        </Link>
        <Link
          href="/#projects"
          className={`rounded transition-opacity hover:opacity-70 ${focusRing}`}
        >
          Projects
        </Link>
        <Link
          href="/blog"
          className={`rounded transition-opacity hover:opacity-70 ${focusRing}`}
        >
          Blog
        </Link>
      </nav>

      {/* outer 44px box / leaf 18px — Figma 5:32/5:33 */}
      <button
        type="button"
        aria-label="Search"
        onClick={() => setSearchOpen(true)}
        className={`flex size-11 shrink-0 items-center justify-center overflow-clip rounded-full py-4 transition-opacity hover:opacity-70 ${focusRing}`}
      >
        <span className="relative block size-5">
          <img
            alt=""
            aria-hidden="true"
            src="/images/search.svg"
            width={18}
            height={18}
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
      </button>
    </motion.header>
    <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
