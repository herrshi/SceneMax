
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'http://api.map.baidu.com/api?v=1.0&type=webgl&ak=Mdr8jB433LaiDOzecIrhtGm5MztSmweR' },
      { src: 'http://mapv.baidu.com/build/mapv.min.js' },
      { src: 'https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.24/dist/mapvgl.min.js' },
      { src: 'https://mapv.baidu.com/gl/examples/static/common.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // 'ant-design-vue/dist/antd.css',
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/antd-ui',
    '@/plugins/mdbvue',
    { src: '~/plugins/vue-echarts', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
