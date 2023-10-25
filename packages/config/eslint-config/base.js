const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
const config = {
	extends: [
		'turbo',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier'
	],
	env: {
		es2022: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project
	},
	settings: {
		'import/resolver': {
			typescript: {
				project
			}
		}
	},
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'turbo/no-undeclared-env-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{ prefer: 'type-imports', fixStyle: 'separate-type-imports' }
		],
		'@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'@typescript-eslint/ban-ts-comment': 'off',
		'import/consistent-type-specifier-style': 'off',
		'no-unsafe-assignment': 'off',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn'
	},
	ignorePatterns: [
		'**/.eslintrc.cjs',
		'**/*.config.js',
		'**/*.config.cjs',
		'packages/config/**',
		'.next',
		'dist',
		'pnpm-lock.yaml'
	],
	reportUnusedDisableDirectives: true
};

module.exports = config;
