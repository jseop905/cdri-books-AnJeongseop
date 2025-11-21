export const typography = {
  title1: {
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '0%',
  },
  title2: {
    fontWeight: 700,
    fontSize: '22px',
    lineHeight: '24px',
    letterSpacing: '0%',
  },
  title3: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '18px',
    letterSpacing: '0%',
  },
  body1: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '20px',
    letterSpacing: '0%',
  },
  body2: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0%',
  },
  body2Bold: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0%',
  },
  caption: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '0%',
  },
  small: {
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '10px',
    letterSpacing: '0%',
  },
} as const

export type TypographyVariant = keyof typeof typography

