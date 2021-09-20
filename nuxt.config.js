export default {
  target: 'static',

  head: {
    titleTemplate: '%s - mctc',
    title: 'mctc',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    'nuxt-graphql-request',
  ],

  modules: ['@nuxtjs/dayjs', '@nuxtjs/axios'],

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
      ],
      brands: [],
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

  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  server: {
    host: '10.34.1.49',
  },

  publicRuntimeConfig: {
    mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN,
    axios: {
      browserBaseURL: process.env.REGISTRATION_ENDPOINT,
    },
    baseUrl: process.env.BASE_URL,
  },
  // serverMiddleware: [
  //   { path: '/admin', handler: '~/server-middleware/render-mode.js' },
  // ],
}
