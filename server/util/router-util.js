var errorIdentifier = require('../errors/error-identifier');

module.exports = {
  processError: function(err, res, next) {
    if (errorIdentifier.isDbInvalidObjectIdError(err)) {
      return res.status(422).send({ message: err.message });
    }
    if (errorIdentifier.isDbObjectNotFoundError(err)) {
      return res.status(404).send({ message: err.message });
    }
    if (errorIdentifier.isDbObjectValidationError(err)) {
      return res.status(422).send({ message: err.errors });
    }
    next(err);
  }
};
