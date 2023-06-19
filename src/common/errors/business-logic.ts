import AppError from './_app'

export default class BusinessLogicError extends AppError {
  constructor(message?: string) {
    super(message || 'Business Logic Error', 409)
  }
}
