import { useState } from 'react';
import copy from 'copy-to-clipboard';

import { CopyButton } from '../ui/copy-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Separator } from '../ui/separator';

type Manager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const commands: Record<Manager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add'
};

export const Installation = () => {
  const [manager, setManager] = useState<Manager>('pnpm');

  const command = `${commands[manager]} @virtual-grid/react`;

  return (
    <div className="from-accent to-secondary/50 my-10 flex items-center rounded-md border bg-gradient-to-t px-3 py-1.5">
      <span className="text-secondary-foreground text-sm font-light">
        {command}
      </span>

      <CopyButton onClick={() => copy(command)} className="ml-3" />

      <Separator className="mx-3 !h-6 !w-px" />

      <Select
        value={manager}
        onValueChange={(val) => setManager(val as Manager)}
      >
        <SelectTrigger
          aria-label="Package manager"
          className="h-7 w-auto border-none p-0 font-light shadow-none !ring-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="font-light">
          <SelectItem value="npm">npm</SelectItem>
          <SelectItem value="yarn">yarn</SelectItem>
          <SelectItem value="pnpm">pnpm</SelectItem>
          <SelectItem value="bun">bun</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
