module.exports = {
  publicPath: './',
  outputDir: '../app/public/web',
  devServer: {
    host: "127.0.0.1",
    port: 8082,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001/",
        ws: false,
        changeOrigin: true
      }
    }
  }
};
