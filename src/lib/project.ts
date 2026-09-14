export type ProjectStatus = 'in-progress' | 'completed';

export interface ProjectItem {
  slug: string;
  title: string;
  /** Short blurb shown on the card. */
  summary: string;
  /** Long body shown in the dialog (paragraphs separated by blank lines). */
  description: string;
  techStack: string[];
  /** 1:1 project logo shown next to the title. Null renders an initial fallback. */
  logoSrc: string | null;
  logoAlt?: string;
  siteUrl: string | null;
  githubUrl: string | null;
  /** 'YYYY.MM' */
  startDate: string;
  /** 'YYYY.MM'. Null means the project is still running. */
  endDate: string | null;
  status: ProjectStatus;
}

export const projects: ProjectItem[] = [
  {
    slug: 'aztra',
    title: 'Aztra',
    summary: '국내 최초 대시보드 지원 디스코드 서버 관리봇.',
    description:
      '다채롭고 깔끔한 디스코드 서버를 만들 수 있도록 돕는 서버 관리봇입니다. 명령어 기반 설정의 한계를 넘어 웹 대시보드에서 멤버 관리, 경고 설정 등 다양한 기능을 제공합니다.\n\ndiscord.js 봇과 discordeno 게이트웨이/샤드, Fastify REST 서버, Next.js 대시보드로 구성된 Turborepo 모노레포이며 Prisma로 데이터를 관리합니다.',
    techStack: [
      'TypeScript',
      'Next.js',
      'discord.js',
      'Fastify',
      'Prisma',
      'Turborepo',
    ],
    logoSrc: '/images/aztra-logo.png',
    logoAlt: 'Aztra 로고',
    siteUrl: 'https://aztra.xyz',
    githubUrl: 'https://github.com/infiniteteam/aztra',
    startDate: '2023.08',
    endDate: null,
    status: 'in-progress',
  },
  {
    slug: 'ideaslab',
    title: '아이디어스 랩',
    summary: '창작자 디스코드 커뮤니티 아이디어스 랩의 관리 봇/웹사이트.',
    description:
      '창작자들을 위한 디스코드 서버 아이디어스 랩의 관리 봇과 웹사이트입니다. 음성채널 아카이빙, 디스코드 내 회원가입 플로우 등 커뮤니티 운영에 필요한 기능을 제공합니다.\n\nNext.js 웹사이트와 discord.js 기반 봇 서버로 구성되어 있으며 tRPC와 Prisma, Redis 캐시 계층으로 데이터를 관리합니다.',
    techStack: [
      'TypeScript',
      'Next.js',
      'discord.js',
      'tRPC',
      'Prisma',
      'Redis',
    ],
    logoSrc: '/images/ideaslab-logo.png',
    logoAlt: '아이디어스 랩 로고',
    siteUrl: 'https://ideaslab.kr',
    githubUrl: 'https://github.com/kangjun-lee/ideaslab',
    startDate: '2025.02',
    endDate: null,
    status: 'in-progress',
  },
  {
    slug: 'grade-transcript',
    title: 'Knea - Grade Transcript',
    summary: '몽골 교육부 ESIS API 기반 학생 성적 조회 대시보드.',
    description:
      '몽골 학생들이 학업 기록을 조회하고 관리할 수 있도록 만든 웹 애플리케이션입니다. 몽골 교육부 ESIS API와 연동해 성적, GPA, 학기별 이력을 사용자 친화적인 대시보드로 보여줍니다.\n\nNext.js 모노레포(Turborepo + pnpm)로 구성되어 있으며 Prisma ORM과 shadcn/ui 기반 반응형 UI, 라이트/다크 테마 전환을 제공합니다.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Turborepo',
      'Prisma',
      'shadcn/ui',
      'Tailwind CSS',
    ],
    logoSrc: '/images/grade-transcript-logo.png',
    logoAlt: 'Knea - Grade Transcript 로고',
    siteUrl: 'https://knea-gt.vercel.app',
    githubUrl: 'https://github.com/filename24/grade-transcript',
    startDate: '2024.12',
    endDate: '2026.08',
    status: 'completed',
  },
];

/** 'YYYY.MM – YYYY.MM' or 'YYYY.MM – 진행중'. */
export function formatPeriod(project: ProjectItem): string {
  return `${project.startDate} – ${project.endDate ?? '진행중'}`;
}
