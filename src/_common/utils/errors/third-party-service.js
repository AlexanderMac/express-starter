import AppError from './_app.js'

export default class ThirdPartyServiceError extends AppError {
  constructor (message) {
    super(message || 'Third-party Service Error', 423)
  }
}
