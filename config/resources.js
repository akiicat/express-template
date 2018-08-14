var express = require('express');

module.exports = function resources(routes) {
  app = express();
  app
    .route('/')
    .get(routes.index)
    .post(routes.create);

  app
    .route('/:id')
    .get(routes.show)
    .patch(routes.update)
    .delete(routes.destory);

  return app;
};
