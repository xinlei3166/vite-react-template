module.exports = {
  env: {
    node: true,
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.js', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // js
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 2, // 禁止使用tabs
    'no-useless-escape': 0,
    'no-var': 2, // 使用let和const代替var
    'no-mixed-spaces-and-tabs': 2, // 不允许混用tab和空格
    'no-useless-return': 0,
    'arrow-parens': 0,
    camelcase: 0, // 禁用驼峰命名检测
    // ts
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/non-nullable-type-assertion-style': 0,
    // react
    'react/display-name': 0,
    'react-hooks/rules-of-hooks': 0,
    // 强制 typescript 类型导入的一致使用
    '@typescript-eslint/consistent-type-imports': 1
  }
}
