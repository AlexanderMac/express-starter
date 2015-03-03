function DbObjectNotFoundError(modelName) {
  this.message = modelName + ' not found';
  this.name = 'DbObjectNotFoundError';
}

DbObjectNotFoundError.prototype = new Error();

module.exports = DbObjectNotFoundError;
