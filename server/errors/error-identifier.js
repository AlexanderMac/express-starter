var DbObjectNotFoundError = require('./db-object-notfound-error');
var DbInvalidOjectIdError = require('./db-invalid-objectid-error');

module.exports = {
  isDbInvalidObjectIdError: function(err) {
    return err instanceof DbInvalidOjectIdError;
  },
  
  isDbObjectNotFoundError: function(err) {
    return err instanceof DbObjectNotFoundError;
  },
  
  isDbObjectValidationError: function(err) {
    return ((err.name === 'ValidationError') || 
            (err.message.indexOf('ValidationError') !== -1)); // TODO: use type?
  }
};
