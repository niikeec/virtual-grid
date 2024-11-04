'use client';

import { PropsWithChildren } from 'react';

import { Label } from '../ui/label';

export function ControlsSectionField({
  label,
  children
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className="grid grid-cols-3 items-center">
      <Label>{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
