export const palette = {
  primary: '#4880EE',
  red: '#E84118',
  gray: '#DADADA',
  lightGray: '#F2F4F6',
  white: '#FFFFFF',
  black: '#222222',
} as const

export const textColors = {
  primary: '#353C49',
  secondary: '#6D7582',
  subtitle: '#8D94A0',
} as const

export type PaletteColor = keyof typeof palette
export type TextColor = keyof typeof textColors

