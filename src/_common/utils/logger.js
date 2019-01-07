'use strict';

const _       = require('lodash');
const winston = require('winston');
const config  = require('../../../config/environment');

const transports = _.map(config.get('winston:transports'), (transportOpts, transportName) => {
  switch (transportName) {
    case 'console':
      return new (winston.transports.Console)(transportOpts);
    default:
      throw new Error(`Invalid transport name: ${transportName}`);
  }
});


module.exports = new (winston.Logger)({ transports });
