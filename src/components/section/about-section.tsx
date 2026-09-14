const TECH_STACK = [
  {
    name: 'JavaScript',
    years: 7,
    badge:
      'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  },
  {
    name: 'Git',
    years: 7,
    badge:
      'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  },
  {
    name: 'TypeScript',
    years: 6,
    badge:
      'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
  },
  {
    name: 'Next.js',
    years: 4,
    badge:
      'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white',
  },
  {
    name: 'Prisma',
    years: 4,
    badge:
      'https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white',
  },
  {
    name: 'NestJS',
    years: 3,
    badge:
      'https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white',
  },
];

function TechStack() {
  return (
    <div className="w-full">
      <h3 className="mb-0 font-pretendard text-2xl leading-5 font-medium text-white">
        Tech Stack
      </h3>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {TECH_STACK.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-1.5 rounded-lg border border-[#6c7086] bg-[#11111b] py-1 pr-2.5 pl-1"
          >
            <img
              src={tech.badge}
              alt={`${tech.name} badge`}
              loading="lazy"
              className="h-5 w-auto rounded"
            />
            <span className="font-pretendard text-xs font-semibold whitespace-nowrap text-[#89b4fa]">
              +{tech.years}y
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AboutCard() {
  return (
    <section
      id="about"
      className="flex scroll-mt-6 flex-col items-start gap-8 rounded-2xl border border-[#6c7086] bg-[#1e1e2e] p-6 drop-shadow-[0px_4px_2px_rgba(24,24,37,0.3)] sm:p-8"
    >
      <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row">
      <div className="flex w-full max-w-110 min-w-0 shrink-0 flex-col items-start gap-4 font-pretendard tracking-wider break-words whitespace-pre-wrap text-white">
        <div>
          <h3 className="mb-0 text-2xl leading-5 font-medium">Personal Information</h3>
          <p className="mb-0 text-sm leading-5">First name : Ankhgerel</p>
          <p className="mb-0 text-sm leading-5">Last name : Amgalantamir</p>
          <p className="mt-5 mb-0 text-sm leading-5">
            Nickname: <span translate="no">__filename</span>, 안수찬
          </p>
          <p className="text-sm leading-5">MBTI : INTP</p>
        </div>
        <div>
          <h3 className="mb-0 text-2xl leading-5 font-medium">Education</h3>
          <p className="mb-0 text-sm leading-5">Sungkyunkwan University (2026 - Present)</p>
          <p className="mb-0 text-xs leading-5">Bachelor of Engineering</p>
          <p className="mt-5 mb-0 text-xs leading-5">Major: Computer Science and Engineering</p>
          <p className="text-xs leading-5">GPA: ??? / 4.5 (Major: ??? / 4.5)</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* outer 128px / leaf full-bleed — Figma 10:172 */}
        <div className="relative size-32 shrink-0 overflow-hidden rounded-4xl">
          <img
            alt="Avatar illustration"
            src="/images/icon-3.png"
            width={1024}
            height={1024}
            loading="lazy"
            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-4xl object-cover"
          />
        </div>
        {/* outer 128px / leaf 167.58% crop — Figma 10:173 */}
        <div className="relative size-32 shrink-0 overflow-hidden rounded-4xl">
          <img
            alt="__filename profile"
            src="/images/profile.png"
            width={2048}
            height={2048}
            loading="lazy"
            className="absolute top-[-22.29%] left-[-33.72%] max-w-none size-[167.58%]"
          />
        </div>
      </div>
      </div>
      <TechStack />
    </section>
  );
}

export function AboutSection() {
  return (
    <>
      <div className="mt-12" aria-hidden>
        <img alt="" src="/images/line.svg" className="block h-px w-full" />
      </div>

      <h2 className="mt-8 font-pretendard text-3xl font-semibold text-pretty text-white">
        About me
      </h2>

      <div className="mt-4">
        <AboutCard />
      </div>
    </>
  );
}
