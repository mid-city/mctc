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
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    // '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: ['nuxt-webfontloader'],

  // Module Configs
  tailwindcss: {
    jit: true,
  },
  fontawesome: {
    component: 'Fa',
    suffix: true,
    icons: {
      solid: ['faBars'],
      brands: [],
    },
  },
  // webfontloader: {
  //   google: {
  //     families: ['Open+Sans:400,600&display=swap'],
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
