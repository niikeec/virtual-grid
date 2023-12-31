import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Virtual Grid',
  description: 'Virtualized grid powered by @tanstack/virtual'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto w-full max-w-screen-lg">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
