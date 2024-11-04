'use client';

import { PropsWithChildren } from 'react';

import { Checkbox } from '../ui/checkbox';
import { labelVariants } from '../ui/label';

interface SectionProps extends PropsWithChildren {
  label?: string;
  enabled?: boolean;
  onEnabledChange?: (val: boolean) => void;
}

export function ControlsSection({
  label,
  enabled,
  onEnabledChange,
  children
}: SectionProps) {
  return (
    <div className="flex flex-col border-b p-4 last:border-b-0">
      {label && (
        <div className="mb-4 flex items-center justify-between">
          <span className={labelVariants({ className: 'font-medium' })}>
            {label}
          </span>

          {enabled !== undefined && onEnabledChange && (
            <Checkbox checked={enabled} onCheckedChange={onEnabledChange} />
          )}
        </div>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
