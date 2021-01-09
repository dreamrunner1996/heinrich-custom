module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  publicPath: './',
  devServer: {
    port: 81,
    disableHostCheck: true
  }
}
