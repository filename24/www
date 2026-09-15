import type { Metadata } from 'next';
import { ProjectsGrid } from '@/components/projects/projects-section';
import { projects } from '@/lib/project';
import { appName } from '@/lib/shared';

export const metadata: Metadata = {
  title: `Projects | ${appName}`,
  description: 'Selected work — side projects and experiments.',
  openGraph: {
    title: `Projects | ${appName}`,
    description: 'Selected work — side projects and experiments.',
    type: 'website',
    siteName: appName,
    url: 'https://filename24.github.io/www/projects',
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
    title: `Projects | ${appName}`,
    description: 'Selected work — side projects and experiments.',
  },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
      <header className="mx-auto max-w-2xl py-16 text-center sm:py-20">
        <h1 className="font-pretendard text-4xl font-semibold text-balance text-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-balance text-[#9399b2]">
          Selected work — side projects and experiments.
        </p>
      </header>
      <div className="pb-20">
        <ProjectsGrid items={projects} />
      </div>
    </main>
  );
}
