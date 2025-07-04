import { theme } from 'tailwindcss/defaultConfig'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          base: '#2C46B1',
          dark: '#2C4091',
        },
        gray: {
          100: '#F9F9FB',
          200: '#E4E6EC',
          300: '#CDCFD5',
          400: '#74798B',
          500: '#4D505C',
          600: '#1F2025',
        },
        white: '#FFFFFF',
        danger: '#B12C4D',
      },
      fontFamily: {
        sans: ['Open Sans', ...theme.fontFamily.sans],
      },
      fontSize: {
        'text-xl': ['24px', '32px'],
        'text-lg': ['18px', '24px'],
        'text-md': ['14px', '18px'],
        'text-sm': ['12px', '16px'],
        'text-xs': ['10px', '14px'],
      },
      textTransform: {
        uppercase: 'uppercase', // você pode aplicar via classe `uppercase`
      },
      fontWeight: {
        semibold: '600',
      }
    },
  },
  plugins: [],
}
