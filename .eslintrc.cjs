module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 디자인 시스템 사용 규칙 (주석으로 가이드)
    // 하드코딩된 색상 사용 금지: bg-blue-600, text-gray-500 등 → palette-*, text-* 사용
    // 하드코딩된 타이포그래피 사용 금지: text-2xl, font-bold 등 → text-* 또는 Typography 컴포넌트 사용
    // 자세한 내용은 src/shared/config/STYLE_GUIDE.md 참고
  },
}
