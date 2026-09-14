'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects, type ProjectItem } from '@/lib/project';
import { ProjectCard } from './project-card';
import { ProjectDialog } from './project-dialog';

export function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  return (
    <>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {items.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onSelect={setSelected}
          />
        ))}
      </div>
      <ProjectDialog project={selected} onOpenChange={(open) => {
        if (!open) setSelected(null);
      }} />
    </>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-6">
      <div className="mt-8 flex items-end justify-between gap-4">
        <h2
          id="projects-heading"
          className="font-pretendard text-3xl font-semibold text-pretty text-white"
        >
          Projects
        </h2>
        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1.5 rounded text-sm text-[#89b4fa] transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none"
        >
          View all projects
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <ProjectsGrid items={projects.slice(0, 3)} />
    </section>
  );
}
