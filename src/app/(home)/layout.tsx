export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className="min-h-screen bg-[#11111b] text-white antialiased [color-scheme:dark]">
      {children}
    </div>
  );
}
