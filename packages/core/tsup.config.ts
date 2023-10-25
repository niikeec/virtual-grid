import { config } from '@virtual-grid/tsup-config';
import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	...config,
	entry: ['./src/index.ts'],
	clean: !opts.watch
}));
