import AppError from './_app.js'

export default class UnprocessableRequestError extends AppError {
  constructor (message) {
    super(message || 'Unprocessable Request', 422)
  }
}
