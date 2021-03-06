module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended', // this config should be at the end as it overwrites other ones
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // Prevents from writing functions that are too complex (in terms of cyclomatic complexity).
    complexity: [2, 10],

    // Disallow some JS syntax features that are considered anti-patterns.
    'no-restricted-syntax': [2, 'WithStatement', 'LabeledStatement'],

    // Automatically sorts exports to ensure their consistency.
    'simple-import-sort/exports': 2,

    // Automatically sorts imports to ensure their consistency.
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^\\u0000'], // Side effects.
          ['^react', '^@?\\w'], // Packages from node_modules. React-related packages first.
          ['^[^.]'], // Absolute imports.
          ['^\\.'], // Relative imports.
        ],
      },
    ],

    // Enforces naming conventions across the codebase.
    '@typescript-eslint/naming-convention': [
      2,
      { selector: 'default', leadingUnderscore: 'allow', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase'] },

      // Interfaces shouldn't be prefixed with `I`.
      { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },

      // Types shouldn't be prefixed with `T`.
      { selector: 'typeAlias', format: ['PascalCase'], custom: { regex: '^T[A-Z]', match: false } },

      // Generics should have meaningful names instead of one-letters.
      { selector: 'typeParameter', format: ['PascalCase'], custom: { regex: '[a-zA-Z]{2,}', match: true } },
    ],

    // Customizes new lines locations across the project.
    'padding-line-between-statements': [
      2,
      // Always require blank lines after directive (like 'use-strict'), except between directives
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },

      // Always require blank lines before and after every sequence of variable declarations and export
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var', 'export'] },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'export'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var', 'export'], next: ['const', 'let', 'var', 'export'] },

      // Always require blank lines before and after class declaration, if, do/while, switch, try
      { blankLine: 'always', prev: '*', next: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'] },
      { blankLine: 'always', prev: ['if', 'class', 'for', 'do', 'while', 'switch', 'try'], next: '*' },

      // Always require blank lines before return statements
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    // When possible we want TypeScript to infer return types of functions.
    '@typescript-eslint/explicit-module-boundary-types': 0,

    // Additional config to allow dev dependencies in some files.
    'import/no-extraneous-dependencies': [2, { devDependencies: ['**/vite.config.ts'] }],

    'eslint-comments/disable-enable-pair': 0,
    'no-alert': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'import/no-default-export': 0,
    'react/function-component-definition': 0,
    'react/no-children-prop': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-implicit-any': 0,
    '@typescript-eslint/triple-slash-reference': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-cycle': 0,
    'no-param-reassign': 0,
  },
};
