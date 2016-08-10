'use strict';

var log = require('../util/logger').logger;

module.exports = function(app) {
  require('./users')(app);

  app.use(function(req, res, next) {
    var err = new Error('Invalid end point');
    err.statusCode = 404;
    next(err);
  });

  /* jshint unused: false */
  app.use((err, req, res, next) => {
    if (err.statusCode < 500) {
      var errData = { reason: err.message, info: err.info };
      res.status(err.statusCode).send(errData);
    } else {
      switch (process.env.NODE_ENV) {
        case 'test':
        case 'development':
          console.log('Unexpected server error', err, err.stack);
          break;
        case 'production':
          log.error('Unexpected server error', err);
          break;
      }
      err = new Error('Unexpected server error');
      err.statusCode = err.statusCode || 500;
      next(err);
    }
  });

  app.use(log.error);
};
