import { defineConfig } from 'tsup';

import { config } from '@virtual-grid/tsup-config';

export default defineConfig((opts) => ({
  ...config,
  entry: ['./src/index.ts'],
  clean: !opts.watch
}));
