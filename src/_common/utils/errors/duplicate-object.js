module.exports = class DuplicateObjectError extends require('./_app') {
  constructor (message) {
    super(message || 'Duplicate Object', 409)
  }
}
