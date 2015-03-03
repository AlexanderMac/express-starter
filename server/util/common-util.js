var Q                     = require('q');
var DbInvalidOjectIdError = require('../errors/db-invalid-objectid-error');

module.exports = {
  isValidObjectId: function(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  },
  
  validateObjectId: function(id) {
    if (!this.isValidObjectId(id)) {
      return Q.reject(new DbInvalidOjectIdError(id));
    }
    return Q.resolve(true);
  }
};
