/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],

  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      transitionTimingFunction: {
        'ease-3d': 'transform 0.2s',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    },
  },

  plugins: [
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.flip-card': {
          perspective: '1000px',
        },
        '.flip-card-inner': {
          transition: 'transform 0.6s',
          'transform-style': 'preserve-3d',
        },
        '.flip-card-front, .flip-card-back': {
          position: 'absolute',
          'backface-visibility': 'hidden',
        },
        '.flip-card-back': {
          transform: 'rotateY(180deg)',
        },
      });
    },
  ],
};
