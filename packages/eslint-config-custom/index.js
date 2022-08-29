module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sort-destructure-keys', 'sonarjs'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'sort-keys': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 'warn',
  },
};
