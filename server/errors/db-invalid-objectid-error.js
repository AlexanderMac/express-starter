function DbInvalidOjectIdError(id) {
  this.message = id + ' is not valid ObjectId';
  this.name = 'DbInvalidOjectIdError';
}

DbInvalidOjectIdError.prototype = new Error();

module.exports = DbInvalidOjectIdError;
