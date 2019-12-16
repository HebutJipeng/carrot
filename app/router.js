'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', controller.home.testMongo);
  router.get('/testadd', controller.home.testAdd);
  router.post('/user/create', controller.home.create);
  router.get('/form', controller.home.form);
  router.get('/testfetch', controller.home.testfetch);

  // game api
  router.resources('game', '/api/game', controller.game);

  router.get('/*', controller.home.staticPage);
};
