module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    extend: {
      colors: {
        brand: '#d42f35',
        hero: 'rgba(255,255,255, 0.2)',
      },

      backgroundImage: {
        'hero-poster':
          "url('https://res.cloudinary.com/mid-city/image/upload/f_auto,q_auto/v1635782186/MCTC/mctc-hero2_poster_nwptl4.jpg')",
      },

      zIndex: {
        '-10': '-10',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography')],
}
