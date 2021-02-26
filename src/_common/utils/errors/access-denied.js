module.exports = class AccessDeniedError extends require('./_app') {
  constructor (message) {
    super(message || 'Access Denied', 403)
  }
}
