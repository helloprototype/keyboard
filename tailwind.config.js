/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bg-start': '#000000',
        'primary-bg-mid': '#628F92',
        'primary-bg-end': '#000000',
        'text-primary': '#C0D9DB',
        'button-primary': '#CCE0E2',
        'shadow-dark': '#0C0827',
        'modal-bg': 'rgba(12, 8, 39, 0.9)',
        'modal-bg-light': 'rgba(12, 8, 39, 0.7)',
        'highlight-green-light': '#90EE90',
        'highlight-green-dark': '#228B22',
        'chord-highlight-light': '#DDA0DD',
        'chord-highlight-dark': '#9370DB',
        'accent-yellow': '#FFD700',
        'accent-orange': '#FFA500'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      keyframes: {
        fadeInScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.98)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        fadeInScale: 'fadeInScale 300ms ease-out'
      }
    },
  },
  plugins: [],
};
