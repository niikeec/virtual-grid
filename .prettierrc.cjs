/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	printWidth: 100,
	singleQuote: true,
	trailingComma: 'none',
	bracketSameLine: false,
	tabWidth: 2,
	semi: true,
	quoteProps: 'consistent',
	importOrder: ['<THIRD_PARTY_MODULES>', '', '^~/', '^[../]', '^[./]'],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '4.4.0',
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
};

module.exports = config;
