/** @type {import("tsup").Options} */
const config = {
  target: 'es2018',
  external: ['react'],
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs']
};

module.exports = { config };
