import AppError from './_app.js'

export default class DuplicateObjectError extends AppError {
  constructor (message) {
    super(message || 'Duplicate Object', 409)
  }
}
