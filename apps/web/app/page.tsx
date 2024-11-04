'use client';

import { Suspense } from 'react';
import { Demo } from '@/components/demo';
import { Hero } from '@/components/hero';

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center p-5 pt-16 sm:px-10 sm:pb-10">
      <Hero />
      <Suspense>
        <Demo />
      </Suspense>
    </div>
  );
}
