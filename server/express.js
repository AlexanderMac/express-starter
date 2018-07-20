'use strict';

const bodyParser = require('body-parser');
const logger     = require('morgan');
const helmet     = require('helmet');
const config     = require('../config/environment');

module.exports = function(app) {
  app.set('views', config.get('viewsPath'));
  app.set('port', config.get('port'));
  app.set('view engine', 'pug');

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
  }
  app.use(helmet());
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
};
