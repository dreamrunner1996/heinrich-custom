module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  publicPath: './',
  devServer: {
    port: 81,
    disableHostCheck: true
  }
}
