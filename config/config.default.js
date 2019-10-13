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
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.security = {
    csrf: {
      enable: false,
    }
  }

  config.mongoose = {
    client: {
      url: "mongodb://140.143.193.74:27017/tiandy",
      options: {
        useNewUrlParser: true
      }
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    middleware: ["errorHandler"],
    errorHandler: {
      match: "/user"
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
