const paramsProc = require('n-params-processor');
const logger = require('./_common/utils/logger');

module.exports = (app) => {
  require('./users/routes')(app);

  app.use((req, res) => {
    res.status(404).send({ message: 'Invalid end point' });
  });

  // eslint-disable-next-line max-params, no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof paramsProc.ParamsProcessorError) {
      return res.status(422).send({ message: err.message });
    }
    if (err.statusCode < 500) {
      return res.status(err.statusCode).send({
        message: err.message,
        info: err.info
      });
    }

    // istanbul ignore next
    switch (process.env.NODE_ENV) {
      case 'test':
      case 'development':
        logger.error('Unexpected server error', err, err.stack);
        break;
      case 'production':
        logger.error('Unexpected server error', err);
        break;
    }
    res.status(err.statusCode || 500).send({ message: 'Unexpected server error' });
  });
};
