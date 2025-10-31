import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  jsonc: false,
  yaml: false,
  ignores: [
    '**/fixtures',
  ],
  rules: {
    'curly': ['error', 'multi-line'],
    'ts/no-use-before-define': 'off',
    'eqeqeq': 'off',
    'ts/explicit-function-return-type': 'off',
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
    'unused-imports/no-unused-vars': ['error', { caughtErrors: 'none' }],
  },
})
