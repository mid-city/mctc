export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    'nuxt-graphql-request',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/dayjs'],

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
      solid: ['faBars', 'faEye', 'faUserCircle'],
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  publicRuntimeConfig: {
    mapboxToken: process.env.MAPBOX_PUBLIC_TOKEN,
  },
}
