module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'networks': '@/networks',
        'views': '@/views'
      }
    }
  }
}