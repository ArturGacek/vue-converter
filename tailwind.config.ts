import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: 'var(--gray)',
      secondary: 'var(--secondary)',
      white: 'var(--white)',
      background: 'var(--background)',
      'border-light-gray': 'var(--border-light-gray)',
      error: 'var(--error)',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      maxWidth: {
        1240: '1240px',
      },
      fontSize: {
        12: '12px',
        16: '16px',
      },
      borderRadius: {
        5: '5px',
        10: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
