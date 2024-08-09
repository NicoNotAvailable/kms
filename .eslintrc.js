// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['*.js'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        bracketSpacing: true,
        endOfLine: 'auto',
      },
    ],
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    'no-unused-vars': 'warn',
    'no-multi-spaces': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
