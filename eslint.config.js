import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPerf from 'eslint-plugin-react-perf'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

const dir = import.meta.dirname

const boundariesSettings = {
  'import/resolver': { typescript: { project: './tsconfig.json' } },
  'boundaries/root-path': dir,
  'boundaries/elements': [
    { type: 'atoms', pattern: 'src/atoms/**' },
    { type: 'molecules', pattern: 'src/molecules/*/**', capture: ['moleculeName'] },
    { type: 'organisms', pattern: 'src/organisms/**' },
  ],
}

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'storybook-static/**', 'coverage/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'react-perf': reactPerf,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/no-autofocus': 'warn',
      // Inline objects/arrays/JSX as props create a new reference on every render.
      'react-perf/jsx-no-new-object-as-prop': 'warn',
      'react-perf/jsx-no-new-array-as-prop': 'warn',
      'react-perf/jsx-no-jsx-as-prop': 'warn',
      'react-perf/jsx-no-new-function-as-prop': 'off',
    },
  },
  // Stories and tests are dev-only: inline fixtures are normal there.
  {
    files: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts', '**/__tests__/**'],
    rules: {
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-array-as-prop': 'off',
      'react-perf/jsx-no-jsx-as-prop': 'off',
    },
  },

  // Atoms may only import other atoms.
  {
    files: ['src/atoms/**'],
    plugins: { boundaries },
    settings: boundariesSettings,
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'atoms' } },
              allow: [{ to: { element: { type: 'atoms' } } }],
            },
          ],
        },
      ],
    },
  },
  // Molecules: atoms and their own files; another molecule is a warning
  // (candidates for src/organisms/).
  {
    files: ['src/molecules/**'],
    plugins: { boundaries },
    settings: boundariesSettings,
    rules: {
      'boundaries/dependencies': [
        'warn',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'molecules' } },
              allow: [
                { to: { element: { type: 'atoms' } } },
                {
                  to: {
                    element: {
                      type: 'molecules',
                      captured: { moleculeName: '{{ from.element.captured.moleculeName }}' },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
  // Organisms may import atoms and molecules (downward only).
  {
    files: ['src/organisms/**'],
    plugins: { boundaries },
    settings: boundariesSettings,
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'organisms' } },
              allow: [
                { to: { element: { type: 'atoms' } } },
                { to: { element: { type: 'molecules' } } },
              ],
            },
          ],
        },
      ],
    },
  }
)
