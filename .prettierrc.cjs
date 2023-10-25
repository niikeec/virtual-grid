/** @type {import('prettier').Config} */
const config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'none',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@virtual-grid/(.*)$',
    '',
    '^~/',
    '^[../]',
    '^[./]'
  ],
  importOrderTypeScriptVersion: '4.4.0',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
};

module.exports = config;
