import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

export const metadata: Metadata = {
  metadataBase: new URL('https://filename24.github.io/www'),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description:
    'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
  applicationName: appName,
  openGraph: {
    type: 'website',
    siteName: appName,
    locale: 'en_US',
    url: 'https://filename24.github.io/www',
    title: appName,
    description:
      'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
    images: [
      {
        url: '/images/icon-3.png',
        width: 1200,
        height: 630,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${appName}`,
    title: appName,
    description:
      'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
    images: ['/images/icon-3.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
};

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
