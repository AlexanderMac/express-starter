import AppError from './_app'

export default class UnauthorizedRequestError extends AppError {
  constructor(message?: string) {
    super(message || 'Unauthorized Request', 401)
  }
}
