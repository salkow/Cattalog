import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import promise from 'eslint-plugin-promise';
import reactRefresh from 'eslint-plugin-react-refresh';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import css from '@eslint/css';
import { tailwindSyntax } from '@eslint/css/syntax';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [ ...compat.extends(
  'plugin:react/recommended',
  'plugin:@typescript-eslint/recommended',
), {
  plugins: {
    react,
    '@typescript-eslint': typescriptEslint,
    'react-hooks': fixupPluginRules(reactHooks),
    promise,
    'react-refresh': reactRefresh,
    import: importPlugin,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
    },

    parser: tsParser,
    ecmaVersion: 12,
    sourceType: 'module',

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
    'react': {
      'version': 'detect'
    }
  },

  rules: {
    'react-refresh/only-export-components': 'warn',

    'no-restricted-imports': [ 'error', {
      patterns: [ '@mui/*/*/*', '!@mui/material/test-utils/*' ],
    }],

    'prefer-destructuring': [ 'warn', {
      array: false,
      object: false,
    }],

    'react/jsx-no-useless-fragment': [ 'error', {
      allowExpressions: true,
    }],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [ 'error' ],

    'react/jsx-filename-extension': [ 'warn', {
      extensions: [ '.tsx' ],
    }],

    'import/extensions': [ 'error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
    }],

    '@typescript-eslint/explicit-function-return-type': [ 'error', {
      allowExpressions: true,
    }],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'arrow-body-style': [ 'error', 'always' ],

    'array-bracket-spacing': [ 'error', 'always', {
      arraysInArrays: false,
      objectsInArrays: false,
      singleValue: true,
    }],

    'arrow-parens': [ 'error', 'always' ],
    'class-methods-use-this': 'off',
    curly: [ 'error', 'all' ],
    'func-names': [ 'error', 'as-needed' ],
    'function-paren-newline': [ 'error', 'consistent' ],

    'import/no-extraneous-dependencies': [ 'error', {
      devDependencies: true,
    }],

    'import/no-named-as-default': 0,
    'import/no-cycle': [ 'off' ],

    indent: [ 'error', 2, {
      SwitchCase: 1,
    }],

    'jsx-a11y/label-has-for': [ 'off' ],
    'jsx-a11y/click-events-have-key-events': [ 'off' ],
    'jsx-quotes': [ 'error', 'prefer-single' ],

    'keyword-spacing': [ 'error', {
      after: true,
      before: true,
    }],

    'linebreak-style': [ 'off' ],

    'max-len': [ 'error', 180, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    'new-cap': [ 'off' ],
    'no-console': [ 'off' ],

    'no-plusplus': [ 'error', {
      allowForLoopAfterthoughts: true,
    }],

    'newline-per-chained-call': [ 'error', {
      ignoreChainWithDepth: 10,
    }],

    'no-multiple-empty-lines': [ 'error', {
      max: 3,
      maxEOF: 1,
      maxBOF: 1,
    }],

    'no-multi-spaces': [ 'error' ],
    'no-trailing-spaces': [ 'error' ],

    'no-param-reassign': [ 'error', {
      props: false,
    }],

    'no-nested-ternary': [ 'off' ],
    'no-underscore-dangle': [ 'off' ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }
    ],

    'object-curly-newline': [ 'error', {
      consistent: true,
    }],

    'object-curly-spacing': [ 'error', 'always' ],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
    quotes: [ 'error', 'single' ],
    'react/destructuring-assignment': [ 'off' ],

    'react/forbid-prop-types': [ 'off', {
      forbid: [ 'object' ],
    }],

    'react/jsx-props-no-spreading': [ 'off' ],
    'react/react-in-jsx-scope': [ 'off' ],

    'react/jsx-curly-spacing': [ 'error', {
      when: 'always',
    }],

    'semi': [ 'error', 'always' ],
    'react/prop-types': [ 'off' ],
    'react/require-default-props': [ 'off' ],
    'space-before-blocks': [ 'error', 'always' ],

    'space-before-function-paren': [ 'error', {
      anonymous: 'always',
      named: 'never',
    }],

    'template-curly-spacing': [ 'error', 'always' ],
    yoda: [ 'error', 'never' ],
  },
},
{
  files: [ '**/*.css' ],
  plugins: {
    css,
  },
  language: 'css/css',
  languageOptions: {
    customSyntax: tailwindSyntax,
  },
  rules: {
    'css/no-empty-blocks': 'error',
  },
},
];
