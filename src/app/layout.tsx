import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';


export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#11111b" />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/pretendard/Pretendard-Regular.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/pretendard/Pretendard-Medium.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/pretendard/Pretendard-SemiBold.woff2"
        />
        <link rel="icon" href="/knea.svg" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen font-pretendard">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
