import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { ProjectItem } from '@/lib/project';

/** 1:1 project logo. Falls back to the title initial when no logo is set. */
export function ProjectLogo({
  project,
  className,
}: {
  project: ProjectItem;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative aspect-square shrink-0 overflow-hidden rounded-xl border border-[#6c7086] bg-[#11111b]',
        className,
      )}
    >
      {project.logoSrc ? (
        <Image
          src={project.logoSrc}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center font-pretendard text-xl font-semibold text-[#89b4fa]">
          {project.title.charAt(0)}
        </span>
      )}
    </span>
  );
}
