'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Button,
  Group,
  Input,
  NumberField,
  NumberFieldProps
} from 'react-aria-components';

export function NumberInput(props: NumberFieldProps) {
  return (
    <NumberField minValue={0} {...props}>
      <Group className="border-input ring-offset-background data-[focus-within]:border-ring data-[focus-within]:ring-ring/30 relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border text-sm shadow-sm shadow-black/[.04] transition-shadow data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-offset-2">
        <Input className="bg-background text-foreground min-w-0 flex-1 px-3 py-2 focus:outline-none" />
        <div className="flex h-[calc(100%+2px)] flex-col">
          <Button
            slot="increment"
            className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
          </Button>
          <Button
            slot="decrement"
            className="border-input bg-background text-muted-foreground/80 ring-offset-background hover:bg-accent hover:text-foreground -me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border text-sm transition-shadow disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </Group>
    </NumberField>
  );
}
