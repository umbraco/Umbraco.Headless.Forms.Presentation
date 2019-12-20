module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'import', 'import-helpers', '@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'eol-last': ['error', 'always'],
    'prettier/prettier': ['error'],
    'react/prop-types': [0, {}],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}

