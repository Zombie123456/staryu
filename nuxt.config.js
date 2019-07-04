const pkg = require('./package')
const staging = 'http://grizzly.gojsjs.com'

module.exports = {
  mode: 'spa',
  server: {
    port: 4000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    title: '金沙幸运转盘',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript'
      },
      {
        src: '/js/popper.min.js',
        type: 'text/javascript'
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        type: 'text/javascript'
      },
      // {
      //   src:
      //     '/js/jquery.min.js',
      //   type: 'text/javascript'
      // },
      {
        src: 'https://code.jquery.com/jquery-1.12.4.min.js',
        type: 'text/javascript'
      },
      {
        src:
          '/js/jquery.SuperSlide2.js',
        type: 'text/javascript'
      },
      {
        src:
          '/js/scroll.js',
        type: 'text/javascript'
      },
      {
        src:
          '/js/tc.min.js',
        type: 'text/javascript'
      },
      {
        src:
          '/js/jBootstrapPage.js',
        type: 'text/javascript'
      }
    ],
    link: [
      { rel: 'stylesheet', type: 'text/css', href: '/css/style.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/animate.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/css/jBootsrapPage.css' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['./plugins/api', './plugins/vue-plugins'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  env: {
    apiHost:
      'http://api.chalice.top/backend_api'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
