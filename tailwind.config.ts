import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,md,mdx,json}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          500: '#7A8F6A',
          600: '#6C805F',
          700: '#5A6C50'
        },
        ink: '#0B0B0B',
        sand: '#F8F8F8'
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 40px rgba(11, 11, 11, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
