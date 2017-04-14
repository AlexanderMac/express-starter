'use strict';

var _              = require('lodash');
var winston        = require('winston');
var expressWinston = require('express-winston');
var config         = require('../../config/environment');

var transports = _.map(config.get('winston:transports'), (transportOpts, transportName) => {
  switch (transportName) {
    case 'console':
      return new (winston.transports.Console)(transportOpts);
    default:
      throw new Error(`Invalid transport name: ${transportName}`);
  }
});

exports.logger = new (winston.Logger)({ transports });

exports.common = expressWinston.logger({
  winstonInstance: exports.logger,
  meta: false,
  expressFormat: true,
  colorize: true
});

exports.error = expressWinston.errorLogger({
  winstonInstance: exports.logger,
  meta: false,
  expressFormat: true,
  colorize: true
});
