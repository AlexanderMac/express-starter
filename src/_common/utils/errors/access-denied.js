import AppError from './_app.js'

export default class AccessDeniedError extends AppError {
  constructor (message) {
    super(message || 'Access Denied', 403)
  }
}
