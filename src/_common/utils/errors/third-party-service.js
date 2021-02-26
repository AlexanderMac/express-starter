module.exports = class ThirdPartyServiceError extends require('./_app') {
  constructor (message) {
    super(message || 'Third-party Service Error', 423)
  }
}
