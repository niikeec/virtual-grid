import { config } from '@virtual-grid/tsup-config';
import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	...config,
	entry: ['./src/index.tsx'],
	clean: !opts.watch,
	esbuildOptions: (option) => {
		option.banner = {
			js: `"use client";`
		};
	}
}));
