import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';

import pkg from 'globals';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { browser, commonjs, node } = pkg;

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...browser,
        ...node,
        ...commonjs,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      import: (await import('eslint-plugin-import')).default,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ),

    settings: {
      react: { version: 'detect' },

      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },

    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-unused-expressions': 1,
      '@typescript-eslint/default-param-last': 1,
      '@typescript-eslint/no-var-requires': 1,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/no-restricted-types': 1,
      'prettier/prettier': 1,
      'react/require-default-props': 0,
      'react/prop-types': 0,

      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],

      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelAttributes: ['htmlFor'],
        },
      ],
    },
  },
  globalIgnores([
    'eslint.config.js',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**',
  ]),
]);
