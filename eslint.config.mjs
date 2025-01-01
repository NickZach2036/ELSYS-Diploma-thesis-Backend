import globals from 'globals';

import pluginJs from '@eslint/js';

import tseslint from 'typescript-eslint';

import eslintPluginPrettier from 'eslint-plugin-prettier';

import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  {
    languageOptions: {
      globals: globals.node,

      parserOptions: {
        ecmaVersion: 2020,

        sourceType: 'module',

        project: './tsconfig.json',
      },
    },
  },

  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      prettier: eslintPluginPrettier,
    },

    rules: {
      'prettier/prettier': [
        'error',

        {
          singleQuote: true, // Ensure single quotes are enforced

          endOfLine: 'crlf', // Use CRLF line endings
        },
      ],
    },
  },

  prettierConfig, // Disable conflicting ESLint rules with Prettier
];
