import type { MetadataRoute } from 'next';
import { appName } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: appName,
    description:
      'Notes on distributed systems, transport-aware backends, and infrastructure as code.',
    start_url: '/',
    display: 'standalone',
    background_color: '#11111b',
    theme_color: '#11111b',
    icons: [
      {
        src: '/images/icon-3.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-3.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
