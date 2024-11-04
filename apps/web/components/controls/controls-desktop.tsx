'use client';

import { cn } from '@/lib/utils';
import { Sliders } from '@phosphor-icons/react';
import { isMobile } from 'react-device-detect';

import { Button, buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Controls } from './controls';
import { useControls } from './controls.params';

export function ControlsDesktop() {
  const { reset } = useControls();

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Controls"
        className={buttonVariants({
          size: 'icon',
          variant: 'outline',
          className: cn(
            '!bg-background group-hover:animate-in group-hover:fade-in data-[state=open]:animate-in fill-mode-forwards fade-out animate-out absolute right-4 top-4 z-20 h-8 w-8 !shadow-md sm:right-7 sm:top-7',
            isMobile && 'hidden'
          )
        })}
      >
        <Sliders size={16} />
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        <Controls />
        <div className="border-t p-2">
          <Button onClick={reset} className="w-full">
            Reset to default
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
