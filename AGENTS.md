# www — Agent Instructions

## Project Overview
Next.js 16.3.4 + Fumadocs documentation site. Dark-themed, Korean developer site with blog, projects showcase, and search.

## Commands
- `pnpm dev` — start dev server on :3000
- `pnpm build` — production build (`next build`)
- `pnpm lint` — run ESLint (**warning: fails with `typescript-eslint does not support TS 7.0`** — this is a known issue, not your bug)
- `pnpm types:check` — **required order**: `next typegen && tsc --noEmit` (typegen must run first)
- `pnpm start` — start production server

## Stack & Conventions
- **Package manager**: pnpm only (workspace, `pnpm-lock.yaml` committed)
- **TypeScript**: 7.0.2 with `strict: true`, `@/*` → `./src/*` path alias
- **Styling**: Tailwind CSS 4 + `tw-animate-css` + shadcn/ui (`style: "base-nova"`, `iconLibrary: "lucide"`)
- **Animation**: `motion` (framer-motion) for all motion/animation
- **Validation**: `zod/v3` — never import from `zod` directly
- **Korean processing**: `es-hangul@2.4.0` for Hangul decomposition/synthesis (disassemble/assemble)
- **Fonts**: Self-hosted Pretendard (woff2) + Classical Mongolian Dashitseden (`/fonts/cmdashitseden.ttf`)

## Architecture
- `src/app/(home)/` — landing page + other pages in route group
- `src/app/blog/` — blog layout, pages, `[slug]` detail page (MDX via `content/blog/*.mdx`)
- `src/app/projects/` — projects showcase page and layout
- `src/app/api/search/` — search route handler
- `src/app/og/blog/` — OG image routes
- `src/app/llms.mdx/blog/` — LLMS content routes
- `src/app/sitemap.ts` — dynamic sitemap via `getAllPosts()`
- `src/app/robots.ts` — crawling directives for search engines
- `src/lib/source.ts` — fumadocs MDX source definition (`defineDocs`, `loader`, schema)
- `src/lib/shared.ts` — shared constants: `appName`, `docsRoute` (`'/blog'`), `gitConfig`
- `src/components/section/` — SiteHeader (morph), HeroSection, AboutSection, ComingSections
- `src/components/blog/` — blog UI (post-card, chrome, author, etc.)
- `src/components/projects/` — project cards, dialog, logo, status-badge
- `src/components/ui/dialog.tsx` — shadcn dialog (base-nova style)
- `src/components/search-dialog.tsx` — global search overlay
- `src/lib/blog.ts`, `src/lib/authors.ts`, `src/lib/project.ts` — data collections

## Key Config Files
- `next.config.mjs` — MDX via `createMDX()`, `/docs`→`/blog` permanent redirect, `img.shields.io` remote pattern
- `eslint.config.mjs` — `eslint-config-next/core-web-vitals`, ignores `.next/**`, `.source/**`, `build/**`
- `tsconfig.json` — `target: ESNext`, `jsx: react-jsx`, `incremental: true`
- `components.json` — shadcn config (base-nova, RSC, lucide icons)

## Important Gotchas
1. **`pnpm lint` will fail** due to `typescript-eslint does not support TS 7.0`. Do not report as an error you introduced.
2. **`pnpm types:check` must run `next typegen` before `tsc --noEmit`** — running `tsc` alone will fail.
3. **No test files or test framework** exist in this repo. No CI workflows either.
4. **`.source/` is gitignored** — generated fumadocs content, don't commit.
5. **`next-env.d.ts` is gitignored** — auto-generated.
6. **Branch**: `stable` → push to `origin/stable`. Feature commits should be grouped by concern.
7. **`/docs/:path*` redirects permanently to `/blog/:path*`** — don't recreate docs routes.
8. **Dark theme is fixed** (`bg-[#11111b]`, `[color-scheme:dark]`) — don't add light mode toggles without asking.
9. **Node.js v26.8.1** via fnm at `/home/filename/.local/share/fnm/node-versions/v26.8.1/installation/bin/node`.
10. **`pnpm build` must pass** — all new routes sitemap/robots are statically prerendered.

## SEO & OG
- **Site URL**: `https://filename24.github.io/www` — used in `metadataBase` (root `layout.tsx`), sitemap, robots
- **`src/app/sitemap.ts`**: dynamic sitemap via `getAllPosts()` from `@/lib/blog`; static routes + all blog post URLs
- **`src/app/robots.ts`**: disallows `/api/search` and `/api/llms` API routes; points to sitemap
- **OG images**: generated via `src/app/og/blog/[...slug]/route.tsx` using `fumadocs-ui/og`; each blog post gets `/og/blog/[slug]/image.png`
- **`src/lib/blog.ts`**: `getAllPosts()` returns `BlogCardItem[]` sorted newest-first with pinned posts surfacing; `toCardItem(page)` converts `source.getPages()` items
- **All page metadata** uses `type: 'website'` (home/blog/projects) or `type: 'article'` (blog posts) with `siteName`, `publishedTime`, `authors`
- **`src/app/layout.tsx`** exports `metadata` with `metadataBase`, `openGraph`, `twitter`, `robots` config

## Content
- Blog posts: `content/blog/hello-world.mdx` (MDX format, schema defined in `src/lib/source.ts`)
- Blog schema fields: `title`, `description`, `authors`, `authorSrc`, `date`, `updatedAt`, `heroImagePath`, `excerpt`, `pinned`, `tags`
- Images in `public/images/blog/`, `public/images/aztra-logo.png`, `public/images/grade-transcript-logo.png`, `public/images/ideaslab-logo.png`

## OpenCode Config
- Respond in **Korean** per `/home/filename/.config/opencode/AGENTS.md`
- Use Context7 MCP for library/docs queries
- Use `resolve-library-id` before `query-docs` for any library question
