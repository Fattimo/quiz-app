module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        width: {
          '100': '28rem',
          '104': '32rem',
          '108': '36rem',
          '112': '42rem',
          '116': '48rem',
          '120': '60rem',
        },
      },
    },
    variants: {
      extend: {
        transitionDuration: ['hover'],
        animation: ['hover'],
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
    ],
  }