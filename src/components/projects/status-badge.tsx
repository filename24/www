import { cn } from '@/lib/cn';
import type { ProjectStatus } from '@/lib/project';

const LABEL: Record<ProjectStatus, string> = {
  'in-progress': '진행중',
  completed: '완료',
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-[#6c7086] px-2.5 py-0.5 font-pretendard text-xs text-[#cdd6f4]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 rounded-full',
          status === 'in-progress'
            ? 'animate-pulse bg-emerald-400'
            : 'bg-[#9399b2]',
        )}
      />
      {LABEL[status]}
    </span>
  );
}
