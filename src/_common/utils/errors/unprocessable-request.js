module.exports = class UnprocessableRequestError extends require('./_app') {
  constructor (message) {
    super(message || 'Unprocessable Request', 422)
  }
}
