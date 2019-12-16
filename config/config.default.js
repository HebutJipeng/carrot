/* eslint valid-jsdoc: "off" */

('use strict');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  const path = require('path');

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

  // config.view = {
  //   defaultViewEngine: 'nunjucks',
  //   mapping: {
  //     '.html': 'nunjucks', // 左边写成.html后缀，会自动渲染.html文件
  //   },
  // };

  config.mongoose = {
    client: {
      url: 'mongodb://140.143.193.74:27017/game',
      // url: 'mongodb://127.0.0.1:27017/game',
      options: {
        useNewUrlParser: true,
      },
    },
  };
  config.static = {
    dir: path.join(appInfo.baseDir, 'app/public/web/'),
  };

  config.view = {
    defaultViewEngine: 'static',
    mapping: {
      '.html': 'static',
    },
  };

  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public/dist'),
    dynamic: true,
    maxAge: 31536000,
  };

  config.httpclient = {
    httpAgent: {
      timeout: 63000,
    },
  };

  exports.validate = {
    enable: true,
    package: 'egg-validate',
  };

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
