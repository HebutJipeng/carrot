const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const IS_PROD = process.env.NODE_ENV === "production";
module.exports = {
  publicPath: "/",
  outputDir: "../app/public/dist",
  // assetsDir: "",
  // assetsPublicPath: "/public",
  // baseUrl: "/public/",
  // indexPath: "../../view/index.html",
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
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config.plugins = config.plugins.concat([
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true //去掉console注释
            }
          }
        })
      ]);
    }
  }
};
