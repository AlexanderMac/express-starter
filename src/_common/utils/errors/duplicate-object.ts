import AppError from './_app'

export default class DuplicateObjectError extends AppError {
  constructor(message?: string) {
    super(message || 'Duplicate Object', 409)
  }
}
