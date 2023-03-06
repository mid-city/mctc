export default {
  target: 'static',

  head: {
    titleTemplate: (titleChunk) =>
      titleChunk
        ? `${titleChunk} - Mid-City Tech Center`
        : 'Mid-City Tech Center - Learn From the Best',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon_32.png' }],
  },

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    'nuxt-graphql-request',
  ],

  modules: ['@nuxtjs/dayjs', '@nuxt/http', '@nuxt/image', '@nuxtjs/cloudinary'],

  plugins: [{ src: '~/plugins/vue-gtag.js', mode: 'client' }],

  // Module Configs
  tailwindcss: {
    jit: false,
  },

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['utc', 'timezone'],
    defaultTimeZone: 'America/New_York',
  },

  fontawesome: {
    component: 'Fa',
    suffix: true,
    icons: {
      solid: [
        'faBars',
        'faEye',
        'faUserCircle',
        'faSpinner',
        'faExclamationCircle',
        'faMapMarkerAlt',
        'faChalkboardTeacher',
        'faBook',
        'faCalendarAlt',
        'faCalendarDay',
        'faMobileAlt',
        'faTools',
        'faSlidersH',
      ],
      brands: ['faFacebook', 'faInstagram', 'faYoutube', 'faLinkedin'],
    },
  },

  graphql: {
    clients: {
      default: {
        endpoint: process.env.CONTENT_BASE_URL,
        options: {
          headers: {
            authorization: `Bearer ${process.env.CONTENT_API_KEY}`,
          },
        },
      },
    },
  },

  image: {
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/mid-city/image/upload/',
    },
  },

  cloudinary: {
    cloudName: 'mid-city',
  },

  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  publicRuntimeConfig: {
    mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN,
    http: {
      browserBaseURL: process.env.APP_ENDPOINT,
    },
    baseUrl: process.env.BASE_URL,
  },
}
