import AppError from './_app.js'

export default class UnauthorizedRequestError extends AppError {
  constructor (message) {
    super(message || 'Unauthorized Request', 401)
  }
}
