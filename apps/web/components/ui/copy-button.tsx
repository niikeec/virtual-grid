import { HTMLAttributes, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Check } from '@phosphor-icons/react';
import { CopyIcon } from '@radix-ui/react-icons';

import { Button } from './button';

export const CopyButton = ({ onClick, className, ...props }: HTMLAttributes<HTMLButtonElement>) => {
  const [copying, setCopying] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (copying === undefined) return;
    const timeout = setTimeout(() => setCopying(false), 1000);
    return () => clearTimeout(timeout);
  }, [copying]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              setCopying(true);
              onClick?.(e);
            }}
            className={cn('relative shadow-none', className)}
            {...props}
          >
            <span
              data-copying={copying}
              className="data-[copying=true]:fade-out-0 data-[copying=true]:animate-out fill-mode-forwards data-[copying=true]:zoom-out-50 data-[copying=false]:fade-in-0 data-[copying=false]:animate-in data-[copying=false]:zoom-in-50 absolute"
            >
              <CopyIcon />
            </span>

            <span
              data-state={copying === undefined ? 'idle' : 'active'}
              data-copying={copying}
              className="data-[copying=false]:fade-out-0 data-[copying=false]:animate-out fill-mode-forwards data-[copying=false]:zoom-out-50 data-[copying=true]:fade-in-0 data-[copying=true]:animate-in data-[copying=true]:zoom-in-50 absolute data-[state=idle]:opacity-0"
            >
              <Check />
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
