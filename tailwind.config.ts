import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  content: [
    './app.vue',
    './error.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './components/**/*.vue',
    './composables/**/*.ts',
    './router/**/*.ts',
    './types/**/*.ts',
    './app.config.ts'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          dark: '#1E40AF'
        },
        secondary: {
          DEFAULT: '#9333EA',
          dark: '#7E22CE'
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626'
      }
    }
  },
  safelist: [
    'hover:bg-primary-dark',
    'hover:bg-secondary-dark',
    'bg-primary',
    'bg-secondary',
    'text-success',
    'text-warning',
    'text-danger',
    {
      pattern: /(bg|text|border)-\[(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\]/,
      variants: ['hover', 'focus']
    }
  ],
  plugins: []
};
