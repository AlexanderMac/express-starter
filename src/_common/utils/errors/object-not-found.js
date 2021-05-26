import AppError from './_app.js'

export default class ObjectNotFoundError extends AppError {
  constructor (message) {
    super(message || 'Object not found', 404)
  }
}
