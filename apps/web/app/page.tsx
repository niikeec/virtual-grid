'use client';

import { Demo } from '@/components/demo';
import { Hero } from '@/components/hero';
import { Usage } from '@/components/usage';

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center p-5 pt-16 sm:px-10 sm:pb-10">
      <Hero />
      <Demo />
      <Usage />
    </div>
  );
}
