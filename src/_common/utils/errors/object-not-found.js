module.exports = class ObjectNotFoundError extends require('./_app') {
  constructor (message) {
    super(message || 'Object not found', 404)
  }
}
