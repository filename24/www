import {
  AboutSection,
  LatestPostsSection,
  HeroSection,
  ProjectsSection,
  SiteHeader,
} from '@/components/section';

export default function HomePage() {
  return (
    <main id="main" className="bg-[#11111b]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-full focus:bg-[#89b4fa] focus:px-4 focus:py-2 focus:font-pretendard focus:text-sm focus:text-[#1e1e2e] focus:outline-none"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-232 flex-col px-4 pt-5 pb-20 sm:px-6 lg:px-0">
        <SiteHeader />

        <div className="mt-15">
          <HeroSection />
        </div>

        <AboutSection />
        <ProjectsSection />
        <LatestPostsSection />
      </div>
    </main>
  );
}
