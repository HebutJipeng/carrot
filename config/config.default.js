/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1570720155049_2226';

  // add your middleware config here
  config.middleware = [];

  config.cors = {
    origin: '*', // 访问白名单,根据你自己的需要进行设置
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks', // 左边写成.html后缀，会自动渲染.html文件
    },
  };

  config.mongoose = {
    client: {
      url: 'mongodb://140.143.193.74:27017/tiandy',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  // config.cluster = {
  //   listen: {
  //     port: 80,
  //     hostname: '127.0.0.1', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
  //     // path: '/var/run/egg.sock',
  //     // key: '/home/Nginx/2_www.pengji.xyz.key',
  //     // cert: '/home/Nginx/1_www.pengji.xyz_bundle.crt',
  //   },
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    middleware: [ 'errorHandler' ],
    errorHandler: {
      match: '/user',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
