var expressWinston = require('express-winston');
var winston        = require('winston');

var winstonInstance = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    })
  ]
});

module.exports.commonLogger = expressWinston.logger({
  winstonInstance: winstonInstance,
  ignoredRoutes: ['/assets'],
  requestWhitelist: [
    'url', 'originalUrl', 'query', 'params', 'body'
  ],
  responseWhitelist: [
    '_headers', 'statusCode'
  ],
  meta: true,
  expressFormat: true
});

module.exports.assetsLogger = expressWinston.logger({
  winstonInstance: winstonInstance,
  meta: false,
  expressFormat: true
});
  
module.exports.errorLogger = expressWinston.errorLogger({
  winstonInstance: winstonInstance,
  requestWhitelist: [
    'url', 'originalUrl', 'query', 'params', 'body'
  ]
});
