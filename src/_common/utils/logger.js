const _ = require('lodash');
const winston = require('winston');
const config = require('../../../config/environment');

const { combine, colorize, simple } = winston.format;

function customFormat() {
  return combine(colorize(), simple());
}

let logger = winston.createLogger({
  exitOnError: false,
  transports: _.map(config.get('winston:transports'), (opts, transType) => {
    switch (transType) {
      case 'console':
        return new winston.transports.Console({
          level: opts.level,
          format: customFormat()
        });
      default:
        throw new Error('Unknown logger transport type: ' + transType);
    }
  })
});

logger.error = message => {
  if (message instanceof Error) {
    logger.log({ level: 'error', message: message.stack });
  } else {
    logger.log({ level: 'error', message });
  }
};

module.exports = logger;
