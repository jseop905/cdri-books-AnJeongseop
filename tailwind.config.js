/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette colors
        palette: {
          primary: '#4880EE',
          red: '#E84118',
          gray: '#DADADA',
          lightGray: '#F2F4F6',
          white: '#FFFFFF',
          black: '#222222',
        },
        // Text colors
        text: {
          primary: '#353C49',
          secondary: '#6D7582',
          subtitle: '#8D94A0',
        },
      },
      fontSize: {
        'title1': ['24px', { lineHeight: '24px' }],
        'title2': ['22px', { lineHeight: '24px' }],
        'title3': ['18px', { lineHeight: '18px' }],
        'body1': ['20px', { lineHeight: '20px' }],
        'body2': ['14px', { lineHeight: '14px' }],
        'body2-bold': ['14px', { lineHeight: '14px' }],
        'caption': ['16px', { lineHeight: '16px' }],
        'small': ['10px', { lineHeight: '10px' }],
      },
    },
  },
  plugins: [],
}

