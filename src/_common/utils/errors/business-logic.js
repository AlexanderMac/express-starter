module.exports = class BusinessLogicError extends require('./_app') {
  constructor (message) {
    super(message || 'Business Logic Error', 409)
  }
}
