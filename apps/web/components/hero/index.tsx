import { Book, GithubLogo } from '@phosphor-icons/react';

import { buttonVariants } from '../ui/button';
import { Installation } from './installation';

export const Hero = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="shadow-primary/5 mb-5 h-12 w-12 rounded-lg border border-orange-400/40 bg-gradient-to-tr from-orange-400/80 to-orange-400/50 shadow-md" />

      <div className="flex flex-col items-center">
        <h1 className="mt-3 text-4xl font-bold">Virtual Grid</h1>
        <p className="text-muted-foreground mt-2">
          Simplified virtualization using{' '}
          <a
            href="https://tanstack.com/virtual/v3"
            target="_blank"
            className="text-primary hover:text-muted-foreground underline transition-colors"
          >
            @tanstack/virtual
          </a>
        </p>

        <div className="mt-4 flex gap-3">
          <a
            href="https://github.com/niikeec/virtual-grid"
            target="_blank"
            className={buttonVariants({ className: 'w-[150px] font-normal' })}
          >
            <GithubLogo weight="fill" className="mr-2 shrink-0" />
            GitHub
          </a>
          <a
            href="https://docs.virtual-grid.com/getting-started/react"
            target="_blank"
            className={buttonVariants({
              variant: 'outline',
              className: 'w-[150px] font-normal'
            })}
          >
            <Book weight="bold" className="mr-2 shrink-0" />
            Documentation
          </a>
        </div>
      </div>

      <Installation />
    </div>
  );
};
