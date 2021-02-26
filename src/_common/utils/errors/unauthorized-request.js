module.exports = class UnauthorizedRequestError extends require('./_app') {
  constructor (message) {
    super(message || 'Unauthorized Request', 401)
  }
}
