import { SiteHeader } from '@/components/section/site-header';
import { SiteFooter } from '@/components/blog/chrome';

export default function Layout({ children }: LayoutProps<'/blog'>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#11111b] text-white antialiased [color-scheme:dark]">
      {/* Direct child of the tall column so sticky keeps working. */}
      <SiteHeader className="mt-5 w-full max-w-6xl px-4 sm:px-6" />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
