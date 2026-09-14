import { Calendar, ExternalLink, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatPeriod, type ProjectItem } from '@/lib/project';
import { ProjectLogo } from './project-logo';
import { StatusBadge } from './status-badge';

export function ProjectDialog({
  project,
  onOpenChange,
}: {
  project: ProjectItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={project !== null} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#6c7086] bg-[#1e1e2e] p-6 text-white sm:max-w-5xl sm:p-8">
        {project ? (
          <div className="grid gap-6 sm:grid-cols-10">
            {/* Main content (8) */}
            <div className="flex flex-col gap-4 sm:col-span-8">
              <DialogHeader className="flex-row items-start gap-4">
                <ProjectLogo project={project} className="size-20" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <DialogTitle className="font-pretendard text-2xl font-semibold text-white">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="font-pretendard text-sm leading-5 tracking-wider text-[#9399b2]">
                    {project.summary}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                {project.description.split('\n\n').map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="font-pretendard text-sm leading-6 tracking-wider text-[#cdd6f4]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#11111b] px-2.5 py-0.5 font-pretendard text-xs text-[#89b4fa]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Side info (2) */}
            <aside className="flex flex-col gap-4 border-t border-[#6c7086] pt-6 sm:col-span-2 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
              <div className="flex flex-col gap-2">
                {project.siteUrl ? (
                  <Button
                    render={
                      <a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noreferrer"
                      />
                    }
                    className="w-full bg-[#89b4fa] font-pretendard text-[#1e1e2e] hover:bg-[#89b4fa]/80"
                  >
                    <ExternalLink aria-hidden="true" />
                    사이트
                  </Button>
                ) : null}
                {project.githubUrl ? (
                  <Button
                    render={
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      />
                    }
                    variant="outline"
                    className="w-full border-[#6c7086] bg-transparent font-pretendard text-[#cdd6f4] hover:bg-[#11111b] hover:text-white"
                  >
                    <FolderGit2 aria-hidden="true" />
                    GitHub
                  </Button>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="inline-flex items-center gap-1.5 font-pretendard text-xs text-[#9399b2]">
                  <Calendar aria-hidden="true" className="size-3.5" />
                  기간
                </p>
                <p className="font-pretendard text-sm text-white">
                  {formatPeriod(project)}
                </p>
                <StatusBadge status={project.status} className="self-start" />
              </div>
            </aside>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
