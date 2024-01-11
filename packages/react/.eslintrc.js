module.exports = {
  root: true,
  extends: [
    '@virtual-grid/eslint-config/base',
    '@virtual-grid/eslint-config/react'
  ],
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks:
          '(useDeepCompareEffect|useDeepCompareCallback|useDeepCompareMemo)'
      }
    ]
  }
};
