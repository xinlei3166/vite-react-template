import { defineConfig } from 'vite-plus'

export default defineConfig({
  lint: {
    plugins: ['typescript', 'react', 'nextjs'],
    categories: {
      correctness: 'warn',
      perf: 'warn'
    },
    rules: {
      'no-var': 'error',
      'react/jsx-no-target-blank': 'warn',
      'react/display-name': 'off',
      'react/rules-of-hooks': 'off',
      'react/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        }
      ],
      'vite-plus/prefer-vite-plus-imports': 'error'
    },
    ignorePatterns: [
      'dist',
      'public',
      'node_modules',
      'iconfont.js',
      'packages/docs/.vitepress/cache',
      'components.d.ts'
    ],
    options: {
      typeAware: true,
      typeCheck: true
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin'
      }
    ]
  }
})
