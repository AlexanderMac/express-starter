'use strict';

const express = require('express');
const config  = require('../config/environment');
const db      = require('./db');
const logger  = require('./util/logger');

require('./util/errors');
require('./util/promisify');

const app = express();
require('./express')(app);
require('./routes')(app);

// istanbul ignore next
if (app.get('env') !== 'test') {
  db.connect();

  app.listen(app.get('port'), () => {
    logger.info(`Express server started, environment=${config.get('env')}, listening on port=${config.get('port')}`);
  });
}

module.exports = app;
