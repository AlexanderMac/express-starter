import AppError from './_app'

export default class UnprocessableRequestError extends AppError {
  constructor(message?: string) {
    super(message || 'Unprocessable Request', 422)
  }
}
