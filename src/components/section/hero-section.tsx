'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { assemble, disassemble } from 'es-hangul';

const NAMES = ['Ankhgerel Amgalantamir', '__filename', '안수찬'];

/** Typing frames per name: ASCII grows char by char, Hangul grows jamo by
 * jamo (ㅇ → 아 → 안), like a real IME. Deleting walks the frames back. */
function framesFor(name: string): string[] {
  const frames: string[] = [''];
  let prefix = '';
  for (const char of name) {
    // Group jamos per source syllable so a new choseong (ㅊ) never gets
    // absorbed as the previous syllable's jongseong (숯).
    const group = [...disassemble(char)];
    for (let i = 1; i <= group.length; i++) {
      frames.push(prefix + assemble(group.slice(0, i)));
    }
    prefix += char;
  }
  return frames;
}

const FRAMES = NAMES.map(framesFor);
const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1500;
const GAP_MS = 400;

type Phase = 'typing' | 'holding' | 'deleting' | 'gap';

function RotatingName() {
  const [nameIndex, setNameIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const reduceMotion = useReducedMotion();
  const frames = FRAMES[nameIndex];

  useEffect(() => {
    if (reduceMotion) return;
    let timer = 0;

    if (phase === 'typing') {
      timer = window.setTimeout(() => {
        if (frameIndex < frames.length - 1) {
          setFrameIndex(frameIndex + 1);
        } else {
          setPhase('holding');
        }
      }, TYPE_MS);
    } else if (phase === 'holding') {
      timer = window.setTimeout(() => setPhase('deleting'), HOLD_MS);
    } else if (phase === 'deleting') {
      timer = window.setTimeout(() => {
        if (frameIndex > 0) {
          setFrameIndex(frameIndex - 1);
        } else {
          setPhase('gap');
        }
      }, DELETE_MS);
    } else {
      timer = window.setTimeout(() => {
        setNameIndex((nameIndex + 1) % NAMES.length);
        setPhase('typing');
      }, GAP_MS);
    }

    return () => window.clearTimeout(timer);
  }, [phase, frameIndex, nameIndex, frames, reduceMotion]);

  if (reduceMotion) {
    return (
      <span translate="no" className="text-[#89b4fa]">
        {NAMES[0]}
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline">
      <span className="sr-only">{NAMES[nameIndex]}</span>
      <span translate="no" aria-hidden="true" className="text-[#89b4fa]">
        {frames[frameIndex]}
      </span>
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        className="ml-1 inline-block h-[1em] w-[3px] translate-y-0.5 bg-[#89b4fa]"
      />
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-between gap-10 overflow-clip rounded-2xl border border-[#6c7086] bg-[#1e1e2e] px-6 py-10 shadow-[0px_4px_4px_0px_rgba(17,17,27,0.3)] sm:px-8 sm:py-16 lg:flex-row lg:items-center">
      {/* bg image at 40% opacity — Figma About backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40">
        <img
          alt=""
          aria-hidden="true"
          src="/images/about-bg.png"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute top-[-40.74%] left-[-0.04%] h-[145.4%] w-full max-w-none object-cover"
        />
      </div>

      <div className="relative flex w-full max-w-109 min-w-0 shrink-0 flex-col items-start gap-8">
        <div className="flex w-full flex-col items-start gap-4 text-white">
          <p
            translate="no"
            className="font-pretendard text-xl font-medium"
          >
            <span>console.</span>
            <span className="text-[#89b4fa]">log</span>
            <span>(</span>
            <span className="text-[#a6e3a1]">&ldquo;Hello World&rdquo;</span>
            <span>)</span>
          </p>
          <h1 className="font-pretendard text-2xl leading-tight font-medium text-pretty sm:text-3xl">
            <span>
              I&rsquo;m <RotatingName />,
            </span>
            <br />
            <span>a Software Engineer</span>
          </h1>
          <p className="font-pretendard text-base leading-5 tracking-wider">
            Design distributed systems with transport-aware backends, zero-trust network fabric,
            and sub-millisecond serialization working as a single continuum. Removing the boundary
            between infrastructure and code is the only way to scale without distributed failure
            modes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#about"
            className="flex h-8 items-center justify-center rounded-full bg-[#89b4fa] px-4 py-1 font-pretendard text-base text-[#1e1e2e] transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e2e] focus-visible:outline-none"
          >
            About me
          </Link>
          <Link
            href="/blog"
            className="flex h-8 items-center justify-center rounded-full bg-[#181825] px-4 py-1 font-pretendard text-base text-[#cdd6f4] transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e2e] focus-visible:outline-none"
          >
            Blog
          </Link>
        </div>
      </div>

      {/* vertical Mongolian name — rotated 90deg, hidden on mobile */}
      <div
        role="img"
        aria-label="Amgalantamir Ankhgerel in Mongolian script"
        className="relative hidden shrink-0 items-center lg:flex"
      >
        <div className="-mr-3 flex h-52 w-14 items-center justify-center">
          <div className="flex-none rotate-90">
            <p className="font-mongolian text-center text-3xl leading-none whitespace-nowrap text-[#c8c8c8]">
              ᠠᠮᠣᠭᠣᠯᠠᠩᠲᠠᠮᠢᠷ
            </p>
          </div>
        </div>
        <div className="flex h-38 w-14 items-center justify-center">
          <div className="flex-none rotate-90">
            <p className="font-mongolian text-center text-3xl leading-none whitespace-nowrap text-[#c8c8c8]">
              ᠠᠩᠬᠠᠭᠡᠷᠡᠯ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
