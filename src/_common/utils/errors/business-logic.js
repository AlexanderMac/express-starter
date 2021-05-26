import AppError from './_app.js'

export default class BusinessLogicError extends AppError {
  constructor (message) {
    super(message || 'Business Logic Error', 409)
  }
}
