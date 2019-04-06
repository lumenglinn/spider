'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/screenShot', controller.screenShot.index);
  router.get('/crawling', controller.crawling.index);
  router.get('/login', controller.login.index);
  router.get('/trace', controller.trace.index);
};
