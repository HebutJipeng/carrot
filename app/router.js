'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.testMongo);
  router.get("/testadd", controller.home.testAdd);
  router.post("/user/create", controller.home.create);
  router.get('/form', controller.home.form)
};
