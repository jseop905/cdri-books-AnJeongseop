/**
 * 디자인 시스템 색상 팔레트
 */
export const palette = {
  primary: '#4880EE',
  red: '#E84118',
  gray: '#DADADA',
  lightGray: '#F2F4F6',
  white: '#FFFFFF',
  black: '#222222',
} as const

/**
 * 텍스트 색상
 */
export const textColors = {
  primary: '#353C49',
  secondary: '#6D7582',
  subtitle: '#8D94A0',
} as const

/**
 * 색상 타입
 */
export type PaletteColor = keyof typeof palette
export type TextColor = keyof typeof textColors

