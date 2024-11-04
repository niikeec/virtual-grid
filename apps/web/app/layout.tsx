import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

export const metadata: Metadata = {
  title: 'Virtual Grid',
  description: 'Virtualized grid powered by @tanstack/virtual'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Analytics />
      <body>
        <NuqsAdapter>
          <div className="mx-auto min-h-screen w-full max-w-screen-lg">
            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
