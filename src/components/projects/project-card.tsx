import type { ProjectItem } from '@/lib/project';
import { ProjectLogo } from './project-logo';
import { StatusBadge } from './status-badge';

export function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}) {
  const visibleStack = project.techStack.slice(0, 3);
  const extraCount = project.techStack.length - visibleStack.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      aria-haspopup="dialog"
      className="flex cursor-pointer flex-col items-start gap-3 rounded-2xl border border-[#6c7086] bg-[#1e1e2e] p-6 text-left drop-shadow-[0px_4px_2px_rgba(24,24,37,0.3)] transition-colors hover:border-[#89b4fa] focus-visible:ring-2 focus-visible:ring-[#89b4fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11111b] focus-visible:outline-none sm:p-8"
    >
      <span className="flex w-full items-start gap-4">
        <ProjectLogo project={project} className="size-14" />
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate font-pretendard text-lg font-semibold text-white">
              {project.title}
            </span>
            <StatusBadge status={project.status} />
          </span>
          <span className="font-pretendard text-sm leading-5 tracking-wider text-[#9399b2]">
            {project.summary}
          </span>
        </span>
      </span>
      <span className="flex flex-wrap gap-1.5">
        {visibleStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-[#11111b] px-2.5 py-0.5 font-pretendard text-xs text-[#89b4fa]"
          >
            {tech}
          </span>
        ))}
        {extraCount > 0 ? (
          <span className="rounded-full bg-[#11111b] px-2.5 py-0.5 font-pretendard text-xs text-[#9399b2]">
            +{extraCount}
          </span>
        ) : null}
      </span>
    </button>
  );
}
